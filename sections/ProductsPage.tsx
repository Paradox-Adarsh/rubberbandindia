"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ─── Poppins font loader (add to your layout/head if not already) ─── */
// In app/layout.tsx add:
// import { Poppins } from "next/font/google";
// const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

const FONT = "'Poppins', Arial, sans-serif";
const BG = "#FAF7F2";
const BORDER = "#E8E4E0";
const MUTED = "#6B6560";
const DARK = "#1A1A1A";
const VIJAY = "#AA1E15";
const VAGAD = "#E8008A";

/* ─── useInView hook ────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Size data ─────────────────────────────────────────────────────── */
const SIZE_INFO: Record<string, { use: string; best: string; brand: "vijay" | "vagad" | "both" }> = {
  '½″': { use: "Small stationery bundles, currency notes, light packaging", best: "Both brands", brand: "both" },
  '¾″': { use: "Document folders, general office bundling", best: "Vijay (single colour)", brand: "vijay" },
  '1″': { use: "Medium bundles, retail packs, gift wrapping", best: "Both brands", brand: "both" },
  '1½″': { use: "Larger document stacks, produce bundling", best: "Vagad (premium elasticity)", brand: "vagad" },
  '2″': { use: "Newspaper bundles, mid-size industrial use", best: "Vagad (heavy duty)", brand: "vagad" },
  '3″': { use: "Large produce, thick bundle binding", best: "Vagad (heavy duty)", brand: "vagad" },
  '4″': { use: "Heavy industrial bundles, large packaging rolls", best: "Vijay (wide range available)", brand: "vijay" },
};

/* ─── Feature tile ──────────────────────────────────────────────────── */
function FeatTile({
  icon, title, sub, delay,
}: { icon: string; title: string; sub: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${BORDER}`,
        padding: "18px 16px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .45s ease ${delay}s, transform .45s ease ${delay}s`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: DARK, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 11, color: MUTED }}>{sub}</div>
    </div>
  );
}

