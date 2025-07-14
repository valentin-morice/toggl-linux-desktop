const TOKEN_KEY = "toggl_api_token";
const USER_DATA_KEY = "toggl_user_data";

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

  isAuthenticated: (): boolean => {
    return !!storage.getToken();
  },

  clearAuth: (): void => {
    storage.removeToken();
    storage.removeUserData();
  },
};
