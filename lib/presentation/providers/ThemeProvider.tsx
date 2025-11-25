"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useSyncExternalStore,
} from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeProvider");
  return context;
};

// Create RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: "muiltr",
});

// Custom hook for hydration-safe mounting
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Get initial theme from localStorage
function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const savedMode = localStorage.getItem("theme-mode");
  return (savedMode as ThemeMode) || "light";
}

interface ThemeProviderProps {
  children: ReactNode;
  direction?: "ltr" | "rtl";
}

export function ThemeProvider({
  children,
  direction = "ltr",
}: ThemeProviderProps) {
  const hydrated = useHydrated();
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-mode", newMode);
    }
  };

  if (!hydrated) return null;

  const baseTheme = mode === "light" ? lightTheme : darkTheme;

  const theme = createTheme({
    ...baseTheme,
    direction,
  });

  const cache = direction === "rtl" ? cacheRtl : cacheLtr;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <CacheProvider value={cache}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
