import { loginSchema } from "../schemas/base";
import { z } from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;

// Re-export UserData from storage utils
export type { UserData } from "../utils/storage";

export interface UseLoginReturn {
  errors: Record<string, string>;
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  resetErrors: () => void;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
}

export interface AppProps {
  onToggleTheme: () => void;
}

export interface HeaderControlsProps {
  onToggleTheme: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface CustomToastProps {
  id: string | number;
  message: string;
  variant: VariantType;
}

declare global {
  interface Window {
    darkMode: {
      toggle: () => Promise<boolean>;
      system: () => Promise<void>;
    };
    login: (credentials: { email: string; password: string }) => Promise<{
      success: boolean;
      data?: any;
      error?: string;
      status?: number;
    }>;
  }
}
