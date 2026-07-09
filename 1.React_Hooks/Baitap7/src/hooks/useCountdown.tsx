import { useCallback, useEffect, useState, useRef } from "react";

export const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (timeLeft > 0) setIsActive(true);
  }, [timeLeft]);

  const pause = useCallback(() => setIsActive(false), []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  return { timeLeft, isActive, start, pause, reset };
};
