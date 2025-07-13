import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState, useEffect } from "react";

interface ThemeToggleProps {
  onToggle: () => void;
}

declare global {
  interface Window {
    darkMode: {
      toggle: () => Promise<boolean>;
      system: () => Promise<void>;
    };
  }
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const theme = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(theme.palette.mode === "dark");
    };
    updateTheme();
  }, [theme.palette.mode]);

  const handleToggle = async () => {
    try {
      const isDark = await window.darkMode.toggle();
      setIsDarkMode(isDark);
      onToggle();
    } catch (error) {
      console.error("Failed to toggle dark mode:", error);
      onToggle();
    }
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 1000,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
