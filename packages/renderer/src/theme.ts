import { createTheme } from "@mui/material/styles";

// Create a custom theme
export const theme = createTheme({
  palette: {
    mode: "light", // or 'dark'
    primary: {
      main: "#2C1138", // Toggl logo purple
      light: "#4A1B5A", // Lighter variant of Toggl purple
      dark: "#1A0A22", // Darker variant of Toggl purple
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e", // You can change this to any color you want
      light: "#ff5983",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: {
      main: "#FCE5DB", // Cream color matching the logo
      light: "#FFF5F0", // Lighter cream variant
      dark: "#E8D4C8", // Darker cream variant
      contrastText: "#2C1138", // Dark purple text for contrast
    },
    secondary: {
      main: "#f48fb1",
      light: "#f8bbd9",
      dark: "#ec407a",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
});
