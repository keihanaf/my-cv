"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Project } from "@/lib/domain/models/Profile";
import { AnimatedCard } from "../atoms/AnimatedCard";
import { OpenInNew, GitHub } from "@mui/icons-material";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
  mainTitle: string;
  miniTitle: string;
  viewProjectLabel?: string;
}

export function ProjectsSection({
  projects,
  mainTitle,
  miniTitle,
  viewProjectLabel = "View Project",
}: ProjectsSectionProps) {
  const mainProjects = projects.filter((p) => p.type === "main");
  const miniProjects = projects.filter((p) => p.type === "mini");

  const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => (
    <Grid
      size={{ xs: 12, md: project.type === "main" ? 12 : 6 }}
      key={project.id}
    >
      <AnimatedCard delay={idx * 0.1}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {project.description}
          </Typography>
          {project.technologies && (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              mb={3}
              dir="ltr"
              sx={{ justifyContent: "flex-start" }}
            >
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} size="small" variant="outlined" />
              ))}
            </Box>
          )}
          <Button
            component={Link}
            href={project.url}
            target="_blank"
            variant="contained"
            endIcon={project.type === "main" ? <OpenInNew /> : <GitHub />}
            sx={{ borderRadius: 2 }}
          >
            {viewProjectLabel}
          </Button>
        </CardContent>
      </AnimatedCard>
    </Grid>
  );

  return (
    <Box component="section" sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        {mainProjects.length > 0 && (
          <>
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
                {mainTitle}
              </Typography>
            </motion.div>
            <Grid container spacing={4} sx={{ mb: 8 }}>
              {mainProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} />
              ))}
            </Grid>
          </>
        )}

        {miniProjects.length > 0 && (
          <>
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
                {miniTitle}
              </Typography>
            </motion.div>
            <Grid container spacing={4}>
              {miniProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
