"use client";
import { useEffect, useRef, useState } from "react";

// Tech icons as SVG strings or emoji representations
const TECH_ICONS = [
  { label: "Python",   icon: "🐍", color: "#f7d46a" },
  { label: "SQL",      icon: "🗄️", color: "#00d4ff" },
  { label: "Tableau",  icon: "📊", color: "#7c6af7" },
  { label: "Alteryx",  icon: "⚙️", color: "#ff9f43" },
  { label: "ML",       icon: "🤖", color: "#00d4ff" },
  { label: "NLP",      icon: "💬", color: "#a8ff78" },
  { label: "ETL",      icon: "🔄", color: "#7c6af7" },
  { label: "React",    icon: "⚛️", color: "#61dafb" },
  { label: "LLM",      icon: "🧠", color: "#c084fc" },
  { label: "Data",     icon: "📈", color: "#f7d46a" },
];

interface FloatingIcon {
  id: number;
  label: string;
  icon: string;
  color: string;
  x: number;        // 0–1 of container width (only use 0–0.12 left or 0.88–1 right)
  y: number;        // 0–1 of container height
  side: "left" | "right";
  delay: number;
  duration: number;
  amp: number;      // float amplitude px
}

export default function SideDecorations() {
  const [items, setItems] = useState<FloatingIcon[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Distribute icons along both sides
    const placed: FloatingIcon[] = TECH_ICONS.map((t, i) => {
      const side = i % 2 === 0 ? "left" : "right";
      const baseY = 0.08 + (i / TECH_ICONS.length) * 0.84;
      // Small downward offset for left-side icons so they sit slightly lower
      const y = side === "left" ? Math.min(0.96, baseY + 0.06) : baseY;
      const x = side === "left" ? 0.02 + Math.random() * 0.05 : 0.93 + Math.random() * 0.04;
      return {
        id: i,
        ...t,
        side,
        x,
        y,
        delay: i * 0.4,
        duration: 3.5 + Math.random() * 2.5,
        amp: 8 + Math.random() * 10,
      } as FloatingIcon;
    });
    setItems(placed);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Only show on large screens
  if (typeof window !== "undefined" && window.innerWidth < 1100) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {items.map((item) => {
        const parallaxY = scrollY * (item.side === "left" ? -0.04 : -0.06) * (item.y - 0.5);
        return (
          <div
            key={item.id}
            className="absolute flex items-center gap-2"
            style={{
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: `translateY(${parallaxY}px)`,
              animation: `floatSide ${item.duration}s ease-in-out ${item.delay}s infinite`,
              opacity: 0,
            }}
          >
            {/* Icon bubble */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl backdrop-blur-sm"
              style={{
                border: `1px solid ${item.color}25`,
                background: `rgba(13,13,20,0.7)`,
                boxShadow: `0 0 12px ${item.color}15`,
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span
                className="font-mono text-[10px] hidden xl:block"
                style={{ color: item.color, letterSpacing: "0.05em" }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Left vertical decorative line */}
      <div
        className="absolute left-[7%] top-[10%] bottom-[10%] w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(124,106,247,0.15), rgba(0,212,255,0.15), transparent)",
        }}
      >
        {/* Animated travelling dot */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2"
          style={{
            background: "#7c6af7",
            boxShadow: "0 0 8px #7c6af7",
            animation: "travelLine 4s ease-in-out infinite",
            top: 0,
          }}
        />
      </div>

      {/* Right vertical decorative line */}
      <div
        className="absolute right-[7%] top-[10%] bottom-[10%] w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), rgba(124,106,247,0.15), transparent)",
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2"
          style={{
            background: "#00d4ff",
            boxShadow: "0 0 8px #00d4ff",
            animation: "travelLine 4s ease-in-out 2s infinite",
            top: 0,
          }}
        />
      </div>

      <style>{`
        @keyframes floatSide {
          0%   { opacity: 0; transform: translateY(0px); }
          10%  { opacity: 0.7; }
          50%  { opacity: 0.85; transform: translateY(-12px); }
          90%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(0px); }
        }
        @keyframes travelLine {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
