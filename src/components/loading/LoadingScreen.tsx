"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/brand/Logo";

const SESSION_KEY = "city-top-intro-seen";
const MAX_DURATION_MS = 1200;

type LoadingScreenProps = {
  onComplete?: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / MAX_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(finish, 120);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo size="lg" showText />
          </motion.div>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-muted">
            Preparing your table
          </p>
          <div className="mt-8 h-px w-48 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gold"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type LoadingGateProps = {
  children: React.ReactNode;
};

export function LoadingGate({ children }: LoadingGateProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (seen) {
        setReady(true);
        return;
      }
      setShowLoader(true);
    } catch {
      setReady(true);
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowLoader(false);
    setReady(true);
  };

  if (!ready && showLoader) {
    return <LoadingScreen onComplete={handleComplete} />;
  }

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
