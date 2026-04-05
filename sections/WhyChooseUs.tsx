"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const FONT = "'Poppins', sans-serif";

/* ─── Feature data ───────────────────────────────────────────────────── */
const FEATURES = [
  {
    id: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M3 13h26" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M10 19h4M10 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <motion.path d="M22 19l2 2 4-4" stroke="#AA1E15" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Bulk Pricing",
    subtitle: "More you order, less you pay",
    description:
      "Tiered pricing from 500g to 25kg+ orders. Volume discounts automatically applied. No hidden charges, transparent invoice every time.",
    stat: "↓ 40%",
    statLabel: "cost vs retail",
    color: "#AA1E15",
    bg: "rgba(170,30,21,0.06)",
    border: "rgba(170,30,21,0.15)",
  },
  {
    id: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16C4 9.37 9.37 4 16 4s12 5.37 12 12-5.37 12-12 12S4 22.63 4 16z" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M16 9v7l4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Fast Delivery",
    subtitle: "Pan-India in 2–5 business days",
    description:
      "Same-day dispatch for orders placed before 2 PM. Courier partners across all 28 states. Track your order in real time.",
    stat: "2–5",
    statLabel: "day delivery",
    color: "#1A6B3C",
    bg: "rgba(26,107,60,0.06)",
    border: "rgba(26,107,60,0.15)",
  },
  {
    id: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 21l-7.4 5.6 2.8-8.6L4 11.6h9.2L16 3z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    ),
    title: "ISO Certified",
    subtitle: "Quality you can count on",
    description:
      "Every batch passes tension, elongation and weight checks. ISO quality assurance means consistent bands — no snapping, no slack.",
    stat: "100%",
    statLabel: "quality checked",
    color: "#1A4F8A",
    bg: "rgba(26,79,138,0.06)",
    border: "rgba(26,79,138,0.15)",
  },
  {
    id: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Custom Sizes",
    subtitle: "Made to your specification",
    description:
      "Need a non-standard width, length or colour? We manufacture to spec. Minimum custom runs from 5kg. OEM packaging available.",
    stat: "50+",
    statLabel: "sizes available",
    color: "#7B3FA0",
    bg: "rgba(123,63,160,0.06)",
    border: "rgba(123,63,160,0.15)",
  },
];

/* ─── Animated rubber band ring for icon bg ──────────────────────────── */
function BandRing({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <motion.div
      animate={
        hovered
          ? { scaleX: 1.22, scaleY: 0.78 }
          : { scaleX: 1, scaleY: 1 }
      }
      transition={{ type: "spring", stiffness: 380, damping: 18, restDelta: 0.005 }}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        opacity: hovered ? 0.35 : 0.15,
        transformOrigin: "center",
        pointerEvents: "none",
        transition: "opacity 0.2s",
      }}
    />
  );
}

