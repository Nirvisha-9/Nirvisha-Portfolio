"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const allSkillGroups = [
  {
    group: "Programming & Software Development",
    color: "#7c6af7",
    icon: "💻",
    skills: [
      "Python",
      "Java",
      "C++",
      "C",
      "JavaScript",
      "Object-Oriented Programming (OOP)",
      "Data Structures & Algorithms",
      "Problem Solving",
      "Debugging",
      "Unit Testing",
    ],
  },
  {
    group: "Cloud & Distributed Systems",
    color: "#00d4ff",
    icon: "☁️",
    skills: [
      "AWS (EC2, S3, Lambda, Bedrock, Rekognition, Amplify)",
      "DeepSeek (via AWS Bedrock)",
      "Microservices Architecture",
      "RESTful APIs",
      "Cloud-native Development",
      "Distributed Systems",
      "Fault-tolerant & Scalable Systems",
      "CI/CD Pipelines",
    ],
  },
  {
    group: "Machine Learning & AI",
    color: "#f7d46a",
    icon: "🤖",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Feature Engineering",
      "Data Preprocessing",
      "Algorithm Optimization",
      "Agentic AI",
    ],
  },
  {
    group: "Databases",
    color: "#34d399",
    icon: "🗄️",
    skills: [
      "SQL",
      "MySQL",
      "DynamoDB (NoSQL)",
    ],
  },
  {
    group: "Web Development",
    color: "#ff9f43",
    icon: "🌐",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "React Native",
      "Next.js",
      "Firebase",
    ],
  },
  {
    group: "Data Visualization & Business Intelligence",
    color: "#00bcd4",
    icon: "�",
    skills: [
      "Tableau (Desktop & Server)",
      "Power BI",
      "Alteryx (Designer & Server)",
    ],
  },
  {
    group: "Tools & Methodologies",
    color: "#a78bfa",
    icon: "🛠️",
    skills: [
      "Git (Version Control)",
      "Agile Development",
      "Jira",
      "Backend Development",
      "API Design & Testing",
      "Workflow Optimization",
      "SDLC",
    ],
  },
  {
    group: "Frameworks & Libraries",
    color: "#ef4444",
    icon: "📚",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "LangChain",
      "RetinaNet",
      "YOLO",
      "Mask R-CNN",
      "NumPy",
      "Pandas",
      "Node.js",
      "React.js",
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">04 / Skills</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-text-dim mt-3 font-body" style={{ fontWeight: 300 }}>
            Every tool, language, and platform I work with.
          </p>
        </motion.div>

        {/* Skill groups stacked */}
        <div className="flex flex-col gap-5">
          {allSkillGroups.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: gi * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border p-6"
              style={{
                borderColor: `${g.color}20`,
                background: "rgba(13,13,20,0.85)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ border: `1px solid ${g.color}30`, background: `${g.color}10` }}
                >
                  {g.icon}
                </div>
                <div className="flex-1">
                  <p
                    className="font-display font-bold text-sm uppercase tracking-wider text-text"
                  >
                    {g.group}
                  </p>
                  <p className="font-mono text-xs text-muted">{g.skills.length} skills</p>
                </div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: g.color, boxShadow: `0 0 10px ${g.color}` }}
                />
              </div>

              {/* Skill pills — all visible, wrap naturally */}
              <div className="flex flex-wrap gap-2">
                {g.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: gi * 0.09 + si * 0.035 }}
                    className="font-mono text-xs px-3 py-2 rounded-lg border transition-all hover:scale-105 hover:brightness-125 cursor-default"
                    style={{
                      borderColor: `${g.color}28`,
                      background: `${g.color}0b`,
                      color: g.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
