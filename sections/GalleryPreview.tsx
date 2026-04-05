"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const FONT = "'Poppins', sans-serif";

/* ─── Gallery items — replace src with your actual image paths ───────── */
const GALLERY_ITEMS = [
  {
    id: 1,
    label: "Product Range",
    sublabel: "Full colour assortment",
    span: "lg:col-span-2 lg:row-span-2", // big card — top left
    aspect: "aspect-square",
    src: "/assets/images/gallery/rubber_lab.png",
  },
  {
    id: 2,
    label: "Industrial Bands",
    sublabel: "Heavy duty bulk rolls",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-video",
    src: "/assets/images/gallery/rubber_lab.png",
  },
  {
    id: 3,
    label: "Packaging",
    sublabel: "Retail & wholesale packs",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-video",
    src: "/assets/images/gallery/rubber_factory.png",
  },
  {
    id: 4,
    label: "Custom Orders",
    sublabel: "Made-to-spec bands",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-video",
    src: "/assets/images/gallery/rubber_pack.png",
  },
  {
    id: 5,
    label: "Quality Check",
    sublabel: "ISO-certified process",
    span: "lg:col-span-1 lg:row-span-1",
    aspect: "aspect-video",
    src: "/assets/images/gallery/rubber_quality.png",
  },
];

/* ─── Placeholder SVG shown until real image is added ───────────────── */
function PlaceholderGraphic({ index }: { index: number }) {
  const colors = ["#AA1E15", "#1A6B3C", "#1A4F8A", "#7B3FA0", "#C4261C"];
  const c = colors[index % colors.length];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: `radial-gradient(ellipse at center, ${c}18 0%, transparent 70%)`,
      }}
    >
      {/* Layered band rings */}
      <motion.div
        animate={{ scaleX: [1, 1.15, 1], scaleY: [1, 0.85, 1] }}
        transition={{
          duration: 3 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        style={{ transformOrigin: "center" }}
      >
        <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
          <ellipse cx="32" cy="16" rx="28" ry="11"
            stroke={c} strokeWidth="3.5" fill="none" opacity="0.6"/>
          <ellipse cx="32" cy="16" rx="28" ry="11"
            stroke={c} strokeWidth="1.5" fill="none"
            strokeDasharray="5 4" opacity="0.3"/>
          <ellipse cx="32" cy="16" rx="17" ry="6.5"
            stroke={c} strokeWidth="2" fill="none" opacity="0.25"/>
        </svg>
      </motion.div>
      <span style={{
        fontSize: 11, color: "#9B9590", fontFamily: FONT,
        fontWeight: 600, letterSpacing: "0.04em",
      }}>
        Image {index + 1}
      </span>
      <span style={{
        fontSize: 10, color: "#C4BFB8", fontFamily: FONT,
        textAlign: "center", lineHeight: 1.5, padding: "0 12px",
      }}>
        Replace src in<br />GALLERY_ITEMS
      </span>
    </div>
  );
}

