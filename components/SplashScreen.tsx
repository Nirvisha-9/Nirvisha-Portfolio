"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const duration = 1500;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / steps) * 100)));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 600);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-overlay opacity-40" />

          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-12"
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/30"
              style={{ width: 120, height: 120, margin: "-10px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-accent-2/20"
              style={{ width: 140, height: 140, margin: "-20px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Monogram box */}
            <div
              className="relative flex items-center justify-center glass-strong rounded-2xl"
              style={{ width: 100, height: 100 }}
            >
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: "radial-gradient(circle at center, rgba(124,106,247,0.15) 0%, transparent 70%)" }}
              />
              <span
                className="font-display font-bold gradient-text"
                style={{ fontSize: 42, letterSpacing: "-0.02em" }}
              >
                NS
              </span>
            </div>

            {/* Glow dots */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                style={{
                  top: 50 + 52 * Math.sin((i / 4) * Math.PI * 2),
                  left: 50 + 52 * Math.cos((i / 4) * Math.PI * 2),
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-center mb-10"
          >
            <p className="font-display text-text-dim text-sm tracking-[0.25em] uppercase mb-1">
              Portfolio
            </p>
            <h1 className="font-display font-bold text-2xl text-text tracking-tight">
              Nirvisha Sriram
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-48"
          >
            <div className="h-px bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c6af7, #00d4ff)",
                }}
                transition={{ duration: 0.016 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs text-muted">Loading</span>
              <span className="font-mono text-xs text-accent">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
