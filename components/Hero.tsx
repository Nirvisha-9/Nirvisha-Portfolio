"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download, ExternalLink, Mail, Linkedin } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ visible }: { visible: boolean }) {
  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,106,247,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="chip-cyan flex items-center gap-2 px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
            Available for opportunities
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold mb-4"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
        >
          <span className="text-text">Nirvisha </span>
          <span className="gradient-text">Sriram</span>
        </motion.h1>

        {/* Role */}
        <motion.div variants={fadeUp} className="mb-6">
          <p className="font-mono text-accent-2 text-sm tracking-[0.15em] uppercase mb-3">
            MS Computer Science · Santa Clara University
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Python", "AWS", "React", "SQL", "ML / LLM", "ETL Pipelines"].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          className="text-text-dim text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-body"
          style={{ fontWeight: 300 }}
        >
          3+ years at Cognizant building <span className="text-text">scalable data pipelines</span>,{" "}
          <span className="text-text">BI dashboards</span>, and{" "}
          <span className="text-text">ML solutions</span> for global banking clients. Experienced in translating complex business problems 
          into robust, scalable technical architectures.
          
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={scrollToExperience}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm bg-accent text-white hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            View Experience
            <ArrowDown size={16} />
          </button>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm glass border border-border hover:border-accent/40 text-text transition-all hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download Resume
          </a>
          <a
            href={resumeData.basics.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass border border-border hover:border-accent-2/40 text-text-dim hover:text-accent-2 transition-all hover:-translate-y-0.5"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${resumeData.basics.email}`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass border border-border hover:border-accent/40 text-text-dim hover:text-accent transition-all hover:-translate-y-0.5"
          >
            <Mail size={16} />
          </a>
        </motion.div>

        {/* Impact strip */}
        <motion.div variants={fadeUp}>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Top Impact</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {[
              { val: "3.5+", label: "Years at Cognizant", color: "accent" },
              { val: "Global", label: "Banking Clients · Alteryx ETL", color: "accent-2" },
              { val: "MS", label: "CS @ Santa Clara University", color: "accent-3" },
            ].map((item) => (
              <div
                key={item.val}
                className={`glass rounded-xl p-4 border border-border hover:border-${item.color}/30 transition-all card-hover`}
              >
                <p
                  className={`font-display font-bold text-2xl mb-1 ${
                    item.color === "accent"
                      ? "text-accent"
                      : item.color === "accent-2"
                      ? "text-accent-2"
                      : "text-accent-3"
                  }`}
                >
                  {item.val}
                </p>
                <p className="text-text-dim text-xs font-body">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
