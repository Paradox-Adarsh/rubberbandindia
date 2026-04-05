"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const FONT_HEADING = "'Poppins', sans-serif";
const FONT_BODY = "'Poppins', sans-serif";

/* ─── Product data ───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Standard Mixed Bundle",
    subtitle: "Assorted sizes for everyday use",
    sizes: ["#16", "#18", "#32", "#64"],
    tag: "Bestseller",
    tagColor: "#AA1E15",
    weight: "500g / 1kg / 5kg",
    useCase: "Offices · Stationery · Retail",
    color: "#AA1E15",
    accent: "rgba(170,30,21,0.08)",
    icon: (
      <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="40">
        <ellipse cx="32" cy="20" rx="28" ry="11" stroke="#AA1E15" strokeWidth="4" fill="none"/>
        <ellipse cx="32" cy="20" rx="20" ry="7.5" stroke="#AA1E15" strokeWidth="2.5" fill="none" opacity="0.4"/>
        <ellipse cx="32" cy="20" rx="28" ry="11" stroke="#C4261C" strokeWidth="1.5" fill="none" strokeDasharray="5 4" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Heavy Duty Industrial",
    subtitle: "Thick bands for packaging & bundling",
    sizes: ["#64", "#84", "#107"],
    tag: "Bulk Deal",
    tagColor: "#1A5C1A",
    weight: "1kg / 5kg / 25kg",
    useCase: "Packaging · Warehouses · Logistics",
    color: "#2C5F2E",
    accent: "rgba(44,95,46,0.07)",
    icon: (
      <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="40">
        <ellipse cx="32" cy="20" rx="28" ry="13" stroke="#2C5F2E" strokeWidth="5.5" fill="none"/>
        <ellipse cx="32" cy="20" rx="18" ry="8" stroke="#2C5F2E" strokeWidth="3" fill="none" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Coloured Band Set",
    subtitle: "Vibrant colour-coded organisation",
    sizes: ["#16", "#32", "#64"],
    tag: "Popular",
    tagColor: "#7B3FA0",
    weight: "250g / 500g",
    useCase: "Schools · Crafts · Sorting",
    color: "#7B3FA0",
    accent: "rgba(123,63,160,0.07)",
    icon: (
      <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="40">
        <ellipse cx="32" cy="20" rx="28" ry="11" stroke="#E05C2A" strokeWidth="3.5" fill="none"/>
        <ellipse cx="32" cy="17" rx="22" ry="8.5" stroke="#7B3FA0" strokeWidth="3" fill="none" opacity="0.7"/>
        <ellipse cx="32" cy="23" rx="16" ry="6" stroke="#1A7ABF" strokeWidth="2.5" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: "Jumbo Postal Bands",
    subtitle: "Long-stretch for mail & bundles",
    sizes: ["#107", "#117", "#120"],
    tag: "New",
    tagColor: "#1A5C7A",
    weight: "500g / 1kg",
    useCase: "Postal · Courier · Mail rooms",
    color: "#1A5C7A",
    accent: "rgba(26,92,122,0.07)",
    icon: (
      <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="40">
        <ellipse cx="32" cy="20" rx="28" ry="7" stroke="#1A5C7A" strokeWidth="3.5" fill="none"/>
        <ellipse cx="32" cy="20" rx="28" ry="7" stroke="#1A5C7A" strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity="0.4"/>
        <ellipse cx="32" cy="20" rx="18" ry="4.5" stroke="#1A5C7A" strokeWidth="2" fill="none" opacity="0.3"/>
      </svg>
    ),
  },
];

/* ─── Rubber band stretch animation on hover ─────────────────────────── */
function StretchBand({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ scaleX: 1 }}
      whileHover={{ scaleX: 1.18, scaleY: 0.82 }}
      transition={{ type: "spring", stiffness: 400, damping: 18, restDelta: 0.005 }}
      style={{ display: "inline-block", transformOrigin: "center" }}
    >
      <svg viewBox="0 0 80 50" width="80" height="50" fill="none">
        <ellipse cx="40" cy="25" rx="35" ry="14" stroke={color} strokeWidth="4.5" fill="none"/>
        <ellipse cx="40" cy="25" rx="35" ry="14" stroke={color} strokeWidth="1.5"
          fill="none" strokeDasharray="6 4" opacity="0.4"/>
        <ellipse cx="40" cy="25" rx="22" ry="8.5" stroke={color} strokeWidth="2"
          fill="none" opacity="0.28"/>
      </svg>
    </motion.div>
  );
}

