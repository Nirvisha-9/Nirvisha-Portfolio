"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "@/lib/resume-data";

const eduColors = ["#7c6af7", "#00d4ff", "#4a4a6a", "#4a4a6a"];
const eduIcons  = ["🎓", "🏛️", "📚", "🏫"];
const badges    = ["MS · CS", "BE · CS", "", ""];

export default function Education() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="relative py-24 px-6 bg-surface/40">
      {/* Parth-style side label */}
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{ zIndex: 2 }}>
        <div className="h-12 w-px bg-gradient-to-b from-transparent to-accent-2/30" />
        <span className="font-mono text-[9px] text-muted uppercase tracking-[0.25em]"
          style={{ writingMode: "vertical-rl" }}>
          Education
        </span>
        <div className="h-12 w-px bg-gradient-to-t from-transparent to-accent-2/30" />
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
            <span className="font-mono text-xs text-muted uppercase tracking-widest">05 / Education</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Academic <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div>
          {resumeData.education.map((edu, i) => {
            const color = eduColors[i];
            const isLast = i === resumeData.education.length - 1;

            return (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-0"
              >
                {/* Spine */}
                <div className="flex flex-col items-center w-10 flex-shrink-0 mr-5">
                  {/* Node */}
                  <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
                    {i < 2 && (
                      <div
                        className="absolute w-full h-full rounded-full"
                        style={{
                          border: `1px solid ${color}45`,
                          animation: "pingRingEdu 2.5s ease-out infinite",
                          animationDelay: `${i * 0.6}s`,
                        }}
                      />
                    )}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center z-10 text-base"
                      style={{
                        border: `2px solid ${color}55`,
                        background: `${color}15`,
                        boxShadow: i < 2 ? `0 0 18px ${color}35` : "none",
                      }}
                    >
                      {eduIcons[i]}
                    </div>
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 mt-2 min-h-[28px]"
                      style={{
                        background: `linear-gradient(to bottom, ${color}45, ${color}10, transparent)`,
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 mb-5">
                  <div
                    className="rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: i < 2 ? `${color}28` : "rgba(255,255,255,0.06)",
                      background: "rgba(13,13,20,0.85)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-display font-bold text-text leading-tight">{edu.institution}</p>
                        {edu.degree && (
                          <p className="text-text-dim text-sm mt-1">{edu.degree}</p>
                        )}
                        <p className="font-mono text-xs text-muted mt-2">📅 {edu.dates}</p>
                        {edu.location && (
                          <p className="font-mono text-xs text-muted mt-0.5">📍 {edu.location}</p>
                        )}
                      </div>
                      {badges[i] && (
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{
                            border: `1px solid ${color}30`,
                            background: `${color}10`,
                            color: color,
                          }}
                        >
                          {badges[i]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pingRingEdu {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
