import { useState } from "react";
import { loginSchema } from "../schemas/base";
import type { UseLoginReturn, LoginFormProps } from "../types/base";
import { useToast } from "./useToast";

export function useLogin({ onSubmit }: LoginFormProps = {}): UseLoginReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const resetErrors = () => {
    setErrors({});
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

      const validationResult = loginSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        const newErrors: Record<string, string> = {};

        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            newErrors[field] = messages[0];
          }
        });

        setErrors(newErrors);
        return;
      }

      setErrors({});

      try {
        const result = await window.login(validationResult.data);

        if (result.success) {
          console.log("Login successful:", result.data);
          showSuccess("Login successful! Welcome back.");

          if (onSubmit) {
            await onSubmit(validationResult.data);
          }
        } else {
          const errorMessage = result.error || "Login failed";
          showError(errorMessage);
          setErrors({
            general: errorMessage,
          });
        }
      } catch (apiError: any) {
        const errorMessage =
          apiError?.message || "An unexpected error occurred during login.";
        showError(errorMessage);
        setErrors({
          general: errorMessage,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      showError(errorMessage);
      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors,
    isLoading,
    handleSubmit,
    resetErrors,
  };
}
