import { useEffect, useState } from "react";

const RESEND_DURATION = 60;

export default function useOtpCounter(email?: string) {
  const getRemainingTime = (email: string) => {
    const res = localStorage.getItem("otp_resend_time");

    if (!res) return null;

    const parsed = JSON.parse(res);

    if (parsed.email !== email) return null;

    const diff = Math.floor((Date.now() - parsed.timestamp) / 1000);

    const remaining = RESEND_DURATION - diff;

    return remaining > 0 ? remaining : 0;
  };

  const [duration, setDuration] = useState(() => {
    if (!email) return RESEND_DURATION;
    const remaining = getRemainingTime(email);
    return remaining !== null ? remaining : RESEND_DURATION;
  });

  const setInLocalStorage = (email: string) => {
    localStorage.setItem(
      "otp_resend_time",
      JSON.stringify({
        email,
        timestamp: Date.now(),
      }),
    );
  };

  useEffect(() => {
    if (duration <= 0) {
      localStorage.removeItem("otp_resend_time");
      return;
    }

    const timer = setInterval(() => {
      setDuration((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  return {
    duration,
    setInLocalStorage,
    getRemainingTime,
  };
}
