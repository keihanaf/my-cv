"use client";

import { Box, Container, Avatar, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "../molecules/LanguageSwitcher";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { AnimatedText } from "../atoms/AnimatedText";

interface HeaderProps {
  name: string;
  title: string;
  image: string;
  locale: string;
}

export function Header({ name, title, image, locale }: HeaderProps) {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        borderRadius: "0 0 32px 32px",
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Avatar
              src={image}
              alt={name}
              sx={{
                width: 160,
                height: 160,
                mb: 4,
                border: `4px solid ${theme.palette.background.paper}`,
                boxShadow: 4,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
              {name.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{ display: "inline-block", marginRight: "0.5rem" }}
                >
                  {word}
                </motion.span>
              ))}
            </AnimatedText>
          </motion.div>

          <AnimatedText
            variant="h4"
            color="text.secondary"
            delay={0.5}
            sx={{ fontWeight: 500 }}
          >
            {title}
          </AnimatedText>
        </Box>
      </Container>
    </Box>
  );
}
