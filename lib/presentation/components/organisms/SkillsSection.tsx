"use client";

import { Box, Container, Typography, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Skill, SkillCategory } from "@/lib/domain/models/Profile";
import { AnimatedCard } from "../atoms/AnimatedCard";

interface SkillsSectionProps {
  skills: Skill[];
  title: string;
  categoryLabels: Record<SkillCategory, string>;
}

export function SkillsSection({
  skills,
  title,
  categoryLabels,
}: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  // Define the order of categories
  const categoryOrder: SkillCategory[] = [
    SkillCategory.FRONTEND,
    SkillCategory.REACT_ECOSYSTEM,
    SkillCategory.TANSTACK,
    SkillCategory.UI_LIBRARIES,
    SkillCategory.BACKEND,
    SkillCategory.API,
    SkillCategory.DATABASE,
    SkillCategory.DEVOPS,
    SkillCategory.TOOLS,
    SkillCategory.TESTING,
  ];

  const orderedCategories = categoryOrder.filter(
    (cat) => groupedSkills[cat]?.length > 0
  );

  return (
    <Box component="section" sx={{ py: 8, bgcolor: "background.paper" }}>
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
          {orderedCategories.map((category, idx) => (
            <Grid size={{ xs: 12, md: 6 }} key={category}>
              <AnimatedCard delay={idx * 0.1} sx={{ p: 3, height: "100%" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  {categoryLabels[category]}
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1.5}
                  sx={{ justifyContent: "flex-start" }}
                >
                  {groupedSkills[category].map((skill, skillIdx) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIdx * 0.05 }}
                    >
                      <Chip
                        label={skill.name}
                        color="primary"
                        variant="outlined"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 2,
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
