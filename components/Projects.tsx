"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "PRISM",
    desc: "A data intelligence platform designed to surface actionable insights from complex, multi-source datasets. Built with a focus on scalable pipelines and real-time visualization for decision-makers.",
    stack: ["Python", "Data Pipelines", "Visualization", "Analytics"],
    color: "#7c6af7",
    icon: "💎",
    status: "Featured Project",
    gradient: "from-[#7c6af7]/20 to-[#7c6af7]/5",
    // Replace with your repo URL, e.g. https://github.com/your-username/prism
    githubUrl: "https://github.com/Nirvisha-9/prism",
  },
  {
    title: "Road Accident Analysis",
    desc: "Comprehensive analysis and visualization of road accident datasets to identify patterns, high-risk zones, and contributing factors. Translated raw safety data into actionable insights using statistical modeling.",
    stack: ["Python", "Pandas", "Matplotlib", "Statistical Modeling", "Data Analysis"],
    color: "#ff6b6b",
    icon: "🚗",
    status: "Data Project",
    gradient: "from-[#ff6b6b]/20 to-[#ff6b6b]/5",
    // Replace with your repo URL
    githubUrl: "https://github.com/Nirvisha-9/road-accident-analysis",
  },
  {
    title: "Kitchen Buddy",
    desc: "An intelligent kitchen assistant application that helps users manage recipes, plan meals, and minimize food waste. Leverages NLP to parse ingredient lists and suggest meals based on what's available.",
    stack: ["Python", "NLP", "ML", "React", "API Integration"],
    color: "#f7d46a",
    icon: "🍳",
    status: "ML Application",
    gradient: "from-[#f7d46a]/20 to-[#f7d46a]/5",
    // Replace with your repo URL
    githubUrl: "https://github.com/Nirvisha-9/kitchen-buddy",
  },
  {
    title: "H1B Visa Approval Predictor",
    desc: "Machine learning classification model predicting H1B Visa approval outcomes built during GoalStreet internship. Applied classification algorithms on real client case studies to surface key approval factors.",
    stack: ["Python", "Scikit-learn", "Classification", "Pandas", "ML"],
    color: "#00d4ff",
    icon: "🤖",
    status: "ML Model",
    gradient: "from-[#00d4ff]/20 to-[#00d4ff]/5",
    // Replace with your repo URL
    githubUrl: "https://github.com/Nirvisha-9/h1b-visa-predictor",
  },
  {
    title: "Global Banking ETL Pipelines",
    desc: "Automated data pipelines for global banking clients at Cognizant. Architected using Alteryx to streamline complex ETL processes, ensuring data integrity and reliability at enterprise scale.",
    stack: ["Alteryx", "ETL", "SQL", "Data Engineering", "Banking"],
    color: "#6ee7b7",
    icon: "🏦",
    status: "Professional Project",
    gradient: "from-[#6ee7b7]/20 to-[#6ee7b7]/5",
  },
  {
    title: "Executive BI Tableau Dashboards",
    desc: "Productionized interactive Tableau dashboards for executive decision-makers at Cognizant. High-concurrency performance and seamless UX built for C-suite financial reporting.",
    stack: ["Tableau", "SQL", "BI", "Data Visualization"],
    color: "#ff9f43",
    icon: "📊",
    status: "Professional Project",
    gradient: "from-[#ff9f43]/20 to-[#ff9f43]/5",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Side floating label */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{ zIndex: 2 }}>
        <div className="h-16 w-px bg-gradient-to-b from-transparent to-accent/40" />
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Projects
        </span>
        <div className="h-16 w-px bg-gradient-to-t from-transparent to-accent/40" />
      </div>

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">03 / Projects</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            <span className="gradient-text">Work</span> & Projects
          </h2>
          <p className="text-text-dim mt-3 font-body" style={{ fontWeight: 300 }}>
            Real-world builds — from ML models to data intelligence platforms.
          </p>
        </motion.div>

        {/* Cards — 2 col on desktop, 1 on mobile */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border overflow-hidden flex flex-col"
              style={{
                borderColor: `${p.color}22`,
                background: "rgba(13,13,20,0.9)",
                backdropFilter: "blur(20px)",
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ border: `1px solid ${p.color}35`, background: `${p.color}12` }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full mt-1"
                    style={{
                      border: `1px solid ${p.color}30`,
                      background: `${p.color}0d`,
                      color: p.color,
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Title + desc */}
                <div className="flex-1">
                  <h3
                    className="font-display font-bold text-lg text-text leading-snug mb-2 transition-colors"
                    style={{ color: "#e2e2f0" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {p.desc}
                  </p>
                </div>

                {/* Stack chips */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-lg"
                      style={{
                        border: `1px solid ${p.color}22`,
                        background: `${p.color}08`,
                        color: p.color,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Actions (GitHub / external) */}
                <div className="flex items-center gap-2 mt-3">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.title} on GitHub`}
                      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/5"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${p.color}08` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