/* ─── Product card ───────────────────────────────────────────────────── */
function ProductCard({
  product, index,
}: {
  product: (typeof PRODUCTS)[0]; index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 16,
        border: `1.5px solid ${hovered ? product.color : "#E8E4E0"}`,
        padding: "28px 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.22s, box-shadow 0.22s",
        boxShadow: hovered
          ? `0 8px 32px ${product.accent.replace("0.07", "0.18")}, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        willChange: "transform",
      }}
    >
      {/* Subtle accent wash on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${product.accent} 0%, transparent 70%)`,
          pointerEvents: "none",
          borderRadius: 16,
        }}
      />

      {/* Tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            backgroundColor: product.tagColor,
            fontFamily: FONT_BODY,
            letterSpacing: "0.04em",
          }}
        >
          {product.tag}
        </span>

        {/* Stretchy band icon */}
        <StretchBand color={product.color} />
      </div>

      {/* Name & subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: "#1A1A1A",
            fontFamily: FONT_HEADING,
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "#6B6560",
            fontFamily: FONT_BODY,
            lineHeight: 1.5,
          }}
        >
          {product.subtitle}
        </p>
      </div>

      {/* Sizes */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {product.sizes.map((s) => (
          <span
            key={s}
            style={{
              padding: "3px 9px",
              borderRadius: 6,
              border: `1px solid ${product.color}33`,
              backgroundColor: product.accent,
              fontSize: 11,
              fontWeight: 600,
              color: product.color,
              fontFamily: FONT_BODY,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#F0EBE5" }} />

      {/* Meta row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#9B9590" strokeWidth="2" strokeLinecap="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
          <span style={{ fontSize: 12, color: "#6B6560", fontFamily: FONT_BODY }}>{product.weight}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#9B9590" strokeWidth="2" strokeLinecap="round">
            <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
          </svg>
          <span style={{ fontSize: 12, color: "#6B6560", fontFamily: FONT_BODY }}>{product.useCase}</span>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: product.color,
          fontFamily: FONT_BODY,
          fontSize: 13,
          fontWeight: 700,
          marginTop: 2,
        }}
      >
        View details
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          padding: "6px 14px",
          borderRadius: 20,
          backgroundColor: "rgba(170,30,21,0.07)",
          border: "1px solid rgba(170,30,21,0.15)",
        }}
      >
        {/* Tiny animated band */}
        <motion.div
          animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 0.75, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <ellipse cx="9" cy="5" rx="8" ry="3.5" stroke="#AA1E15" strokeWidth="2" fill="none"/>
          </svg>
        </motion.div>
        <span style={{
          fontSize: 12, fontWeight: 700, color: "#AA1E15",
          fontFamily: FONT_BODY, letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          Our Products
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.45 }}
        style={{
          margin: "0 0 12px",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: 800,
          color: "#1A1A1A",
          fontFamily: FONT_HEADING,
          lineHeight: 1.2,
        }}
      >
        Built for every{" "}
        <span style={{ color: "#AA1E15", position: "relative" }}>
          scale
          {/* Underline squiggle */}
          <motion.svg
            viewBox="0 0 80 6"
            style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 6, overflow: "visible" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            <motion.path
              d="M 0 3 Q 20 1 40 3 Q 60 5 80 3"
              stroke="#AA1E15" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.svg>
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.45 }}
        style={{
          margin: "0 auto",
          maxWidth: 480,
          fontSize: 15,
          color: "#6B6560",
          fontFamily: FONT_BODY,
          lineHeight: 1.7,
        }}
      >
        From small office packs to 25kg industrial bulk orders — we have the right
        band for every job.
      </motion.p>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function ProductPreview() {
  return (
    <section
      style={{
        backgroundColor: "#FAF7F2",
        padding: "80px 0 96px",
        fontFamily: FONT_BODY,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid background — same as hero */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(170,30,21,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader />

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PRODUCTS.map((product, i) => (
            <Link
              key={product.id}
              href={`/products#${product.name.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <ProductCard product={product} index={i} />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.45 }}
          style={{ textAlign: "center", marginTop: 52 }}
        >
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 32px",
              borderRadius: 8,
              backgroundColor: "#AA1E15",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              fontFamily: FONT_HEADING,
              letterSpacing: "0.02em",
              boxShadow: "0 4px 18px rgba(170,30,21,0.28)",
              transition: "background 0.18s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C4261C";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#AA1E15";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View All Products
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <p style={{
            marginTop: 12,
            fontSize: 12,
            color: "#9B9590",
            fontFamily: FONT_BODY,
          }}>
            Bulk pricing available · MOQ as low as 500g
          </p>
        </motion.div>
      </div>
    </section>
  );
}