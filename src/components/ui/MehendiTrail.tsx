"use client";

import { useEffect, useRef } from "react";

class TrailDot {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  angle: number;
  type: "dot" | "leaf" | "flower";

  constructor(x: number, y: number, type: "dot" | "leaf" | "flower") {
    this.x = x;
    this.y = y;
    this.life = 0;
    this.maxLife = Math.random() * 40 + 60; // 60-100 frames
    this.size = type === "dot" ? Math.random() * 2 + 1 : Math.random() * 4 + 4;
    this.angle = Math.random() * Math.PI * 2;
    this.type = type;
  }

  update() {
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const progress = this.life / this.maxLife;
    const opacity = 1 - Math.pow(progress, 2);
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + progress * 0.5);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#8C3B24"; // Henna color

    if (this.type === "dot") {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "leaf") {
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size, -this.size, this.size, this.size, 0, this.size);
      ctx.bezierCurveTo(-this.size, this.size, -this.size, -this.size, 0, -this.size);
      ctx.fill();
    } else if (this.type === "flower") {
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.arc(0, this.size, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#C89B5C"; // Gold center
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

export default function MehendiTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dots = dotsRef.current;
      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.update();
        dot.draw(ctx);
        
        if (dot.life >= dot.maxLife) {
          dots.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const lastPos = lastPosRef.current;
      
      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 10) {
        // Decide type based on randomness
        const rand = Math.random();
        let type: "dot" | "leaf" | "flower" = "dot";
        if (rand > 0.95) type = "flower";
        else if (rand > 0.85) type = "leaf";
        
        dotsRef.current.push(new TrailDot(x, y, type));
        lastPosRef.current = { x, y };
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[40]"
    />
  );
}
