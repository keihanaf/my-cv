"use client";

import { Box, Container, Typography, Grid, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { Contact } from "@/lib/domain/models/Profile";
import { AnimatedCard } from "../atoms/AnimatedCard";
import { Telegram, Phone } from "@mui/icons-material";

interface ContactSectionProps {
  contact: Contact;
  title: string;
  telegramLabel: string;
  phoneLabel: string;
}

export function ContactSection({
  contact,
  title,
  telegramLabel,
  phoneLabel,
}: ContactSectionProps) {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: "background.paper" }}>
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
            sx={{ mb: 6, fontWeight: 700 }}
          >
            {title}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedCard delay={0}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Telegram color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {telegramLabel}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  @{contact.telegram}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedCard delay={0.1}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Phone color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {phoneLabel}
                </Typography>
                <Typography variant="body1" color="text.secondary" dir="ltr">
                  {contact.phone}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
