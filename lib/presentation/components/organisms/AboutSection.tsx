"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface AboutSectionProps {
  about: string;
  title: string;
}

export function AboutSection({ about, title }: AboutSectionProps) {
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ fontSize: "1.125rem", lineHeight: 1.8 }}
          >
            {about}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
