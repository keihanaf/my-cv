"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    fetch("/api/track", { method: "POST" }).catch(console.error);
  }, []);

  return null;
}
