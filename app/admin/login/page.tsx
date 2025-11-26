"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Analytics,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <MotionBox
            key={i}
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            sx={{
              position: "absolute",
              width: 300 + i * 100,
              height: 300 + i * 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "#3b82f6" : "#8b5cf6"
              }20 0%, transparent 70%)`,
              left: `${(i * 20) % 80}%`,
              top: `${(i * 15) % 70}%`,
            }}
          />
        ))}
      </Box>

      <MotionPaper
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        elevation={24}
        sx={{
          p: 5,
          maxWidth: 420,
          width: "100%",
          mx: 2,
          background: "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
        }}
      >
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
            }}
          >
            <Analytics sx={{ fontSize: 40, color: "white" }} />
          </Box>
        </MotionBox>

        <Typography
          variant="h4"
          mb={1}
          textAlign="center"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Panel
        </Typography>
        <Typography
          variant="body2"
          mb={4}
          textAlign="center"
          sx={{ color: "rgba(148, 163, 184, 0.8)" }}
        >
          Sign in to access analytics dashboard
        </Typography>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                bgcolor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              {error}
            </Alert>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "rgba(148, 163, 184, 0.6)" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(15, 23, 42, 0.5)",
                "& fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(148, 163, 184, 0.6)",
              },
              "& .MuiInputBase-input": {
                color: "#f1f5f9",
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "rgba(148, 163, 184, 0.6)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "rgba(148, 163, 184, 0.6)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(15, 23, 42, 0.5)",
                "& fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(148, 163, 184, 0.6)",
              },
              "& .MuiInputBase-input": {
                color: "#f1f5f9",
              },
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 6px 30px rgba(59, 130, 246, 0.4)",
              },
              "&:disabled": {
                background: "rgba(148, 163, 184, 0.2)",
              },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </MotionPaper>
    </Box>
  );
}
