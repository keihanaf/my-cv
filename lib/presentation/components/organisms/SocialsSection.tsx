"use client";

import { Box, Container, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Social } from "@/lib/domain/models/Profile";
import { GitHub, Telegram, Instagram, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

interface SocialsSectionProps {
  socials: Social[];
  title: string;
}

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHub sx={{ fontSize: 40 }} />,
  telegram: <Telegram sx={{ fontSize: 40 }} />,
  instagram: <Instagram sx={{ fontSize: 40 }} />,
  linkedin: <LinkedIn sx={{ fontSize: 40 }} />,
};

export function SocialsSection({ socials, title }: SocialsSectionProps) {
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
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
            sx={{ mb: 6, fontWeight: 700 }}
          >
            {title}
          </Typography>
        </motion.div>

        <Box display="flex" justifyContent="center" gap={3}>
          {socials.map((social, idx) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                component={Link}
                href={social.url}
                target="_blank"
                color="primary"
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                {iconMap[social.icon]}
              </IconButton>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
