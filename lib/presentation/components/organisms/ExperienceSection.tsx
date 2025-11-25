"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Experience } from "@/lib/domain/models/Profile";
import { AnimatedCard } from "../atoms/AnimatedCard";
import { WorkOutline } from "@mui/icons-material";

interface ExperienceSectionProps {
  experiences: Experience[];
  title: string;
  currentLabel: string;
}

export function ExperienceSection({
  experiences,
  title,
  currentLabel,
}: ExperienceSectionProps) {
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

        <Grid container spacing={4}>
          {experiences.map((exp, idx) => (
            <Grid size={{ xs: 12, md: 6 }} key={exp.id}>
              <AnimatedCard delay={idx * 0.1} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <WorkOutline color="primary" sx={{ fontSize: 32 }} />
                    <Box flex={1}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {exp.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exp.position}
                      </Typography>
                    </Box>
                    {exp.current && (
                      <Chip label={currentLabel} color="success" size="small" />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {exp.duration}
                  </Typography>
                  {exp.description && (
                    <Typography variant="body2" color="text.secondary">
                      {exp.description}
                    </Typography>
                  )}
                </CardContent>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
