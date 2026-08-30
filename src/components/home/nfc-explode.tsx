import { useEffect, useRef, useState } from "react";
import { nfcLayers } from "@/lib/site";
import { cn } from "@/lib/utils";

function InlayArt() {
  return (
    <svg viewBox="0 0 320 202" className="nfc-inlay-art" aria-hidden>
      <rect width="320" height="202" rx="12" fill="#161310" />
      <rect x="14" y="14" width="292" height="174" rx="8" fill="none" stroke="#c47a38" strokeWidth="3.2" />
      <rect x="26" y="26" width="268" height="150" rx="6" fill="none" stroke="#c47a38" strokeWidth="2.4" />
      <rect x="38" y="38" width="244" height="126" rx="5" fill="none" stroke="#d3924a" strokeWidth="2" />
      <rect x="50" y="50" width="220" height="102" rx="4" fill="none" stroke="#c47a38" strokeWidth="1.8" />
      <rect x="62" y="62" width="196" height="78" rx="3" fill="none" stroke="#a8662e" strokeWidth="1.5" />
      <path d="M160 62 V50" stroke="#c47a38" strokeWidth="1.8" />
      <path d="M172 101 H268" stroke="#c47a38" strokeWidth="1.8" />
      <rect x="148" y="86" width="28" height="30" rx="2" fill="#2c2a26" stroke="#8d8878" strokeWidth="1.2" />
      <rect x="152" y="90" width="20" height="8" fill="#3f3c36" />
      <rect x="154" y="102" width="6" height="8" fill="#6a6558" />
      <rect x="164" y="102" width="6" height="8" fill="#6a6558" />
      <text x="160" y="148" textAnchor="middle" fill="#c47a38" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.4">
        NTAG 213
      </text>
    </svg>
  );
}

function ReverseArt() {
  return (
    <div className="nfc-reverse" aria-hidden>
      <p>VCARDe</p>
      <span className="nfc-qr">
        {Array.from({ length: 64 }, (_, i) => (
          <i key={i} className={(i * 7) % 5 === 0 || (i * 3) % 7 === 0 ? "on" : undefined} />
        ))}
      </span>
    </div>
  );
}

export function NfcExplode() {
  const root = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={root} className={cn("nfc-explode", open && "is-open")}>
      <div className="nfc-explode-stage">
        <div className="nfc-stack" aria-hidden={!open}>
          <div
            className={cn("nfc-layer layer-lamination", active === "lamination" && "is-active")}
            onMouseEnter={() => setActive("lamination")}
          >
            <span className="nfc-film" />
          </div>
          <div
            className={cn("nfc-layer layer-print", active === "print" && "is-active")}
            onMouseEnter={() => setActive("print")}
          >
            <img src="/cards/vcarde-gold-uv.jpg" alt="" width={480} height={270} />
          </div>
          <div
            className={cn("nfc-layer layer-inlay", active === "inlay" && "is-active")}
            onMouseEnter={() => setActive("inlay")}
          >
            <InlayArt />
          </div>
          <div
            className={cn("nfc-layer layer-core", active === "core" && "is-active")}
            onMouseEnter={() => setActive("core")}
          >
            <span className="nfc-core-sheet">PVC</span>
          </div>
          <div
            className={cn("nfc-layer layer-back", active === "back" && "is-active")}
            onMouseEnter={() => setActive("back")}
          >
            <ReverseArt />
          </div>
        </div>
      </div>

      <div className="nfc-legend">
        <p className="nfc-legend-kicker">CR80 construction</p>
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
