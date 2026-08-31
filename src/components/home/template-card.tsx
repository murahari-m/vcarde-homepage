import type { ReactNode } from "react";
import {
  Download,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Nfc,
  Phone,
  QrCode,
  Sparkles,
  Star,
} from "lucide-react";
import { site, type ShowcaseCard } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  { label: "Digital vCard", Icon: Globe },
  { label: "NFC print", Icon: Nfc },
  { label: "Foil & UV", Icon: Sparkles },
  { label: "Review tap", Icon: Star },
];

function PhoneChrome({
  children,
  theme,
  compact,
}: {
  children: ReactNode;
  theme: string;
  compact?: boolean;
}) {
  return (
    <article className={cn("tpl-phone", theme, compact && "is-compact")}>
      <span className="iphone-btn iphone-silent" aria-hidden />
      <span className="iphone-btn iphone-vol-up" aria-hidden />
      <span className="iphone-btn iphone-vol-down" aria-hidden />
      <span className="iphone-btn iphone-power" aria-hidden />
      <div className="tpl-bezel">
        <span className="iphone-island" aria-hidden />
        <div className="tpl-screen">{children}</div>
      </div>
    </article>
  );
}

function Identity({
  name,
  role,
  company,
}: {
  name: string;
  role: string;
  company: string;
}) {
  return (
    <>
      <div className="tpl-avatar" aria-hidden>
        {name.charAt(0)}
      </div>
      <div className="tpl-identity">
        <p className="tpl-name">{name}</p>
        <p className="tpl-role">{role}</p>
        <p className="tpl-company">{company}</p>
      </div>
      <div className="tpl-actions" aria-hidden>
        <span>
          <Phone className="size-3.5" strokeWidth={2} />
        </span>
        <span>
          <Mail className="size-3.5" strokeWidth={2} />
        </span>
        <span>
          <MapPin className="size-3.5" strokeWidth={2} />
        </span>
        <span>
          <Globe className="size-3.5" strokeWidth={2} />
        </span>
        <span>
          <Download className="size-3.5" strokeWidth={2} />
        </span>
      </div>
    </>
  );
}

export function TemplateCard({
  tpl,
  compact = false,
}: {
  tpl: ShowcaseCard;
  compact?: boolean;
}) {
  if (tpl.kind === "original") {
    return (
      <PhoneChrome theme="tpl-original" compact={compact}>
        <img
          src={tpl.image}
          alt={`${tpl.name} digital visiting card template`}
          className="tpl-shot"
          width={390}
          height={844}
          loading="lazy"
          decoding="async"
        />
      </PhoneChrome>
    );
  }

  if (tpl.kind === "store") {
    return (
      <PhoneChrome theme="tpl-theme-store" compact={compact}>
        <div className="tpl-cover">
          <img src={tpl.cover} alt="" className="tpl-cover-img" width={640} height={360} loading="lazy" decoding="async" />
        </div>
        <Identity {...tpl.person} />
        <div className="tpl-wa">
          <MessageCircle className="size-3.5" strokeWidth={2} />
          Order on WhatsApp
        </div>
        <div className="tpl-block">
          <p className="tpl-heading">Products</p>
          <ul className="tpl-products">
            {tpl.products.map((p) => (
              <li key={p.name}>
                <span>{p.name}</span>
                <span>{p.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="tpl-block tpl-contact">
          <p className="tpl-heading">Contact</p>
          <p>{site.phones[0].display}</p>
          <p>{site.phones[1].display}</p>
        </div>
      </PhoneChrome>
    );
  }

  return (
    <PhoneChrome theme={`tpl-theme-${tpl.id}`} compact={compact}>
      <div className="tpl-cover">
        <img
          src={`/covers/${tpl.id}.jpg`}
          alt=""
          className="tpl-cover-img"
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
        />
        {tpl.overlay ? (
          <div className="tpl-cover-copy">
            <p className="tpl-cover-brand">{tpl.person.company}</p>
            <p>{tpl.person.name}</p>
          </div>
        ) : null}
      </div>
      <Identity {...tpl.person} />
      <div className="tpl-share" aria-hidden>
        <p>Share</p>
        <div>
          <MessageCircle className="size-3.5" strokeWidth={2} />
          <Facebook className="size-3.5" strokeWidth={2} />
          <Instagram className="size-3.5" strokeWidth={2} />
          <Linkedin className="size-3.5" strokeWidth={2} />
          <QrCode className="size-3.5" strokeWidth={2} />
        </div>
      </div>
      <div className="tpl-block">
        <p className="tpl-heading">Our services</p>
        <ul className="tpl-services">
          {services.map((s) => (
            <li key={s.label}>
              <s.Icon className="size-3.5" strokeWidth={2} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="tpl-block tpl-contact">
        <p className="tpl-heading">Contact</p>
        <p>{site.phones[0].display}</p>
        <p>{site.phones[1].display}</p>
      </div>
    </PhoneChrome>
  );
}
