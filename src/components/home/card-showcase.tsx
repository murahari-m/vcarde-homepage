import { useEffect, useRef, useState } from "react";
import { goldCards } from "@/lib/site";

const N = goldCards.length;
const FIRST = goldCards[0];

export function CardShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const rot = useRef(0);
  const vel = useRef(0.012);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const [front, setFront] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    rot.current = 0;
    vel.current = 0.012;
    const holdUntil = performance.now() + 1600;

    const paint = () => {
      const width = root.current?.clientWidth ?? 720;
      const radius = Math.min(340, Math.max(200, width * 0.36));
      let nearest = 0;
      let nearestAbs = 99;
      goldCards.forEach((_, i) => {
        const a = rot.current + (i * Math.PI * 2) / N;
        const x = Math.sin(a) * radius;
        const depth = Math.cos(a);
        const scale = 0.55 + 0.5 * Math.max(depth, 0);
        const yaw = -Math.sin(a) * 38;
        const el = cards.current[i];
        if (el) {
          el.style.transform = `translateX(${x}px) rotateY(${yaw}deg) scale(${scale})`;
          el.style.zIndex = String(Math.round(12 + depth * 10));
          el.style.opacity = String(0.28 + 0.72 * Math.max(depth, 0));
        }
        const ad = Math.abs(((a + Math.PI) % (Math.PI * 2)) - Math.PI);
        if (ad < nearestAbs) {
          nearestAbs = ad;
          nearest = i;
        }
      });
      setFront((prev) => (prev === nearest ? prev : nearest));
    };

    paint();
    setLive(true);

    const tick = () => {
      if (!drag.current && !reduced && performance.now() > holdUntil) {
        rot.current += vel.current;
        if (Math.abs(vel.current) > 0.012) vel.current *= 0.97;
        else vel.current = 0.012 * Math.sign(vel.current || 1);
      }
      paint();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      drag.current = { x: e.clientX, start: rot.current };
      vel.current = 0;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      rot.current = drag.current.start + (e.clientX - drag.current.x) * 0.008;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag.current) return;
      vel.current = (e.clientX - drag.current.x) * 0.0004;
      drag.current = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      vel.current += (e.deltaY + e.deltaX) * 0.00035;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="card-orbit-clip">
    <div ref={root} className={`card-orbit${live ? " is-live" : ""}`} aria-roledescription="carousel">
      <div className="orbit-still">
        <img
          src={FIRST.file}
          alt="Mark VCARDe NFC business card"
          width={720}
          height={406}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      {goldCards.map((card, i) => (
        <article
          key={card.id}
          className="orbit-card"
          ref={(node) => {
            cards.current[i] = node;
          }}
        >
          <img
            src={card.file}
            alt={card.name}
            width={720}
            height={406}
            decoding="async"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </article>
      ))}
      <p className="card-orbit-caption">
        {goldCards[front].name} · {goldCards[front].brand}
      </p>
      <p className="card-orbit-hint">Scroll or drag</p>
    </div>
    </div>
  );
}
