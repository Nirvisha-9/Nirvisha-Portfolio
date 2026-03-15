"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Download, ArrowUpRight } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(124,106,247,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">06 / Contact</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>

          <h2 className="font-display font-extrabold text-5xl md:text-6xl mb-4" style={{ lineHeight: 1 }}>
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-text-dim text-lg mb-12 font-body" style={{ fontWeight: 300 }}>
            Open to data engineering, BI, and ML roles. Let&apos;s build something impactful together.
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <a
              href={`mailto:${resumeData.basics.email}`}
              className="glass-strong rounded-2xl p-6 border border-border hover:border-accent/40 card-hover flex items-center gap-4 text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-display font-semibold text-text">Email</p>
                <p className="text-text-dim text-sm font-mono">{resumeData.basics.email}</p>
              </div>
              <ArrowUpRight size={16} className="text-muted ml-auto group-hover:text-accent transition-colors" />
            </a>

            <a
              href={resumeData.basics.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-strong rounded-2xl p-6 border border-border hover:border-accent-2/40 card-hover flex items-center gap-4 text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-2/10 border border-accent-2/20 flex items-center justify-center group-hover:bg-accent-2/20 transition-colors">
                <Linkedin size={20} className="text-accent-2" />
              </div>
              <div>
                <p className="font-display font-semibold text-text">LinkedIn</p>
                <p className="text-text-dim text-sm font-mono">nirvishasriram</p>
              </div>
              <ArrowUpRight size={16} className="text-muted ml-auto group-hover:text-accent-2 transition-colors" />
            </a>
          </div>

          {/* Download resume */}
          <div
            id="resume-download"
            className="glass-strong rounded-2xl p-6 border border-accent-3/20"
          >
            <div className="flex items-center gap-3 mb-3 justify-center">
              <Download size={16} className="text-accent-3" />
              <p className="font-display font-semibold text-accent-3">Download Resume</p>
            </div>
            <p className="text-text-dim text-sm mb-4">
              Full resume with all experience, education, and certifications
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-3/10 border border-accent-3/30 text-accent-3 font-display font-semibold text-sm hover:bg-accent-3/20 transition-all"
              >
                <Download size={14} />
                Download Resume
              </a>

              <a
                href="https://www.linkedin.com/in/nirvishasriram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-3/10 border border-accent-3/30 text-accent-3 font-display font-semibold text-sm hover:bg-accent-3/20 transition-all"
              >
                View on LinkedIn
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center">
        <div className="section-divider mb-8" />
        <p className="font-mono text-xs text-muted">
          © 2025 Nirvisha Sriram · Built with Next.js, TailwindCSS & Framer Motion
        </p>
      </div>
    </section>
  );
}
