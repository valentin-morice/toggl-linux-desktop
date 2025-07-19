import { useState } from "react";
import { loginSchema } from "../schemas/base";
import type { UseLoginReturn, LoginFormProps } from "../types/base";
import { useToast } from "./useToast";
import { storage } from "../utils/storage";

function validateLogin(formData: { email: string; password: string }) {
  const result = loginSchema.safeParse(formData);
  if (result.success) return { data: result.data, errors: null };
  const fieldErrors = result.error.flatten(
    (issue) => issue.message
  ).fieldErrors;
  const errors: Record<string, string> = {};
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    if (messages && messages.length > 0) errors[field] = messages[0];
  });
  return { data: null, errors };
}

export function useLogin({
  onSubmit,
  onLogout,
}: LoginFormProps & { onLogout?: () => void } = {}): UseLoginReturn & {
  handleLogout: () => void;
} {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const resetErrors = () => setErrors({});

  const handleLogout = () => {
    storage.clearAuth();
    if (onLogout) onLogout();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData(event.currentTarget);
      const formData = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };

      const { data: validData, errors: validationErrors } =
        validateLogin(formData);
      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});

      const result = await window.togglAPI.login(validData!);
      if (result.success) {
        storage.setToken(result.data.api_token);
        storage.setUserData(result.data);
        showSuccess("Login successful! Welcome back.");
        if (onSubmit) await onSubmit(validData!);
      } else {
        const errorMessage = result.error || "Login failed";
        showError(errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || "An unexpected error occurred during login.";
      showError(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return { errors, isLoading, handleSubmit, resetErrors, handleLogout };
}
