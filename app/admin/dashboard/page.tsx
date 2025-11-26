"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  DesktopWindows,
  PhoneAndroid,
  Tablet,
  People,
  Logout,
  Refresh,
  Analytics,
  TrendingUp,
  LocationOn,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);

interface Stats {
  total: number;
  byDevice: Record<string, number>;
  recent: Array<{
    ip: string;
    device: string;
    userAgent: string;
    country: string | null;
    city: string | null;
    region: string | null;
    createdAt: string;
  }>;
}

const StatCard = ({
  icon,
  value,
  label,
  color,
  delay,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  delay: number;
}) => (
  <MotionPaper
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    elevation={0}
    sx={{
      p: 3,
      textAlign: "center",
      background: "rgba(30, 41, 59, 0.6)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: 3,
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      },
    }}
  >
    <Box
      sx={{
        width: 60,
        height: 60,
        borderRadius: 2,
        background: `${color}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mb: 2,
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        color: "#f1f5f9",
        mb: 0.5,
      }}
    >
      {value}
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(148, 163, 184, 0.8)" }}>
      {label}
    </Typography>
  </MotionPaper>
);

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchStats = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) setRefreshing(true);
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          setStats(await res.json());
        } else if (res.status === 401) {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      if (!data.authenticated) {
        router.push("/admin/login");
      } else {
        fetchStats();
      }
    };
    checkAuth();
  }, [router, fetchStats]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const deviceIcon = (device: string) => {
    const iconProps = { sx: { fontSize: 20 } };
    switch (device) {
      case "mobile":
        return (
          <PhoneAndroid
            {...iconProps}
            sx={{ ...iconProps.sx, color: "#f59e0b" }}
          />
        );
      case "tablet":
        return (
          <Tablet {...iconProps} sx={{ ...iconProps.sx, color: "#06b6d4" }} />
        );
      default:
        return (
          <DesktopWindows
            {...iconProps}
            sx={{ ...iconProps.sx, color: "#22c55e" }}
          />
        );
    }
  };

  const deviceColor = (device: string) => {
    switch (device) {
      case "mobile":
        return "#f59e0b";
      case "tablet":
        return "#06b6d4";
      default:
        return "#22c55e";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{ textAlign: "center" }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: "#3b82f6",
              mb: 2,
            }}
          />
          <Typography sx={{ color: "#94a3b8" }}>
            Loading dashboard...
          </Typography>
        </MotionBox>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Analytics sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#f1f5f9",
                }}
              >
                Analytics Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Track your website visitors
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refresh">
              <IconButton
                onClick={() => fetchStats(true)}
                disabled={refreshing}
                sx={{
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  "&:hover": { bgcolor: "rgba(59, 130, 246, 0.2)" },
                }}
              >
                <Refresh
                  sx={{
                    animation: refreshing ? "spin 1s linear infinite" : "none",
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                borderColor: "rgba(239, 68, 68, 0.5)",
                color: "#ef4444",
                "&:hover": {
                  borderColor: "#ef4444",
                  bgcolor: "rgba(239, 68, 68, 0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </MotionBox>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<People sx={{ fontSize: 30, color: "#3b82f6" }} />}
              value={stats?.total || 0}
              label="Total Visitors"
              color="#3b82f6"
              delay={0.1}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<DesktopWindows sx={{ fontSize: 30, color: "#22c55e" }} />}
              value={stats?.byDevice?.desktop || 0}
              label="Desktop"
              color="#22c55e"
              delay={0.2}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<PhoneAndroid sx={{ fontSize: 30, color: "#f59e0b" }} />}
              value={stats?.byDevice?.mobile || 0}
              label="Mobile"
              color="#f59e0b"
              delay={0.3}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<Tablet sx={{ fontSize: 30, color: "#06b6d4" }} />}
              value={stats?.byDevice?.tablet || 0}
              label="Tablet"
              color="#06b6d4"
              delay={0.4}
            />
          </Grid>
        </Grid>

        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          elevation={0}
          sx={{
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TrendingUp sx={{ color: "#3b82f6" }} />
            <Typography variant="h6" sx={{ color: "#f1f5f9", fontWeight: 600 }}>
              Recent Visitors
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#94a3b8",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    Device
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#94a3b8",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#94a3b8",
                      borderColor: "rgba(255,255,255,0.08)",
                      display: { xs: "none", lg: "table-cell" },
                    }}
                  >
                    IP Address
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#94a3b8",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {stats?.recent?.map((visitor, index) => (
                    <motion.tr
                      key={`${visitor.ip}-${visitor.device}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      style={{ display: "table-row" }}
                    >
                      <TableCell sx={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        <Chip
                          icon={deviceIcon(visitor.device)}
                          label={visitor.device}
                          size="small"
                          sx={{
                            bgcolor: `${deviceColor(visitor.device)}15`,
                            color: deviceColor(visitor.device),
                            border: `1px solid ${deviceColor(
                              visitor.device
                            )}30`,
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#f1f5f9",
                          borderColor: "rgba(255,255,255,0.05)",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationOn sx={{ fontSize: 16, color: "#64748b" }} />
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                            >
                              {visitor.city || "Unknown"}
                              {visitor.city && visitor.country && ", "}
                              {visitor.country || ""}
                            </Typography>
                            {visitor.region && (
                              <Typography
                                sx={{ fontSize: "0.75rem", color: "#64748b" }}
                              >
                                {visitor.region}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#94a3b8",
                          borderColor: "rgba(255,255,255,0.05)",
                          display: { xs: "none", lg: "table-cell" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                          }}
                        >
                          {visitor.ip}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#94a3b8",
                          borderColor: "rgba(255,255,255,0.05)",
                        }}
                      >
                        {new Date(visitor.createdAt).toLocaleString()}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
          {(!stats?.recent || stats.recent.length === 0) && (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography sx={{ color: "#64748b" }}>
                No visitors yet. They will appear here once someone visits your
                site.
              </Typography>
            </Box>
          )}
        </MotionPaper>
      </Box>
    </Box>
  );
}
