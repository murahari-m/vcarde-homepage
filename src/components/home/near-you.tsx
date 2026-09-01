import { useEffect, useState } from "react";
import { matchAreaFromCity } from "@/lib/chennai-areas";

type Line = { text: string; href: string; label: string };

type GeoJson = {
  ok?: boolean;
  source?: string;
  city?: string;
  sublocality?: string;
  region?: string;
};

const fallback: Line = {
  text: "Buy NFC card near Mylapore · free delivery across India",
  href: "/nfc-card-near/mylapore",
  label: "All areas",
};

function lineFromGeo(data: GeoJson): Line | null {
  if (!data?.ok) return null;
  const area = matchAreaFromCity(data.sublocality ?? "", data.city ?? "", data.region ?? "");
  if (area) {
    return {
      text: `Buy NFC card near ${area.name}`,
      href: `/nfc-card-near/${area.slug}`,
      label: area.headline,
    };
  }
  const place = data.sublocality || data.city;
  if (place) {
    return {
      text: `We ship NFC cards to ${place} · printed in Mylapore`,
      href: "/nfc-card-near",
      label: "See all cities",
    };
  }
  return null;
}

async function readGeo(init?: RequestInit) {
  const res = await fetch("/geo.php", { ...init, headers: { Accept: "application/json" } });
  return (await res.json()) as GeoJson;
}

export function NearYou() {
  const [line, setLine] = useState<Line>(fallback);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    readGeo({ signal: ctrl.signal })
      .then((data) => {
        const next = lineFromGeo(data);
        if (next) setLine(next);
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  function usePrecise() {
    if (!navigator.geolocation) return;
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await readGeo({
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          });
          const next = lineFromGeo(data);
          if (next) setLine(next);
        } catch {
          /* keep last line */
        } finally {
          setBusy(false);
        }
      },
      () => setBusy(false),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 },
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg-muted">
      <p>
        {line.text}
        {" · "}
        <a href={line.href} className="text-accent underline">
          {line.label}
        </a>
      </p>
      <button
        type="button"
        onClick={usePrecise}
        disabled={busy}
        className="mt-2 text-xs text-accent underline disabled:opacity-50"
      >
        {busy ? "Finding your area…" : "Use precise location"}
      </button>
    </div>
  );
}
