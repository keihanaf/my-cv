"use client";

import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../../providers/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <IconButton onClick={toggleTheme} color="inherit" size="large">
        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </motion.div>
  );
}
