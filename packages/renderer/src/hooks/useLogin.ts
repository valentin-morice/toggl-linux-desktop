import { useState } from "react";
import { loginSchema } from "../schemas/base";
import type { UseLoginReturn, LoginFormProps } from "../types/base";

export function useLogin({ onSubmit }: LoginFormProps = {}): UseLoginReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

      if (onSubmit) {
        await onSubmit(validationResult.data);
      } else {
        console.log(validationResult.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
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
