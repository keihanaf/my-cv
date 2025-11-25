// Theme Configuration with Design Tokens
import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonTokens = {
  spacing: 8,
  borderRadius: 16,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: "var(--font-inter)",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: commonTokens.borderRadius,
  },
  ...commonTokens,
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    secondary: {
      main: "#a78bfa",
      light: "#c4b5fd",
      dark: "#8b5cf6",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  typography: lightThemeOptions.typography,
  shape: {
    borderRadius: commonTokens.borderRadius,
  },
  ...commonTokens,
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
