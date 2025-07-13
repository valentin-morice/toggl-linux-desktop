import { SnackbarProvider } from "notistack";
import { CustomToast } from "./CustomToast";
import type { ToastProviderProps } from "../types/base";

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      dense
      preventDuplicate
      Components={{
        error: CustomToast,
        success: CustomToast,
        warning: CustomToast,
        info: CustomToast,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