/* ─── Brand card ────────────────────────────────────────────────────── */
function BrandCard({
  href, name, tagline, description, accent, bgFrom, bgTo, delay, logo,
  stats, tags,
}: {
  href: string; name: string; tagline: string; description: string;
  accent: string; bgFrom: string; bgTo: string; delay: number;
  logo: React.ReactNode;
  stats: { num: string; label: string }[];
  tags: string[];
}) {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s`,
      }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            background: "#fff",
            overflow: "hidden",
            cursor: "pointer",
            display: "block",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            boxShadow: hovered ? `0 20px 50px ${accent}22` : "none",
            transition: "transform .3s ease, box-shadow .3s ease",
            fontFamily: FONT,
          }}
        >
          {/* Gradient top */}
          <div
            style={{
              padding: "32px 28px 28px",
              background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Dot pattern */}
            <div
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                opacity: 0.05,
              }}
            />
            {/* Floating ring */}
            <div
              style={{
                position: "absolute", top: 16, right: 20, opacity: 0.12,
                animation: "ge-float 6s ease-in-out infinite",
              }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40">
                <ellipse cx="40" cy="20" rx="36" ry="16" stroke="white" strokeWidth="4" fill="none" />
                <ellipse cx="40" cy="20" rx="36" ry="16" stroke="white" strokeWidth="2" fill="none"
                  strokeDasharray="5 4" opacity="0.4" />
              </svg>
            </div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, position: "relative", zIndex: 1 }}>
              {logo}
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 6, position: "relative", zIndex: 1, fontFamily: FONT }}>
              {name}
            </h2>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 18, position: "relative", zIndex: 1, fontFamily: FONT }}>
              {tagline}
            </p>
            <div style={{ display: "flex", gap: 24, position: "relative", zIndex: 1 }}>
              {stats.map(({ num, label }) => (
                <div key={num}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: FONT }}>{num}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 1, fontFamily: FONT }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* White body */}
          <div style={{ padding: "24px 28px 22px" }}>
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 16 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11, fontWeight: 600, padding: "4px 10px",
                    borderRadius: 20, letterSpacing: ".03em",
                    background: accent === VIJAY ? "#FFF0EF" : "#FFF0F8",
                    color: accent,
                    fontFamily: FONT,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 20, fontFamily: FONT }}>
              {description}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 10, fontSize: 13,
                  fontWeight: 700, color: "#fff", background: accent,
                  fontFamily: FONT, transition: "opacity .2s",
                }}
              >
                View Products
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <svg
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={hovered ? MUTED : BORDER} strokeWidth="2"
                style={{ transition: "transform .3s, stroke .2s", transform: hovered ? "translateX(5px)" : "translateX(0)" }}
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Size finder ───────────────────────────────────────────────────── */
function SizeFinder() {
  const { ref, visible } = useInView();
  const [active, setActive] = useState<string | null>(null);

  const info = active ? SIZE_INFO[active] : null;
  const accent = info?.brand === "vagad" ? VAGAD : VIJAY;

  return (
    <div
      ref={ref}
      style={{
        background: "#fff", borderRadius: 20, border: `1px solid ${BORDER}`,
        padding: "28px 32px", marginBottom: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .45s ease .1s, transform .45s ease .1s",
        fontFamily: FONT,
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 800, color: DARK, marginBottom: 16, fontFamily: FONT }}>
        Find your size
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
        {Object.keys(SIZE_INFO).map((size) => {
          const isActive = active === size;
          const ac = SIZE_INFO[size].brand === "vagad" ? VAGAD : VIJAY;
          return (
            <button
              key={size}
              onClick={() => setActive(isActive ? null : size)}
              style={{
                padding: "8px 16px", borderRadius: 10,
                border: `1.5px solid ${isActive ? ac : BORDER}`,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: isActive ? ac : "#fff",
                color: isActive ? "#fff" : MUTED,
                fontFamily: FONT,
                transition: "all .2s",
              }}
            >
              {size}
            </button>
          );
        })}
      </div>

      {info && (
        <div
          style={{
            marginTop: 16, padding: "14px 18px", borderRadius: 12,
            background: accent === VAGAD ? "#FFF0F8" : "#FFF0EF",
            borderLeft: `3px solid ${accent}`,
            fontSize: 13, lineHeight: 1.7, fontFamily: FONT,
            animation: "ge-fadein .2s ease",
          }}
        >
          <strong style={{ color: accent }}>{active} bands</strong><br />
          <span style={{ color: MUTED }}>
            Best for: {info.use}<br />
            Recommended: <strong style={{ color: accent }}>{info.best}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Compare strip ─────────────────────────────────────────────────── */
function CompareStrip() {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "#fff", borderRadius: 20, border: `1px solid ${BORDER}`,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .45s ease .2s, transform .45s ease .2s",
        fontFamily: FONT,
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${VIJAY}, ${VAGAD})` }} />
      <div style={{ padding: "28px 32px" }}>
        <p style={{ fontSize: 17, fontWeight: 800, color: DARK, marginBottom: 6, fontFamily: FONT }}>
          Not sure which brand?
        </p>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, marginBottom: 20, fontFamily: FONT }}>
          Both brands are repacked by Ghanshyam Enterprises with the same quality standards.
          Contact us and we'll help you pick the right one for your application.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10 }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 22px", borderRadius: 10, fontSize: 13,
              fontWeight: 700, color: "#fff", background: VIJAY,
              textDecoration: "none", fontFamily: FONT,
            }}
          >
            Ask Us
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="tel:9820674274"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 22px", borderRadius: 10, fontSize: 13,
              fontWeight: 700, color: DARK,
              border: `1.5px solid ${BORDER}`, textDecoration: "none",
              fontFamily: FONT,
            }}
          >
            📞 Call 9820674274
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function ProductsPage() {
  return (
    <>
      {/* Keyframe animations injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        @keyframes ge-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes ge-underline {
          to { transform: scaleX(1); }
        }
        @keyframes ge-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          padding: "48px 20px 64px",
          background: BG,
          fontFamily: FONT,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ width: 28, height: 2, borderRadius: 2, background: VIJAY, display: "inline-block" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase" as const, color: VIJAY, fontFamily: FONT }}>
                Our Brands
              </span>
              <span style={{ width: 28, height: 2, borderRadius: 2, background: VIJAY, display: "inline-block" }} />
            </div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, fontFamily: FONT }}>
              Our{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Product Range
                <span
                  style={{
                    position: "absolute", bottom: -4, left: 0, width: "100%", height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${VIJAY}, ${VAGAD})`,
                    transform: "scaleX(0)", transformOrigin: "left",
                    animation: "ge-underline .6s .5s ease forwards",
                    display: "block",
                  }}
                />
              </span>
            </h1>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontFamily: FONT }}>
              Ghanshyam Enterprises distributes two trusted rubber band brands across India.
              Choose your brand below to explore the full product range.
            </p>
          </div>

          {/* ── Feature tiles ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <FeatTile icon="🏭" title="Since 2001"      sub="Trusted heritage brand"   delay={0.05} />
            <FeatTile icon="📦" title="Bulk Supply"     sub="Industrial & retail packs" delay={0.12} />
            <FeatTile icon="🎨" title="6+ Variants"     sub="Colors & materials"       delay={0.19} />
            <FeatTile icon="📏" title="½″ – 4″"         sub="Full size range"          delay={0.26} />
          </div>

          {/* ── Brand cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              marginBottom: 28,
            }}
          >
            <BrandCard
              href="/products/vijay"
              name="Vijay Rubber Bands"
              tagline="Classic · Trusted · Since 2001"
              description="Single colour, centre-line double colour, fluorescent disco nylon bands — available in sizes ½″ to 4″. India's most trusted rubber band brand for stationery and industrial use."
              accent={VIJAY}
              bgFrom="#1A1A1A"
              bgTo={VIJAY}
              delay={0.1}
              tags={["Single Colour", "Double Colour", "Fluorescent", "Disco Nylon"]}
              stats={[
                { num: "6+", label: "Product types" },
                { num: "6",  label: "Size variants" },
                { num: "20+", label: "Years trusted" },
              ]}
              logo={
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 48 48" width="30" height="30" fill="none">
                      <ellipse cx="24" cy="24" rx="20" ry="12" stroke="white" strokeWidth="3.5" fill="none" />
                      <ellipse cx="24" cy="24" rx="20" ry="12" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.5" />
                      <ellipse cx="24" cy="24" rx="11" ry="6" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.6)", fontFamily: FONT }}>VIJAY</span>
                </div>
              }
            />

            <BrandCard
              href="/products/vagad"
              name="Vagad Rubber Bands"
              tagline="Premium · Vibrant · Consistent"
              description="Premium quality rubber bands with superior elasticity and stretch. Available in standard, fluorescent and heavy-duty variants in sizes ½″ to 4″. Ideal for bulk industrial and retail use."
              accent={VAGAD}
              bgFrom="#0D1F5C"
              bgTo={VAGAD}
              delay={0.2}
              tags={["Standard", "Fluorescent", "Heavy Duty", "Premium"]}
              stats={[
                { num: "6+", label: "Product types" },
                { num: "6",  label: "Size variants" },
                { num: "HD", label: "Heavy duty" },
              ]}
              logo={
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 48 48" width="30" height="30" fill="none">
                      <path d="M12 6L12 26L24 38L36 26L36 6L28 6L28 22L24 30L20 22L20 6Z" fill="white" opacity="0.3" />
                      <ellipse cx="24" cy="17" rx="14" ry="9" stroke="white" strokeWidth="2.5" fill="none" />
                      <text x="24" y="21" textAnchor="middle" fontSize="7" fontWeight="900" fill="white" fontFamily="Poppins,Arial" letterSpacing="0.5">VAGAD</text>
                    </svg>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.6)", fontFamily: FONT }}>VAGAD</span>
                </div>
              }
            />
          </div>

          {/* ── Size finder ── */}
          <SizeFinder />

          {/* ── Compare strip ── */}
          <CompareStrip />

        </div>
      </main>
    </>
  );
}