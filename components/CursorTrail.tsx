"use client";
import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: -999, y: -999 };
    const trail: TrailPoint[] = [];
    const MAX_TRAIL = 28;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > MAX_TRAIL) trail.shift();

      trail.forEach((p, i) => {
        const progress = i / trail.length;
        const alpha = progress * 0.45;
        const radius = progress * 11;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(124,106,247,${alpha})`);
        grad.addColorStop(0.5, `rgba(0,212,255,${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(0,212,255,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(radius, 1), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Cursor dot
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,106,247,0.8)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(124,106,247,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 9990 }}
      aria-hidden="true"
    />
  );
}
