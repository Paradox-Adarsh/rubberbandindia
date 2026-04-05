"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const FONT = "'Poppins', sans-serif";

/* ─── Floating band ring decoration ─────────────────────────────────── */
function RingDeco({
  size,
  rx,
  ry,
  x,
  y,
  delay,
  opacity = 0.12,
  color = "#fff",
}: {
  size: number;
  rx: number;
  ry: number;
  x: string;
  y: string;
  delay: number;
  opacity?: number;
  color?: string;
}) {
  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
      animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={size}
        height={size * 0.45}
        viewBox={`0 0 ${size} ${size * 0.45}`}
        style={{ opacity }}
      >
        <ellipse
          cx={size / 2}
          cy={(size * 0.45) / 2}
          rx={rx}
          ry={ry}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
        />
        <ellipse
          cx={size / 2}
          cy={(size * 0.45) / 2}
          rx={rx}
          ry={ry}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5 4"
          opacity="0.5"
        />
      </svg>
    </motion.div>
  );
}

/* ─── Brand image placeholder card ──────────────────────────────────── */
function BrandCard({
  index,
  inView,
  // Uncomment and use these once you have your images:
  imageSrc,
  imageAlt,
}: {
  index: number;
  inView: boolean;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.35 + index * 0.15,
        duration: 0.45,
        ease: "easeOut",
      }}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        border: "1.5px solid rgba(255,255,255,0.18)",
        backgroundColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 180,
      }}
    >
     
      <Image
        src={imageSrc || "/assets/Images/logo/vijay_logo.png"}
        alt={imageAlt || "rubberbandindia"}
        fill
        className="object-contain p-4"
        priority
      />
      ─────────────────────────────────────────────────────────────
      {/* Placeholder UI — remove once images are added */}
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      />
    </motion.div>
  );
}

/* ─── Main CTA Banner ────────────────────────────────────────────────── */
export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#AA1E15",
        fontFamily: FONT,
      }}
    >
      {/* ── Background layers ── */}

      {/* Deep red gradient wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #8B1510 0%, #AA1E15 45%, #C4261C 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Soft glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
          top: "-25%",
          left: "-10%",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 65%)",
          bottom: "-20%",
          right: "5%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating band rings */}
      <RingDeco
        size={110}
        rx={50}
        ry={18}
        x="-2%"
        y="8%"
        delay={0}
        opacity={0.1}
      />
      <RingDeco
        size={70}
        rx={31}
        ry={11}
        x="48%"
        y="5%"
        delay={1.4}
        opacity={0.07}
      />
      <RingDeco
        size={90}
        rx={40}
        ry={14}
        x="92%"
        y="55%"
        delay={2.1}
        opacity={0.09}
      />
      <RingDeco
        size={55}
        rx={24}
        ry={8}
        x="35%"
        y="78%"
        delay={0.7}
        opacity={0.07}
      />
      <RingDeco
        size={75}
        rx={33}
        ry={12}
        x="78%"
        y="10%"
        delay={1.8}
        opacity={0.08}
      />

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 24px 88px",
          position: "relative",
          zIndex: 1,
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        {/*
          Layout:
          [Left: text + CTAs]  [Right: 2 brand images side by side]
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text block ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                width: "fit-content",
              }}
            >
              <motion.svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 0.7, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "center" }}
              >
                <ellipse
                  cx="9"
                  cy="5"
                  rx="8"
                  ry="3.5"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </motion.svg>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: FONT,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Trusted since 2001
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 4.5vw, 46px)",
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: FONT,
                  lineHeight: 1.15,
                }}
              >
                Ready to order
                <br />
                <span style={{ color: "rgba(255,255,255,0.75)" }}>
                  in bulk?
                </span>
              </h2>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.45 }}
              style={{
                margin: 0,
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                fontFamily: FONT,
                lineHeight: 1.75,
                maxWidth: 420,
              }}
            >
              Get a custom quote within 24 hours. No minimum fuss — orders from
              500g welcome. Pan-India delivery, ISO quality, and a team that
              actually picks up the phone.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
            >
              {/* Primary */}
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  color: "#AA1E15",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: FONT,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(0,0,0,0.15)";
                }}
              >
                Get a Free Quote
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  borderRadius: 8,
                  backgroundColor: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: FONT,
                  transition:
                    "background 0.18s, border-color 0.18s, transform 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* WhatsApp icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L.057 23.428a.75.75 0 00.914.914l5.588-1.453A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.69 9.69 0 01-4.942-1.352l-.354-.21-3.664.952.972-3.546-.23-.368A9.693 9.693 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                WhatsApp Us
              </Link>
            </motion.div>

            {/* Quick trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {[
                "📦 MOQ from 500g",
                "🚚 2–5 day delivery",
                "✅ ISO certified",
                "📞 24hr response",
              ].map((pill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: FONT,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Two brand images ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                fontFamily: FONT,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Our Brands
            </motion.p>

            {/* Two image cards side by side */}
            <div className="grid grid-cols-2 gap-4">
              <BrandCard
                index={0}
                inView={inView}
               imageSrc="/assets/Images/logo/vagad_logo.png"
                imageAlt="Vagad Logo"
              />
              <BrandCard
                index={1}
                inView={inView}
                imageSrc="/assets//Images/logo/vijay_logo.png"
                imageAlt="Vagad Logo"
              />
            </div>

            {/* Usage hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.4 }}
              style={{
                margin: 0,
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                fontFamily: FONT,
                lineHeight: 1.6,
              }}
            >
              {/* Remove this hint once images are added */}
              <code
                style={{
                  fontSize: 10,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: "1px 5px",
                  borderRadius: 4,
                }}
              >
                  💡 Vijay and Vagad {" "}
                from RubberBanndsIndia
              </code>
              
              
         
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom red-to-transparent fade so it flows into footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.12))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
