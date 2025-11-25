"use client";

import { Box, Container, Typography, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { Education } from "@/lib/domain/models/Profile";
import { AnimatedCard } from "../atoms/AnimatedCard";
import { School } from "@mui/icons-material";

interface EducationSectionProps {
  education: Education[];
  title: string;
}

export function EducationSection({ education, title }: EducationSectionProps) {
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
            sx={{ mb: 6, fontWeight: 700 }}
          >
            {title}
          </Typography>
        </motion.div>

        {education.map((edu, idx) => (
          <AnimatedCard key={edu.id} delay={idx * 0.1} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <School color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.status}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                {edu.institution}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.major}
              </Typography>
            </CardContent>
          </AnimatedCard>
        ))}
      </Container>
    </Box>
  );
}
