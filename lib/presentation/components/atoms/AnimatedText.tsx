"use client";

import { motion } from "framer-motion";
import { Typography, TypographyProps } from "@mui/material";

interface AnimatedTextProps extends TypographyProps {
  delay?: number;
}

export function AnimatedText({
  children,
  delay = 0,
  ...props
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Typography {...props}>{children}</Typography>
    </motion.div>
  );
}
