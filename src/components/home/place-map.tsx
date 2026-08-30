import { MapPin } from "lucide-react";
import { site } from "@/lib/site";

export function PlaceMap({
  heightClass = "place-map-lg",
}: {
  heightClass?: "place-map-lg" | "place-map-sm";
}) {
  return (
    <div className="place-map">
      <div className={`place-map-art ${heightClass}`} aria-hidden>
        <span className="place-map-tank" />
        <span className="place-map-street place-map-street-h" />
        <span className="place-map-street place-map-street-h2" />
        <span className="place-map-street place-map-street-v" />
        <span className="place-map-block a" />
        <span className="place-map-block b" />
        <span className="place-map-block c" />
        <span className="place-map-label">South Mada St</span>
        <span className="place-map-label2">Mylapore</span>
        <span className="place-map-pin">
          <MapPin className="size-5" strokeWidth={2.4} />
          <span>VCARDe</span>
        </span>
      </div>
      <div className="map-caption">
        <p className="map-caption-brand">{site.name}</p>
        <p>{site.address}</p>
        <a href={site.links.maps} className="map-caption-link">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
