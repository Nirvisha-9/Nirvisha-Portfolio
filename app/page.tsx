"use client";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import CursorTrail from "@/components/CursorTrail";
import SideDecorations from "@/components/SideDecorations";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

function Divider() {
  return <div className="section-divider mx-6 md:mx-20" />;
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {/* Canvas animated background */}
      <AnimatedBackground />

      {/* Cursor glow trail (desktop only) */}
      <CursorTrail />

      {/* Parth-style side decorations — floating tech icons + vertical lines */}
      <SideDecorations />

      {/* Noise grain */}
      <div className="noise" />

      <ScrollProgress />

      <div className="relative z-10">
        <Navigation />
        <main className="pb-20 md:pb-0">
          <Hero visible={splashDone} />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Education />
          <Divider />
          <Contact />
        </main>
      </div>
    </>
  );
}
