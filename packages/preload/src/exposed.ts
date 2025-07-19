import * as exports from "./index.js";
import { contextBridge } from "electron";

const isExport = (key: string): key is keyof typeof exports =>
  Object.hasOwn(exports, key);

for (const exportsKey in exports) {
  if (isExport(exportsKey)) {
    contextBridge.exposeInMainWorld(btoa(exportsKey), exports[exportsKey]);
  }
}

// Expose all APIs under a single namespace
contextBridge.exposeInMainWorld("togglAPI", {
  getOrganizations: exports.getOrganizations,
  getWorkspaces: exports.getWorkspaces,
  login: exports.login,
  darkMode: exports.darkMode,
});

// Re-export for tests
export * from "./index.js";
