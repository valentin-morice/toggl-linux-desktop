import type { AppModule } from "../AppModule.js";
import { ModuleContext } from "../ModuleContext.js";
import { BrowserWindow, Tray, Menu, app, nativeTheme } from "electron";
import { join } from "path";
import { spawn } from "child_process";
import type { AppInitConfig } from "../AppInitConfig.js";

class TrayManager implements AppModule {
  #tray: Tray | null = null;
  #currentTheme: string = "default";
  readonly #preload: { path: string };
  readonly #renderer: { path: string } | URL;

  constructor({ initConfig }: { initConfig: AppInitConfig }) {
    this.#preload = initConfig.preload;
    this.#renderer = initConfig.renderer;
  }

  private async detectSystemTheme(): Promise<string> {
    return new Promise((resolve) => {
      try {
        if (process.platform === "linux") {
          const desktop = process.env.XDG_CURRENT_DESKTOP || "";
          if (
            desktop.toLowerCase().includes("gnome") ||
            desktop.toLowerCase().includes("unity")
          ) {
            resolve("light");
            return;
          }
        }

        const gsettings = spawn("gsettings", [
          "get",
          "org.gnome.desktop.interface",
          "color-scheme",
        ]);
        let output = "";

        gsettings.stdout.on("data", (data) => {
          output += data.toString();
        });

        gsettings.on("close", (code) => {
          if (code === 0) {
            const theme = output.trim().replace(/'/g, "");
            resolve(theme);
          } else {
            resolve(nativeTheme.shouldUseDarkColors ? "dark" : "light");
          }
        });

        gsettings.on("error", () => {
          resolve(nativeTheme.shouldUseDarkColors ? "dark" : "light");
        });
      } catch (error) {
        resolve(nativeTheme.shouldUseDarkColors ? "dark" : "light");
      }
    });
  }

  private getIconPath(theme: string): string {
    const basePath = import.meta.env.DEV
      ? process.cwd()
      : process.resourcesPath;

    if (process.platform === "linux") {
      const desktop = process.env.XDG_CURRENT_DESKTOP || "";
      if (
        desktop.toLowerCase().includes("gnome") ||
        desktop.toLowerCase().includes("unity")
      ) {
        const lightIconPath = join(
          basePath,
          "buildResources",
          "themes",
          "icon-light.png"
        );

        return lightIconPath;
      }
    }

    const themeIconPath = join(
      basePath,
      "buildResources",
      "themes",
      `icon-${theme}.png`
    );

    return themeIconPath;
  }

  private async updateTrayIcon(): Promise<void> {
    if (!this.#tray) return;

    const newTheme = await this.detectSystemTheme();

    if (newTheme !== this.#currentTheme) {
      this.#currentTheme = newTheme;
      const iconPath = this.getIconPath(newTheme);

      try {
        this.#tray.setImage(iconPath);
        console.log(`Updated tray icon for theme: ${newTheme}`);
      } catch (error) {
        console.error(
          `Failed to update tray icon for theme ${newTheme}:`,
          error
        );
        const fallbackPath = join(
          import.meta.env.DEV ? process.cwd() : process.resourcesPath,
          "buildResources",
          "icon.png"
        );
        try {
          this.#tray.setImage(fallbackPath);
        } catch (fallbackError) {
          console.error("Failed to set fallback icon:", fallbackError);
        }
      }
    }
  }

  private async createWindow(): Promise<BrowserWindow> {
    const browserWindow = new BrowserWindow({
      titleBarStyle: "hidden",
      ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
      titleBarOverlay: {
        height: 30,
        symbolColor: "#000000",
        color: "white",
      },
      width: 480,
      height: 820,
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
        webviewTag: false,
        preload: this.#preload.path,
      },
    });

    if (this.#renderer instanceof URL) {
      await browserWindow.loadURL(this.#renderer.href);
    } else {
      await browserWindow.loadFile(this.#renderer.path);
    }

    return browserWindow;
  }

  private async restoreOrCreateWindow(): Promise<BrowserWindow> {
    let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

    if (window === undefined) {
      window = await this.createWindow();
    }

    if (window.isMinimized()) {
      window.restore();
    }

    window.show();
    window.focus();

    return window;
  }

  async enable({ app }: ModuleContext): Promise<void> {
    await app.whenReady();

    this.#currentTheme = await this.detectSystemTheme();
    let iconPath = this.getIconPath(this.#currentTheme);

    try {
      this.#tray = new Tray(iconPath);
      console.log(`Created tray with theme: ${this.#currentTheme}`);
    } catch (error) {
      console.error(
        `Failed to load theme-specific tray icon from ${iconPath}:`,
        error
      );

      const fallbackPath = join(
        import.meta.env.DEV ? process.cwd() : process.resourcesPath,
        "buildResources",
        "icon.png"
      );

      try {
        this.#tray = new Tray(fallbackPath);
        console.log("Created tray with fallback icon");
      } catch (fallbackError) {
        console.error("Failed to load fallback icon:", fallbackError);

        try {
          this.#tray = new Tray("");
          console.log("Created tray with default system icon");
        } catch (finalError) {
          console.error("Failed to create tray:", finalError);
          return;
        }
      }
    }

    this.#tray.setToolTip("Toggl Desktop");

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Show/Hide Toggl",
        click: async () => {
          try {
            const windows = BrowserWindow.getAllWindows();
            const mainWindow = windows.find((w) => !w.isDestroyed());

            if (mainWindow) {
              if (mainWindow.isVisible()) {
                mainWindow.hide();
              } else {
                mainWindow.show();
                mainWindow.focus();
              }
            } else {
              // No window exists, create a new one
              await this.restoreOrCreateWindow();
            }
          } catch (error) {
            console.error("Failed to show/hide window:", error);
          }
        },
      },
      {
        label: "Start Timer",
        click: () => {
          console.log("Start timer clicked");
        },
      },
      {
        label: "Stop Timer",
        click: () => {
          console.log("Stop timer clicked");
        },
      },
      { type: "separator" },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);

    this.#tray.setContextMenu(contextMenu);

    this.#tray.on("click", async () => {
      try {
        const windows = BrowserWindow.getAllWindows();
        const mainWindow = windows.find((w) => !w.isDestroyed());

        if (mainWindow) {
          if (mainWindow.isVisible()) {
            mainWindow.hide();
          } else {
            mainWindow.show();
            mainWindow.focus();
          }
        } else {
          // No window exists, create a new one
          await this.restoreOrCreateWindow();
        }
      } catch (error) {
        console.error("Failed to show/hide window:", error);
      }
    });

    if (process.platform === "linux") {
      this.#tray.on("double-click", async () => {
        try {
          const windows = BrowserWindow.getAllWindows();
          const mainWindow = windows.find((w) => !w.isDestroyed());

          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
          } else {
            // No window exists, create a new one
            await this.restoreOrCreateWindow();
          }
        } catch (error) {
          console.error("Failed to show window:", error);
        }
      });
    }

    nativeTheme.on("updated", () => {
      this.updateTrayIcon();
    });

    setInterval(() => {
      this.updateTrayIcon();
    }, 5000);

    app.on("before-quit", () => {
      if (this.#tray) {
        this.#tray.destroy();
      }
    });
  }
}

export function createTrayManagerModule(
  ...args: ConstructorParameters<typeof TrayManager>
) {
  return new TrayManager(...args);
}
