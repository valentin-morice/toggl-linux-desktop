import { loginSchema } from "../schemas/base";
import { z } from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;

export interface UseLoginReturn {
  errors: Record<string, string>;
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  resetErrors: () => void;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
}

interface AppProps {
  onToggleTheme: () => void;
}
