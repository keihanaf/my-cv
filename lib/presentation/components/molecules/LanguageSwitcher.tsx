"use client";

import { motion } from "framer-motion";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newLocale: string | null
  ) => {
    if (newLocale && newLocale !== currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box>
        <ToggleButtonGroup
          value={currentLocale}
          exclusive
          onChange={handleChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              px: 2,
              py: 0.5,
              fontWeight: 600,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              border: "none",
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            },
          }}
        >
          <ToggleButton value="en">EN</ToggleButton>
          <ToggleButton value="fa">FA</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </motion.div>
  );
}
