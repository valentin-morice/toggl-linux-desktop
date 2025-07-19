import { ipcMain } from "electron";
import axios from "axios";
import type { AppModule } from "../AppModule.js";
import type { ModuleContext } from "../ModuleContext.js";

export function createApiHandlerModule(): AppModule {
  return {
    enable: async (context: ModuleContext) => {
      ipcMain.handle(
        "api:login",
        async (event, credentials: { email: string; password: string }) => {
          try {
            const response = await axios.get(
              "https://api.track.toggl.com/api/v9/me",
              {
                auth: {
                  username: credentials.email,
                  password: credentials.password,
                },
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            return {
              success: true,
              data: response.data,
            };
          } catch (error: any) {
            return {
              success: false,
              error:
                "Login failed. Please check your credentials and try again.",
              status: 0,
            };
          }
        }
      );

      // Add handler for fetching organizations
      ipcMain.handle(
        "api:getOrganizations",
        async (event, apiToken: string) => {
          try {
            const response = await axios.get(
              "https://api.track.toggl.com/api/v9/me/organizations",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Basic ${Buffer.from(
                    apiToken + ":api_token"
                  ).toString("base64")}`,
                },
              }
            );
            return { success: true, data: response.data };
          } catch (error: any) {
            return {
              success: false,
              error: error?.message || "Failed to fetch organizations.",
              status: error?.response?.status || 0,
            };
          }
        }
      );

      // Add handler for fetching workspaces
      ipcMain.handle("api:getWorkspaces", async (event, apiToken: string) => {
        try {
          const response = await axios.get(
            "https://api.track.toggl.com/api/v9/workspaces",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(
                  apiToken + ":api_token"
                ).toString("base64")}`,
              },
            }
          );
          return { success: true, data: response.data };
        } catch (error: any) {
          return {
            success: false,
            error: error?.message || "Failed to fetch workspaces.",
            status: error?.response?.status || 0,
          };
        }
      });
    },
  };
}
