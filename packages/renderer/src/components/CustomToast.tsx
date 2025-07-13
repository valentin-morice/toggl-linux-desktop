import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";
import type { CustomToastProps } from "../types/base";

export const CustomToast = React.forwardRef<HTMLDivElement, CustomToastProps>(
  ({ id, message, variant }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const getSeverity = (variant: VariantType) => {
      switch (variant) {
        case "error":
          return "error";
        case "success":
          return "success";
        case "warning":
          return "warning";
        case "info":
          return "info";
        default:
          return "info";
      }
    };

    const getTitle = (variant: VariantType) => {
      switch (variant) {
        case "error":
          return "Error";
        case "success":
          return "Success";
        case "warning":
          return "Warning";
        case "info":
          return "Info";
        default:
          return "Notification";
      }
    };

    return (
      <Box sx={{ minWidth: 300 }} ref={ref}>
        <Alert
          severity={getSeverity(variant)}
          onClose={() => closeSnackbar(id)}
          variant="filled"
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <AlertTitle>{getTitle(variant)}</AlertTitle>
          {message}
        </Alert>
      </Box>
    );
  }
);

CustomToast.displayName = "CustomToast";
