const TOKEN_KEY = "toggl_api_token";
const USER_DATA_KEY = "toggl_user_data";
const ORGANIZATIONS_KEY = "toggl_organizations";
const ORGANIZATIONS_EXPIRY_KEY = "toggl_organizations_expiry";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const SETTINGS_KEY = "toggl_settings";

export interface UserData {
  id: number;
  api_token: string;
  email: string;
  fullname: string;
  timezone: string;
  "2fa_enabled": boolean;
  toggl_accounts_id: string;
  default_workspace_id: number;
  beginning_of_week: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  openid_email: string | null;
  openid_enabled: boolean;
  country_id: number;
  has_password: boolean;
  at: string;
  intercom_hash: string;
  oauth_providers: string[];
  authorization_updated_at: string;
}

export const storage = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token from storage:", error);
      return null;
    }
  },

  setToken: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error setting token in storage:", error);
    }
  },

  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token from storage:", error);
    }
  },

  getUserData: (): UserData | null => {
    try {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user data from storage:", error);
      return null;
    }
  },

  setUserData: (userData: UserData): void => {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Error setting user data in storage:", error);
    }
  },

  removeUserData: (): void => {
    try {
      localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error("Error removing user data from storage:", error);
    }
  },

  getOrganizations: (): any[] | null => {
    try {
      const expiry = localStorage.getItem(ORGANIZATIONS_EXPIRY_KEY);
      if (!expiry || Date.now() > Number(expiry)) {
        storage.removeOrganizations();
        return null;
      }
      const data = localStorage.getItem(ORGANIZATIONS_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      // Ensure it's always an array
      return Array.isArray(parsed) ? parsed : Array.from(parsed);
    } catch (error) {
      console.error("Error getting organizations from storage:", error);
      return null;
    }
  },

  setOrganizations: (orgs: any[]): void => {
    try {
      // Always store as a real array
      const arr = Array.isArray(orgs) ? orgs : Array.from(orgs);
      localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify(arr));
      localStorage.setItem(
        ORGANIZATIONS_EXPIRY_KEY,
        String(Date.now() + ONE_WEEK_MS)
      );
    } catch (error) {
      console.error("Error setting organizations in storage:", error);
    }
  },

  removeOrganizations: (): void => {
    try {
      localStorage.removeItem(ORGANIZATIONS_KEY);
      localStorage.removeItem(ORGANIZATIONS_EXPIRY_KEY);
    } catch (error) {
      console.error("Error removing organizations from storage:", error);
    }
  },

  getSettings: (): any => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error getting settings from storage:", error);
      return {};
    }
  },

  setSettings: (settings: any): void => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error setting settings in storage:", error);
    }
  },

  isAuthenticated: (): boolean => {
    return !!storage.getToken();
  },

  clearAuth: (): void => {
    storage.removeToken();
    storage.removeUserData();
    storage.removeOrganizations();
  },
};
