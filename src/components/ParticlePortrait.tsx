"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  amp: number;
  accent: boolean;
};

type Props = {
  src: string;
  className?: string;
};

export function ParticlePortrait({ src, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    let assembled = 0;
    let start = performance.now();
    let image: HTMLImageElement | null = null;

    const mouse = { x: -9999, y: -9999, active: false };
    // Original constellation palette (first version)
    const ink = "220, 230, 235";
    const accent = "120, 200, 175";

    const isBackground = (r: number, g: number, b: number, a: number) => {
      if (a < 20) return true;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max > 248 && min > 242 && max - min < 10;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (image) buildParticles(image);
    };

    const buildParticles = (img: HTMLImageElement) => {
      const sample = document.createElement("canvas");
      // Large figure, still fully inside canvas (tiny padding only)
      const padX = width * 0.98;
      const padY = height * 0.98;
      const scale = Math.min(padX / img.width, padY / img.height);
      const sw = Math.max(1, Math.floor(img.width * scale));
      const sh = Math.max(1, Math.floor(img.height * scale));
      sample.width = sw;
      sample.height = sh;

      const sctx = sample.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      sctx.clearRect(0, 0, sw, sh);
      sctx.drawImage(img, 0, 0, sw, sh);
      const { data } = sctx.getImageData(0, 0, sw, sh);

      // Find real subject bounds (PNG has uneven side padding)
      let minX = sw;
      let maxX = 0;
      let minY = sh;
      let maxY = 0;
      for (let y = 0; y < sh; y += 4) {
        for (let x = 0; x < sw; x += 4) {
          const i = (y * sw + x) * 4;
          if (isBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) {
            continue;
          }
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      if (maxX <= minX) {
        minX = 0;
        maxX = sw;
      }
      if (maxY <= minY) {
        minY = 0;
        maxY = sh;
      }

      const contentW = maxX - minX;
      const contentH = maxY - minY;
      const gap = width < 420 ? 2.6 : 2.05;
      const isMobile = width < 768;

      // Mobile: optically center the person (not the raw image box)
      const offsetX = isMobile
        ? (width - contentW) / 2 - minX
        : (width - sw) / 2;
      const offsetY = isMobile
        ? (height - contentH) / 2 - minY
        : (height - sh) / 2;
      const next: Particle[] = [];

      for (let y = 0; y < sh; y += gap) {
        for (let x = 0; x < sw; x += gap) {
          const ix = Math.min(sw - 1, Math.floor(x));
          const iy = Math.min(sh - 1, Math.floor(y));
          const i = (iy * sw + ix) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (isBackground(r, g, b, a)) continue;

          const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const inFace = y < sh * 0.58;
          if (!inFace && luma > 170 && Math.random() > 0.55) continue;

          const jx = (Math.random() - 0.5) * gap * 0.45;
          const jy = (Math.random() - 0.5) * gap * 0.45;
          const tx = Math.min(width - 4, Math.max(4, offsetX + x + jx));
          const ty = Math.min(height - 4, Math.max(4, offsetY + y + jy));
          const angle = Math.random() * Math.PI * 2;
          const dist =
            Math.random() * Math.max(width, height) * (0.35 + Math.random() * 0.5);

          next.push({
            x: reduceMotion ? tx : width * 0.5 + Math.cos(angle) * dist,
            y: reduceMotion ? ty : height * 0.45 + Math.sin(angle) * dist,
            tx,
            ty,
            vx: 0,
            vy: 0,
            r: luma < 70 ? 1.55 : inFace ? 1.25 : 1.05,
            phase: Math.random() * Math.PI * 2,
            amp: 0.12 + Math.random() * 0.22,
            accent: luma < 110 || Math.random() > 0.62,
          });

          if (inFace && Math.random() > 0.5) {
            const ox = x + gap * 0.45;
            const oy = y + gap * 0.4;
            const ni =
              (Math.min(sh - 1, Math.floor(oy)) * sw +
                Math.min(sw - 1, Math.floor(ox))) *
              4;
            if (!isBackground(data[ni], data[ni + 1], data[ni + 2], data[ni + 3])) {
              next.push({
                x: reduceMotion ? tx : Math.random() * width,
                y: reduceMotion ? ty : Math.random() * height,
                tx: Math.min(width - 4, Math.max(4, offsetX + ox)),
                ty: Math.min(height - 4, Math.max(4, offsetY + oy)),
                vx: 0,
                vy: 0,
                r: 1.05,
                phase: Math.random() * Math.PI * 2,
                amp: 0.1 + Math.random() * 0.2,
                accent: true,
              });
            }
          }
        }
      }

      const cap = width < 420 ? 4500 : 7000;
      if (next.length > cap) {
        const keep: Particle[] = [];
        const step = next.length / cap;
        for (let i = 0; i < next.length; i += step) keep.push(next[Math.floor(i)]);
        particles = keep;
      } else {
        particles = next;
      }

      assembled = reduceMotion ? 1 : 0;
      start = performance.now();
    };

    const tick = (now: number) => {
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const t = (now - start) * 0.001;

      if (!reduceMotion && assembled < 1) {
        assembled = Math.min(1, assembled + 0.011);
      }
      const ease = assembled * assembled * (3 - 2 * assembled);
      const mouseRadius = 78;
      const linkDist = Math.min(22, width * 0.04);

      for (const p of particles) {
        if (reduceMotion) {
          p.x = p.tx;
          p.y = p.ty;
        } else {
          const bx = Math.sin(t * 1.05 + p.phase) * p.amp * ease;
          const by = Math.cos(t * 0.9 + p.phase * 1.25) * p.amp * ease;
          const targetX = p.tx + bx;
          const targetY = p.ty + by;

          p.vx += (targetX - p.x) * (0.1 + ease * 0.12);
          p.vy += (targetY - p.y) * (0.1 + ease * 0.12);
          p.vx *= 0.78;
          p.vy *= 0.78;

          if (mouse.active && ease > 0.75) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0.2) {
              const force = ((mouseRadius - dist) / mouseRadius) ** 1.15;
              p.vx += (dx / dist) * force * 1.5;
              p.vy += (dy / dist) * force * 1.5;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      const step = particles.length > 5000 ? 2 : 1;
      for (let i = 0; i < particles.length; i += step) {
        const a = particles[i];
        for (let j = i + 1; j < Math.min(particles.length, i + 16); j += step) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          const alpha = (1 - dist / linkDist) * 0.22 * ease;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const alpha = (p.accent ? 0.85 : 0.55) * (0.4 + ease * 0.6);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.accent ? accent : ink}, ${alpha})`;
        ctx.arc(p.x, p.y, p.r * (0.95 + ease * 0.15), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const probe = document.createElement("img");
    probe.decoding = "async";
    probe.src = src;
    probe.onload = () => {
      image = probe;
      resize();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      if (image) resize();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full ${className}`}
      role="img"
      aria-label={`${site.fullName} particle constellation portrait`}
    >
      {/* Crawlable fallback for search engines and no-JS */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${site.fullName}, Full Stack Engineer`}
        width={800}
        height={1000}
        className="sr-only"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
    </div>
  );
}
