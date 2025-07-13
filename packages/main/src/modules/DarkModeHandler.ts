import type { AppModule } from "../AppModule.js";
import { ipcMain, nativeTheme } from "electron";

class DarkModeHandler implements AppModule {
  async enable(): Promise<void> {
    ipcMain.handle("dark-mode:toggle", () => {
      if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = "light";
      } else {
        nativeTheme.themeSource = "dark";
      }
      return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle("dark-mode:system", () => {
      nativeTheme.themeSource = "system";
    });
  }
}

export function createDarkModeHandlerModule() {
  return new DarkModeHandler();
}
