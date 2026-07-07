"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, TrendingUp } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const impactBullets = [
  "LLM sycophancy & hallucination benchmarking at AIM Lab (ICLR 2026)",
  "500+ WCAG 2.1 AA / PDF-UA accessible documents for 10,000+ users",
  "React Native + Firebase field ops system for NGO recycling program",
  "Alteryx ETL pipelines for global banking clients",
  "10+ Tableau dashboards for C-suite decision-makers",
  "Enterprise Tableau + Alteryx Server admin",
];

const companyColors = ["#c084fc", "#34d399", "#00d4ff", "#7c6af7", "#f7d46a"];
const companyIcons  = ["🧠", "♿", "🌱", "🏢", "📊"];

const allRoles = resumeData.experience.flatMap((company, ci) =>
  company.roles.map((role) => ({
    ...role,
    company: company.company,
    companyColor: companyColors[ci % companyColors.length],
    companyIcon: companyIcons[ci % companyIcons.length],
  }))
);

// Animated node that pulses when in view
function TimelineNode({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36 }}>
      {/* Outer pulse ring */}
      {active && (
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            border: `1px solid ${color}50`,
            animation: "pingRing 2s ease-out infinite",
          }}
        />
      )}
      {/* Inner circle */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center z-10"
        style={{
          border: `2px solid ${color}60`,
          background: `${color}18`,
          boxShadow: active ? `0 0 20px ${color}40` : `0 0 8px ${color}15`,
          transition: "box-shadow 0.3s",
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      </div>
    </div>
  );
}

function RoleCard({ item, index, visible }: {
  item: typeof allRoles[0];
  index: number;
  visible: boolean;
}) {
  const [open, setOpen] = useState(index === 0);
  const isLast = index === allRoles.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-0 group"
    >
      {/* Timeline spine column */}
      <div className="flex flex-col items-center w-10 flex-shrink-0 mr-5">
        <TimelineNode color={item.companyColor} active={open} />
        {!isLast && (
          <div
            className="w-px flex-1 mt-2 min-h-[28px]"
            style={{
              background: `linear-gradient(to bottom, ${item.companyColor}50, ${item.companyColor}10, transparent)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 mb-5">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left"
        >
          <div
            className="rounded-2xl border transition-all duration-300"
            style={{
              padding: "18px 22px",
              background: "rgba(13,13,20,0.85)",
              backdropFilter: "blur(18px)",
              borderColor: open ? `${item.companyColor}38` : "rgba(255,255,255,0.07)",
              boxShadow: open ? `0 4px 40px ${item.companyColor}12` : "none",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">{item.companyIcon}</span>
                <div>
                  <p className="font-display font-bold text-text leading-tight">{item.title}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: item.companyColor }}>
                    {item.company}
                    {item.dates ? ` · ${item.dates}` : ""}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="flex-shrink-0 mt-1 text-muted"
              >
                <ChevronDown size={17} />
              </motion.div>
            </div>

            {/* Bullets accordion */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  {item.bullets.length > 0 ? (
                    <ul className="mt-4 space-y-2.5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      {item.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex gap-3 text-sm text-text-dim leading-relaxed"
                        >
                          <span className="flex-shrink-0 mt-1.5 text-[7px]" style={{ color: item.companyColor }}>▸</span>
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 pt-3 border-t font-mono text-xs text-muted italic"
                       style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      Foundation role · Training & onboarding period
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-24 px-6">
      {/* Parth-style side label */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{ zIndex: 2 }}>
        <div className="h-12 w-px bg-gradient-to-b from-transparent to-accent/30" />
        <span className="font-mono text-[9px] text-muted uppercase tracking-[0.25em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Experience
        </span>
        <div className="h-12 w-px bg-gradient-to-t from-transparent to-accent/30" />
      </div>

      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">02 / Experience</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-text-dim mt-3 font-body" style={{ fontWeight: 300 }}>
            Every role, every milestone — the full story.
          </p>
        </motion.div>

        {/* Impact panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 mb-12 border border-accent/15"
          style={{ background: "rgba(124,106,247,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={14} className="text-accent" />
            <p className="font-mono text-xs text-accent uppercase tracking-widest">Impact Highlights</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {impactBullets.map((b, i) => (
              <div key={i} className="flex gap-2 text-xs text-text-dim">
                <span className="text-accent-2 flex-shrink-0">✦</span>
                {b}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vertical timeline */}
        <div>
          {allRoles.map((item, i) => (
            <RoleCard key={`${item.company}-${item.title}`} item={item} index={i} visible={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pingRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
