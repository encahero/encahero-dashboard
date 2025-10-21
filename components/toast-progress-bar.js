// components/ShadcnProgressBar.tsx
"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function ToastProgressBar({
  duration = 5000,
  isPaused,
  onAnimationEnd,
}) {
  const [value, setValue] = useState(0);

  // tăng value
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setValue((prev) => Math.min(prev + 100 / (duration / 100), 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, duration]);

  // gọi onAnimationEnd khi value đạt 100
  useEffect(() => {
    if (value >= 100) {
      onAnimationEnd?.();
    }
  }, [value, onAnimationEnd]);

  return <Progress value={value} className="h-1 rounded-full" />;
}
