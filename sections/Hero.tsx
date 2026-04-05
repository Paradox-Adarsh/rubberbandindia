"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage from '../public/assets/Images/heroRubber3.png';
import {
  fadeUpVariant, fadeVerticalIn, fadeIn,
  fadeUp, fadeDown, floatVariant, scaleIn, springHover,
} from "@/lib/motions";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FONT = "'Poppins', Arial, Helvetica, sans-serif";

/* ─── Animated counter hook ─────────────────────────────────────────── */
function useCounter(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let start = 0;
    const step = Math.max(1, Math.floor(end / 80));
    const interval = Math.floor(duration / (end / step));
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
}

/* ─── Floating rubber band ring ─────────────────────────────────────── */
function FloatingRing({
  size, x, y, delay, rx, ry, opacity = 0.12, color = "#AA1E15",
}: {
  size: number; x: string; y: string; delay: number;
  rx: number; ry: number; opacity?: number; color?: string;
}) {
  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 0 }}
      animate={{ y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size * 0.5} viewBox={`0 0 ${size} ${size * 0.5}`} style={{ opacity }}>
        <ellipse cx={size / 2} cy={size / 4} rx={rx} ry={ry}
          stroke={color} strokeWidth="5" fill="none" />
        <ellipse cx={size / 2} cy={size / 4} rx={rx} ry={ry}
          stroke={color} strokeWidth="2" fill="none" strokeDasharray="5 4" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating dot cluster ───────────────────────────────────────────── */
function DotCluster({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 0 }}
      animate={{ y: [0, -8, 0], opacity: [0.18, 0.28, 0.18] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 16}
              cy={8 + row * 16}
              r="2.5"
              fill="#AA1E15"
              opacity={0.5 - row * 0.1}
            />
          ))
        )}
      </svg>
    </motion.div>
  );
}

