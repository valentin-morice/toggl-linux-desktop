import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message: string, variant: VariantType = "info") => {
    enqueueSnackbar(message, { variant });
  };

  const showError = (message: string) => {
    showToast(message, "error");
  };

  const showSuccess = (message: string) => {
    showToast(message, "success");
  };

  const showWarning = (message: string) => {
    showToast(message, "warning");
  };

  const showInfo = (message: string) => {
    showToast(message, "info");
  };

  return {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };
}