/* ─── Feature card ───────────────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 18,
        border: `1.5px solid ${hovered ? feature.color + "55" : "#EDE8DF"}`,
        padding: "32px 28px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        overflow: "hidden",
        transition: "border-color 0.22s, box-shadow 0.22s",
        boxShadow: hovered
          ? `0 10px 36px ${feature.bg.replace("0.06", "0.18")}, 0 2px 8px rgba(0,0,0,0.05)`
          : "0 2px 14px rgba(0,0,0,0.04)",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Accent wash */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${feature.bg} 0%, transparent 65%)`,
          pointerEvents: "none",
          borderRadius: 18,
        }}
      />

      {/* Top row: icon + stat */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Icon container with band ring */}
        <div style={{ position: "relative", width: 58, height: 58 }}>
          <BandRing color={feature.color} hovered={hovered} />
          <motion.div
            animate={hovered ? { rotate: [0, -6, 6, 0] } : { rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: feature.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: feature.color,
              position: "relative",
              zIndex: 1,
            }}
          >
            {feature.icon}
          </motion.div>
        </div>

        {/* Stat badge */}
        <motion.div
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: feature.color,
              fontFamily: FONT,
              lineHeight: 1,
            }}
          >
            {feature.stat}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#9B9590",
              fontFamily: FONT,
              textAlign: "right",
              lineHeight: 1.3,
            }}
          >
            {feature.statLabel}
          </span>
        </motion.div>
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: "#1A1A1A",
            fontFamily: FONT,
            lineHeight: 1.2,
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            color: feature.color,
            fontFamily: FONT,
            letterSpacing: "0.02em",
          }}
        >
          {feature.subtitle}
        </p>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          color: "#6B6560",
          fontFamily: FONT,
          lineHeight: 1.7,
          flexGrow: 1,
        }}
      >
        {feature.description}
      </p>

      {/* Bottom animated bar */}
      <div
        style={{
          height: 3,
          borderRadius: 4,
          backgroundColor: "#F0EBE5",
          overflow: "hidden",
          marginTop: 4,
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }}
          style={{
            height: "100%",
            backgroundColor: feature.color,
            transformOrigin: "left",
            opacity: 0.6,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{ textAlign: "center", marginBottom: 52 }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          padding: "6px 16px",
          borderRadius: 20,
          backgroundColor: "rgba(170,30,21,0.07)",
          border: "1px solid rgba(170,30,21,0.15)",
        }}
      >
        {/* Pulsing band */}
        <motion.svg
          width="20" height="11" viewBox="0 0 20 11" fill="none"
          animate={{ scaleX: [1, 1.28, 1], scaleY: [1, 0.72, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        >
          <ellipse cx="10" cy="5.5" rx="9" ry="4" stroke="#AA1E15" strokeWidth="2" fill="none"/>
        </motion.svg>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#AA1E15",
            fontFamily: FONT,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          Why Choose Us
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.45 }}
        style={{
          margin: "0 0 14px",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: 800,
          color: "#1A1A1A",
          fontFamily: FONT,
          lineHeight: 1.2,
        }}
      >
        The rubber band supplier{" "}
        <span style={{ color: "#AA1E15", position: "relative" }}>
          businesses rely on
          <motion.svg
            viewBox="0 0 200 7"
            style={{
              position: "absolute",
              bottom: -5,
              left: 0,
              width: "100%",
              height: 7,
              overflow: "visible",
            }}
          >
            <motion.path
              d="M 0 3.5 Q 50 1 100 3.5 Q 150 6 200 3.5"
              stroke="#AA1E15"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
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
          maxWidth: 500,
          fontSize: 15,
          color: "#6B6560",
          fontFamily: FONT,
          lineHeight: 1.7,
        }}
      >
        Over two decades supplying rubber bands to offices, factories and retailers
        across India — here's why they keep coming back.
      </motion.p>
    </div>
  );
}

/* ─── Bottom trust bar ───────────────────────────────────────────────── */
function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const items = [
    { emoji: "🏭", text: "Since 2001" },
    { emoji: "🚚", text: "Pan-India delivery" },
    { emoji: "📦", text: "MOQ from 500g" },
    { emoji: "💬", text: "WhatsApp support" },
    { emoji: "🔄", text: "Easy reorders" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.45 }}
      style={{
        marginTop: 56,
        padding: "20px 32px",
        borderRadius: 14,
        backgroundColor: "#fff",
        border: "1.5px solid #EDE8DF",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px 40px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.07 + 0.3, duration: 0.35 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span style={{ fontSize: 16 }}>{item.emoji}</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#4A4540",
              fontFamily: FONT,
            }}
          >
            {item.text}
          </span>
          {i < items.length - 1 && (
            <span
              style={{
                marginLeft: 20,
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "#D4CFC8",
                display: "inline-block",
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  return (
    <section
      style={{
        backgroundColor: "#FAF7F2",
        padding: "88px 0 96px",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid — consistent with other sections */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(170,30,21,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Soft glow top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(170,30,21,0.05) 0%, transparent 70%)",
          top: "-15%",
          right: "-8%",
          filter: "blur(60px)",
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

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <TrustBar />
      </div>
    </section>
  );
}