/* ─── Animated band stretch line ─────────────────────────────────────── */
function BandLine({ delay }: { delay: number }) {
  return (
    <motion.div
      style={{ position: "absolute", left: 0, right: 0, pointerEvents: "none", zIndex: 0 }}
      animate={{ opacity: [0, 0.06, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width="100%" height="6" viewBox="0 0 1200 6" preserveAspectRatio="none">
        <path d="M 0 3 Q 300 0 600 3 Q 900 6 1200 3" stroke="#AA1E15" strokeWidth="3" fill="none" />
      </svg>
    </motion.div>
  );
}

/* ─── Stat card ──────────────────────────────────────────────────────── */
function StatCard({
  value, label, delay,
}: { value: string | number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -2, boxShadow: "0 4px 18px rgba(170,30,21,0.1)" }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "10px 16px",
        backgroundColor: "#fff",
        border: "1px solid #E8E4E0",
        borderRadius: 8,
        minWidth: 100,
        cursor: "default",
        transition: "box-shadow 0.2s",
        fontFamily: FONT,
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 900, color: "#1A1A1A", lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontSize: 11, color: "#9B9590", lineHeight: 1.4 }}>{label}</span>
    </motion.div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const enterpriseCount = useCounter(500, 1200);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <header
      ref={headerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#FAF7F2",
        fontFamily: FONT,
      }}
    >
      {/* ── Ambient background texture ── */}
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(170,30,21,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Warm red glow — bottom right behind image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(170,30,21,0.07) 0%, transparent 70%)",
          bottom: "-15%",
          right: "5%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Light cream glow — top left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating decorative band rings ── */}
      <FloatingRing size={120} rx={54} ry={20} x="-3%" y="10%" delay={0} opacity={0.09} />
      <FloatingRing size={80} rx={36} ry={13} x="48%" y="5%" delay={1.2} opacity={0.07} color="#1A1A1A" />
      <FloatingRing size={100} rx={45} ry={16} x="88%" y="60%" delay={2} opacity={0.08} />
      <FloatingRing size={60} rx={26} ry={9} x="38%" y="75%" delay={0.8} opacity={0.07} color="#C4261C" />

      {/* Dot clusters */}
      <DotCluster x="44%" y="8%" delay={0.3} />
      <DotCluster x="2%" y="65%" delay={1.5} />
      <DotCluster x="92%" y="15%" delay={2.2} />

      {/* Subtle animated horizontal band lines */}
      <div style={{ position: "absolute", top: "28%", left: 0, right: 0 }}>
        <BandLine delay={0} />
      </div>
      <div style={{ position: "absolute", top: "68%", left: 0, right: 0 }}>
        <BandLine delay={2.5} />
      </div>

      {/* ── Main content ── */}
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* ── Left Section ── */}
          <div className="space-y-6 py-12 md:py-16">

            {/* Badge */}
            <motion.div {...fadeDown}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "relative",
                   zIndex: 2,
                    marginBottom: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  border: "1px solid #E8E4E0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    padding: "3px 10px",
                    backgroundColor: "rgba(170,30,21,0.08)",
                    color: "#AA1E15",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    border: "1px solid rgba(170,30,21,0.15)",
                    fontFamily: FONT,
                  }}
                >
                  Trusted since 2001
                </motion.span>
                <span style={{ color: "#C4BFB8", fontSize: 13 }}>•</span>
                <span style={{ fontSize: 13, color: "#6B6560", fontFamily: FONT }}>
                  Ghanshyam Enterprises &amp; Retail
                </span>
              </motion.div>
            </motion.div>

            {/* Headline — staggered word reveal */}
            <div>
              <motion.h1
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
                style={{ color: "var(--color-logo-blue)", fontFamily: FONT }}
              >
                {["Durable", "rubber", "bands", "built", "for"].map((word) => (
                  <motion.span
                    key={word}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                    }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}{" "}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                  style={{
                    color: "var(--color-fore)",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  every job
                  {/* Animated underline squiggle */}
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                    viewBox="0 0 160 8"
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: 0,
                      width: "100%",
                      height: 8,
                      overflow: "visible",
                    }}
                  >
                    <motion.path
                      d="M 0 4 Q 40 1 80 4 Q 120 7 160 4"
                      stroke="#AA1E15"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.span>
              </motion.h1>
            </div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-gray-600 max-w-xl"
              style={{ fontSize: 15, lineHeight: 1.7, fontFamily: FONT }}
            >
              We manufacture premium rubber bands for stationery, packaging and
              industrial use. Bulk pricing, fast delivery and reliable quality
              checks — trusted by thousands of businesses.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeVerticalIn}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <motion.div {...springHover}>
                <Link
                  href="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "12px 24px",
                    borderRadius: 6,
                    backgroundColor: "#AA1E15",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    fontFamily: FONT,
                    boxShadow: "0 4px 14px rgba(170,30,21,0.28)",
                    transition: "background 0.18s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4261C")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#AA1E15")}
                >
                  View Products
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div {...springHover}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                    borderRadius: 6,
                    border: "1.5px solid #D4CFC8",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                    fontFamily: FONT,
                    backgroundColor: "transparent",
                    transition: "background 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.borderColor = "#AA1E15";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#D4CFC8";
                  }}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Stats — now as lifted cards ── */}
            <div className="mt-4 flex flex-wrap gap-3">
              <StatCard value="1M+" label="Pieces supplied monthly" delay={0.55} />
              <StatCard value={`${enterpriseCount}+`} label="Enterprise customers" delay={0.65} />
              <StatCard value="ISO" label="Quality assurance" delay={0.75} />
            </div>

            {/* Subtle "trusted by" marquee strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingTop: 4,
              }}
            >
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: i < 3 ? "#AA1E15" : "#D4CFC8",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 11, color: "#9B9590", fontFamily: FONT }}>
                500+ businesses trust us pan-India
              </span>
            </motion.div>
          </div>

          {/* ── Right Section: Hero Image ── */}
          <div style={{ position: "relative" }}>
            {/* Glow ring behind image */}
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "10%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(170,30,21,0.08) 0%, transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Orbiting band ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "5%",
                borderRadius: "50%",
                border: "1.5px dashed rgba(170,30,21,0.12)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "15%",
                borderRadius: "50%",
                border: "1px dashed rgba(170,30,21,0.08)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Floating corner badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ position: "absolute", top: "12%", right: "2%", zIndex: 2 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8E4E0",
                  borderRadius: 10,
                  padding: "8px 14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 18 }}>🏭</span>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#1A1A1A" }}>Pan-India</p>
                  <p style={{ margin: 0, fontSize: 10, color: "#9B9590" }}>Fast Delivery</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{ position: "absolute", bottom: "18%", left: "0%", zIndex: 2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{
                  backgroundColor: "#AA1E15",
                  borderRadius: 10,
                  padding: "8px 14px",
                  boxShadow: "0 4px 16px rgba(170,30,21,0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: 16 }}>✅</span>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#fff" }}>ISO Certified</p>
                  <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.75)" }}>Quality Assured</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Main image */}
            <motion.div
              {...floatVariant}
              animate="animate"
              style={{ position: "relative", zIndex: 1 }}
              className="flex justify-center md:justify-end"
            >
              <Image
                src={heroImage}
                width={800}
                height={800}
                alt="Vagad Rubbers - product & logo"
                className="w-full max-w-[700px] md:max-w-[900px] object-contain"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </header>
  );
}