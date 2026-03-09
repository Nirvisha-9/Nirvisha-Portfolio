"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; pulseSpeed: number; pulseOffset: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prefersReduced) {
      canvas.style.background =
        "radial-gradient(ellipse at 20% 50%, rgba(124,106,247,0.06) 0%, transparent 60%)";
      return;
    }

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 70;
    const CONNECTION_DIST = isMobile ? 100 : 130;
    const MAX_CONNECTIONS = isMobile ? 2 : 3;

    let W = 0, H = 0, animId = 0, frame = 0;
    const particles: Particle[] = [];

    const orbs = [
      { x: 0.12, y: 0.30, r: 0.38, color: "124,106,247", speed: 0.00007 },
      { x: 0.85, y: 0.15, r: 0.30, color: "0,212,255",   speed: 0.00011 },
      { x: 0.60, y: 0.80, r: 0.28, color: "90,70,200",   speed: 0.00009 },
    ];

    function resize() { W = canvas!.width = window.innerWidth; H = canvas!.height = window.innerHeight; }

    function spawnParticle(): Particle {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.2 + 0.4, opacity: Math.random() * 0.3 + 0.08,
        pulseSpeed: Math.random() * 0.008 + 0.004, pulseOffset: Math.random() * Math.PI * 2,
      };
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawnParticle());
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      frame++;

      // Subtle dot grid
      ctx!.fillStyle = "rgba(124,106,247,0.025)";
      for (let x = 0; x < W; x += 50)
        for (let y = 0; y < H; y += 50) {
          ctx!.beginPath(); ctx!.arc(x, y, 1, 0, Math.PI * 2); ctx!.fill();
        }

      // Gradient orbs
      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(frame * orb.speed * 1.3) * 0.09) * W;
        const oy = (orb.y + Math.cos(frame * orb.speed) * 0.07) * H;
        const r = orb.r * Math.min(W, H);
        const g = ctx!.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, `rgba(${orb.color},0.09)`); g.addColorStop(1, `rgba(${orb.color},0)`);
        ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(ox, oy, r, 0, Math.PI * 2); ctx!.fill();
      }

      // Particles + lines
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        const pulse = 0.5 + 0.5 * Math.sin(frame * p.pulseSpeed + p.pulseOffset);
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180,170,255,${p.opacity * (0.6 + 0.4 * pulse)})`; ctx!.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        let c = 0;
        for (let j = i + 1; j < particles.length && c < MAX_CONNECTIONS; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx!.beginPath(); ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(124,106,247,${(1 - dist / CONNECTION_DIST) * 0.06})`;
            ctx!.lineWidth = 0.5; ctx!.stroke(); c++;
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize(); init(); draw();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
  );
}
