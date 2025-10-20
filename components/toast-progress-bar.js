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

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setValue((prev) => {
        const next = prev + 100 / (duration / 100); // tăng mỗi 100ms
        if (next >= 100) {
          clearInterval(interval);
          onAnimationEnd?.();
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, duration, onAnimationEnd]);

  return <Progress value={value} className="h-1 rounded-full" />;
}
