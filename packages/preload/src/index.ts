import { sha256sum } from "./nodeCrypto.js";
import { versions } from "./versions.js";
import { ipcRenderer } from "electron";

function send(channel: string, message: string) {
  return ipcRenderer.invoke(channel, message);
}

// Login API
const login = async (credentials: { email: string; password: string }) => {
  return ipcRenderer.invoke("api:login", credentials);
};

// Dark mode API
const darkMode = {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
};

export { sha256sum, versions, send, darkMode, login };
