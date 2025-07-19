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

const getOrganizations = async () => {
  let token: string | null = null;
  try {
    token = localStorage.getItem("toggl_api_token");
  } catch (error) {
    console.error("Error getting token from storage in preload:", error);
    return { success: false, error: "No token found in storage." };
  }
  if (!token) {
    return { success: false, error: "No token found in storage." };
  }
  return ipcRenderer.invoke("api:getOrganizations", token);
};

const getWorkspaces = async () => {
  let token: string | null = null;
  try {
    token = localStorage.getItem("toggl_api_token");
  } catch (error) {
    console.error("Error getting token from storage in preload:", error);
    return { success: false, error: "No token found in storage." };
  }
  if (!token) {
    return { success: false, error: "No token found in storage." };
  }
  return ipcRenderer.invoke("api:getWorkspaces", token);
};

export {
  sha256sum,
  versions,
  send,
  darkMode,
  login,
  getOrganizations,
  getWorkspaces,
};
