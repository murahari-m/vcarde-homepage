import { useEffect, useRef, useState } from "react";
import { nfcLayers } from "@/lib/site";
import { cn } from "@/lib/utils";

function InlayArt() {
  return (
    <svg viewBox="0 0 320 202" className="nfc-inlay-art" aria-hidden>
      <rect width="320" height="202" rx="10" fill="#12100c" />
      <rect x="12" y="12" width="296" height="178" rx="7" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeDasharray="4 3" />
      <rect x="28" y="28" width="264" height="146" rx="6" fill="none" stroke="#8be64a" strokeWidth="2.4" />
      <rect x="44" y="42" width="232" height="118" rx="4" fill="none" stroke="#c9a84c" strokeWidth="1.8" />
      <rect x="60" y="56" width="200" height="90" rx="3" fill="none" stroke="#6a9a3a" strokeWidth="1.4" />
      <path d="M160 56 V42" stroke="#c9a84c" strokeWidth="1.6" />
      <path d="M176 101 H276" stroke="#c9a84c" strokeWidth="1.6" />
      <rect x="146" y="86" width="28" height="30" rx="2" fill="#1c1a16" stroke="#8be64a" strokeWidth="1.2" />
      <rect x="150" y="90" width="20" height="7" fill="#2a3224" />
      <rect x="152" y="102" width="6" height="8" fill="#c9a84c" />
      <rect x="162" y="102" width="6" height="8" fill="#c9a84c" />
      <text x="160" y="162" textAnchor="middle" fill="#8be64a" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.6">
        NTAG 213  ·  ISO 14443-A
      </text>
    </svg>
  );
}

export function NfcExplode() {
  const root = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<string | null>("inlay");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const stage = root.current?.querySelector(".nfc-explode-stage") as HTMLElement | null;
    const el = stack.current;
    if (!stage || !el) return;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
      el.style.setProperty("--tilt-x", `${x}deg`);
      el.style.setProperty("--tilt-y", `${-y}deg`);
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className={cn("nfc-explode", open && "is-open")}>
      <div className="nfc-explode-stage">
        <span className="nfc-dim nfc-dim-h" aria-hidden />
        <span className="nfc-dim nfc-dim-v" aria-hidden />
        <div ref={stack} className="nfc-stack" aria-hidden={!open}>
          <div
            className={cn("nfc-layer layer-lamination", active === "lamination" && "is-active")}
            onMouseEnter={() => setActive("lamination")}
            onClick={() => setActive("lamination")}
          >
            <span className="nfc-film" />
            <em className="nfc-tag">01 film</em>
          </div>
          <div
            className={cn("nfc-layer layer-print", active === "print" && "is-active")}
            onMouseEnter={() => setActive("print")}
            onClick={() => setActive("print")}
          >
            <img src="/cards/vcarde-gilt.jpg" alt="" width={1050} height={600} />
            <em className="nfc-tag">02 print</em>
          </div>
          <div
            className={cn("nfc-layer layer-inlay", active === "inlay" && "is-active")}
            onMouseEnter={() => setActive("inlay")}
            onClick={() => setActive("inlay")}
          >
            <InlayArt />
            <em className="nfc-tag">03 chip</em>
          </div>
          <div
            className={cn("nfc-layer layer-core", active === "core" && "is-active")}
            onMouseEnter={() => setActive("core")}
            onClick={() => setActive("core")}
          >
            <span className="nfc-core-sheet">PVC CORE</span>
            <em className="nfc-tag">04 core</em>
          </div>
          <div
            className={cn("nfc-layer layer-back", active === "back" && "is-active")}
            onMouseEnter={() => setActive("back")}
            onClick={() => setActive("back")}
          >
            <img src="/cards/vcarde-field.jpg" alt="" width={1050} height={600} />
            <em className="nfc-tag">05 reverse</em>
          </div>
        </div>
      </div>

      <div className="nfc-legend">
        <p className="nfc-legend-kicker">CR80 exploded view</p>
        <ol>
          {nfcLayers.map((layer, i) => (
            <li key={layer.id}>
              <button
                type="button"
                className={cn("nfc-legend-item", active === layer.id && "is-on")}
                onMouseEnter={() => setActive(layer.id)}
                onFocus={() => setActive(layer.id)}
                onClick={() => {
                  setActive(layer.id);
                  setOpen(true);
                }}
              >
                <span className="nfc-legend-num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="nfc-legend-name">{layer.name}</span>
                  <span className="nfc-legend-spec">{layer.spec}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="nfc-explode-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? "Collapse stack" : "Explode layers"}
        </button>
      </div>
    </div>
  );
}
