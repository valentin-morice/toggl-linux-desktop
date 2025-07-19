import { IconButton, Box, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import type { HeaderControlsProps } from "../types/base";

export function HeaderControls({
  onToggleTheme,
  onLogout,
  isAuthenticated,
}: HeaderControlsProps) {
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
      const isDark = await window.togglAPI.darkMode.toggle();
      setIsDarkMode(isDark);
      onToggleTheme();
    } catch (error) {
      console.error("Failed to toggle dark mode:", error);
      onToggleTheme();
    }
  };

  const buttonStyle = {
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
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 1000,
        display: "flex",
        gap: 1,
      }}
    >
      <IconButton onClick={handleToggle} color="inherit" sx={buttonStyle}>
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {isAuthenticated && (
        <IconButton
          onClick={onLogout}
          color="inherit"
          sx={buttonStyle}
          title="Logout"
        >
          <LogoutIcon />
        </IconButton>
      )}
    </Box>
  );
}
