"use client";

import { motion } from "framer-motion";
import { Card, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface AnimatedCardProps extends Omit<CardProps, "children"> {
  children: ReactNode;
  delay?: number;
}

export function AnimatedCard({
  children,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card
        {...props}
        sx={{
          height: "100%",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
          ...props.sx,
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
}
