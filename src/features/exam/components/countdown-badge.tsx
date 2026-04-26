"use client";

import React, { useEffect, useRef, useState } from "react";

export default React.memo(function CountdownBadge({
  initialSeconds,
  onExpire,
}: {
  initialSeconds: number;
  onExpire: () => void;
}) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
    Math.max(0, Math.floor(initialSeconds)),
  );
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const id = window.setInterval(() => {
      setRemainingSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds !== 0) return;
    if (hasExpiredRef.current) return;
    hasExpiredRef.current = true;
    onExpire();
  }, [remainingSeconds, onExpire]);

  const formatRemaining = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="border-10 text-xs rounded-full w-16.25 h-16.25 flex items-center justify-center border-primary">
      {formatRemaining(remainingSeconds)}
    </div>
  );
});