/* ─── Individual gallery card ────────────────────────────────────────── */
function GalleryCard({
  item,
  index,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`${item.span} ${item.aspect} relative rounded-2xl overflow-hidden`}
      style={{
        backgroundColor: "#F0EBE5",
        border: `1.5px solid ${hovered ? "rgba(170,30,21,0.35)" : "#E8E3DC"}`,
        transition: "border-color 0.22s, box-shadow 0.22s",
        boxShadow: hovered
          ? "0 12px 36px rgba(170,30,21,0.14), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        willChange: "transform",
        cursor: "pointer",
        minHeight: index === 0 ? 320 : 160,
      }}
    >
      {/* ── Real image — uncomment once you have src ── */}
      {item.src && (
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      {/* Placeholder — remove once image is added */}
      <PlaceholderGraphic index={index} />

      {/* Overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(26,10,8,0.72) 0%, rgba(26,10,8,0.1) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Label — slides up on hover */}
      <motion.div
        animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontSize: index === 0 ? 17 : 14,
          fontWeight: 700,
          color: "#fff",
          fontFamily: FONT,
          lineHeight: 1.2,
        }}>
          {item.label}
        </span>
        <span style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.7)",
          fontFamily: FONT,
        }}>
          {item.sublabel}
        </span>
      </motion.div>

      {/* Top-right expand icon */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2.2">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
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
    <div ref={ref} style={{ marginBottom: 48 }}
      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5"
    >
      {/* Left text */}
      <div>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.38 }}
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
          <motion.svg
            width="18" height="10" viewBox="0 0 18 10" fill="none"
            animate={{ scaleX: [1, 1.28, 1], scaleY: [1, 0.72, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          >
            <ellipse cx="9" cy="5" rx="8" ry="3.5"
              stroke="#AA1E15" strokeWidth="2" fill="none"/>
          </motion.svg>
          <span style={{
            fontSize: 11, fontWeight: 700, color: "#AA1E15",
            fontFamily: FONT, letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            Gallery
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.42 }}
          style={{
            margin: 0,
            fontSize: "clamp(24px, 3.8vw, 36px)",
            fontWeight: 800,
            color: "#1A1A1A",
            fontFamily: FONT,
            lineHeight: 1.2,
          }}
        >
          See our{" "}
          <span style={{ color: "#AA1E15", position: "relative" }}>
            products in action
            <motion.svg
              viewBox="0 0 220 7"
              style={{
                position: "absolute", bottom: -5,
                left: 0, width: "100%", height: 7, overflow: "visible",
              }}
            >
              <motion.path
                d="M 0 3.5 Q 55 1 110 3.5 Q 165 6 220 3.5"
                stroke="#AA1E15" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.55, ease: "easeOut" }}
              />
            </motion.svg>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.22, duration: 0.42 }}
          style={{
            margin: "10px 0 0",
            fontSize: 14,
            color: "#6B6560",
            fontFamily: FONT,
            lineHeight: 1.7,
            maxWidth: 400,
          }}
        >
          A closer look at our range — from everyday stationery packs to
          industrial bulk orders.
        </motion.p>
      </div>

      {/* Right CTA */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.28, duration: 0.4 }}
        style={{ flexShrink: 0 }}
      >
        <Link
          href="/gallery"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "11px 22px",
            borderRadius: 8,
            border: "1.5px solid #D4CFC8",
            backgroundColor: "transparent",
            color: "#1A1A1A",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: FONT,
            transition: "border-color 0.18s, background 0.18s, transform 0.18s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#AA1E15";
            e.currentTarget.style.backgroundColor = "rgba(170,30,21,0.04)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#D4CFC8";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Full Gallery
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function GalleryPreview() {
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
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(170,30,21,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Soft glow */}
      <div aria-hidden style={{
        position: "absolute",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(170,30,21,0.05) 0%, transparent 65%)",
        bottom: "-15%", left: "-5%",
        filter: "blur(55px)", pointerEvents: "none",
      }}/>

      <div
        style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 24px", position: "relative", zIndex: 1,
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader />

        {/*
          Masonry-style grid:
          Desktop: 3 cols, 2 rows — item[0] spans 2×2 (big), items 1-4 fill right col + bottom
          Tablet:  2 cols
          Mobile:  1 col
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom count strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "16px 24px",
            borderRadius: 12,
            backgroundColor: "#fff",
            border: "1.5px solid #EDE8DF",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              backgroundColor: "rgba(170,30,21,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#AA1E15" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1A1A1A", fontFamily: FONT }}>
                Full gallery available
              </p>
              <p style={{ margin: 0, fontSize: 11, color: "#9B9590", fontFamily: FONT }}>
                Products · Packaging · Factory · Certifications
              </p>
            </div>
          </div>

          <Link
            href="/gallery"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "9px 20px", borderRadius: 7,
              backgroundColor: "#AA1E15", color: "#fff",
              fontWeight: 700, fontSize: 13,
              textDecoration: "none", fontFamily: FONT,
              boxShadow: "0 3px 12px rgba(170,30,21,0.25)",
              transition: "background 0.18s, transform 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C4261C";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#AA1E15";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View All Photos
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}