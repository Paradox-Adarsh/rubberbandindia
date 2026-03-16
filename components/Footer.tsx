"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Globe, ArrowUpRight, Minus } from "lucide-react";
import {
  fadeUp,
  fadeVerticalIn,
  fadeIn,
  scaleIn,
  springHover,
  fadeUpVariant,
  floatVariant,
} from "@/lib/motions";

/* ─── Elastic Band SVG Divider ───────────────────────────────────────── */
function ElasticBand() {
  const [stretched, setStretched] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      onMouseEnter={() => setStretched(true)}
      onMouseLeave={() => setStretched(false)}
    >
      <motion.svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full overflow-visible"
        style={{ height: stretched ? 52 : 18 }}
        animate={{ height: stretched ? 52 : 18 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <motion.ellipse
          cx="600"
          cy={stretched ? 46 : 16}
          rx="580"
          ry="5"
          fill="rgba(170,30,21,0.12)"
          animate={{ cy: stretched ? 46 : 16, ry: stretched ? 9 : 4 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
        <motion.path
          d={
            stretched
              ? "M 10 5 Q 300 44 600 48 Q 900 44 1190 5 L 1190 19 Q 900 58 600 62 Q 300 58 10 19 Z"
              : "M 10 5 Q 600 11 1190 5 L 1190 19 Q 600 25 10 19 Z"
          }
          fill="#AA1E15"
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />
        <motion.path
          d={
            stretched
              ? "M 10 5 Q 300 40 600 44 Q 900 40 1190 5 L 1190 10 Q 900 44 600 48 Q 300 44 10 10 Z"
              : "M 10 5 Q 600 9 1190 5 L 1190 10 Q 600 14 10 10 Z"
          }
          fill="#C4261C"
          opacity="0.55"
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />
        <motion.text
          x="600"
          y={stretched ? 34 : 14}
          textAnchor="middle"
          fontSize="6.5"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="3.5"
          fill="#F5F0E8"
          opacity="0.9"
          animate={{ y: stretched ? 34 : 14 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        >
          GHANSHYAM ENTERPRISES · QUALITY RUBBER BANDS · SINCE 2001
        </motion.text>
      </motion.svg>

      <AnimatePresence>
        {stretched && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] tracking-widest whitespace-nowrap pointer-events-none"
            style={{ color: "#AA1E15", fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            ↑ SNAP ↑
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Floating Band Ring ─────────────────────────────────────────────── */
function BandRing({ size = 80, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <motion.div
      variants={floatVariant}
      animate="animate"
      style={{ animationDelay: `${delay}s` }}
      className="absolute pointer-events-none"
    >
      <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.07 }}>
        <ellipse cx="40" cy="40" rx="36" ry="14" stroke="#AA1E15" strokeWidth="8" fill="none" />
        <ellipse cx="40" cy="40" rx="36" ry="14" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeDasharray="5 5" />
      </svg>
    </motion.div>
  );
}

/* ─── Contact Link ───────────────────────────────────────────────────── */
function ContactLink({
  icon, label, href, delay = 0,
}: { icon: React.ReactNode; label: string; href?: string; delay?: number }) {
  const Tag = href ? motion.a : motion.div;
  return (
    <Tag
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      {...(fadeVerticalIn as object)}
      // transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...springHover}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <motion.span
        whileHover={{ rotate: [0, -12, 12, 0] }}
        transition={{ duration: 0.35 }}
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(170,30,21,0.08)",
          border: "1px solid rgba(170,30,21,0.2)",
          color: "#AA1E15",
        }}
      >
        {icon}
      </motion.span>
      <span
        className="text-sm sm:text-base transition-colors duration-200 group-hover:underline underline-offset-4 break-all"
        style={{ color: "#4A4540", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {label}
      </span>
      {href && (
        <ArrowUpRight
          size={13}
          className="flex-shrink-0 opacity-0 group-hover:opacity-70 transition-all duration-200 -ml-1 group-hover:ml-0"
          style={{ color: "#AA1E15" }}
        />
      )}
    </Tag>
  );
}

/* ─── Section Heading ────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Minus size={12} style={{ color: "#AA1E15" }} />
      <h3
        className="text-xs tracking-[0.28em] font-bold uppercase"
        style={{ color: "#AA1E15", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {children}
      </h3>
    </div>
  );
}

/* ─── Main Footer ────────────────────────────────────────────────────── */
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#EDE8DF",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #AA1E15 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Red glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(170,30,21,0.06) 0%, transparent 70%)",
          bottom: "-20%",
          left: "-8%",
          filter: "blur(40px)",
        }}
      />

      {/* Band rings — hidden on small screens to avoid clutter */}
      <div className="absolute top-4 right-8 hidden sm:block">
        <BandRing size={90} delay={0} />
      </div>
      <div className="absolute bottom-10 left-[55%] hidden sm:block">
        <BandRing size={55} delay={1.4} />
      </div>

      {/* Elastic band divider */}
      <div className="relative z-10">
        <ElasticBand />
      </div>

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8"
      >
        {/* 
          Mobile  : 1 col, stacked
          md      : 12-col grid — brand 5, address 3, contact 4
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">

          {/* ── Brand Column ── */}
          <motion.div variants={fadeUpVariant} className="md:col-span-5">
            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span
                className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded"
                style={{
                  backgroundColor: "rgba(170,30,21,0.1)",
                  color: "#AA1E15",
                  border: "1px solid rgba(170,30,21,0.2)",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                Trusted since 2001
              </span>
              <span className="text-sm" style={{ color: "#9B9590" }}>
                · Ghanshyam Enterprises &amp; Retail
              </span>
            </div>

            <motion.h2
              {...(scaleIn as object)}
              animate={inView ? "animate" : "initial"}
              className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
              style={{ color: "#1A1A1A", fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Durable rubber bands
              <br />
              <span style={{ color: "#AA1E15" }}>built for every job.</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              className="mt-3 text-sm sm:text-base leading-relaxed max-w-sm"
              style={{ color: "#4A4540" }}
            >
              Premium rubber bands for stationery, packaging, and industrial
              use. Bulk pricing, fast delivery, and reliable quality — trusted
              by thousands of businesses across India.
            </motion.p>

            {/* Stats */}
            <motion.div
              {...(fadeIn as object)}
              animate={inView ? "animate" : "initial"}
              transition={{ delay: 0.4 }}
              className="mt-5 flex items-center gap-6 sm:gap-8"
            >
              {[
                { num: "1M+", label: "Pieces supplied monthly" },
                { num: "500+", label: "Enterprise customers" },
              ].map(({ num, label }) => (
                <div key={num}>
                  <p className="text-xl font-black" style={{ color: "#1A1A1A" }}>{num}</p>
                  <p className="text-xs sm:text-sm mt-0.5" style={{ color: "#9B9590" }}>{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Band size bars */}
            <motion.div
              {...(fadeIn as object)}
              animate={inView ? "animate" : "initial"}
              transition={{ delay: 0.55 }}
              className="mt-5 flex gap-1.5 items-end"
              aria-hidden
            >
              {["#E8DDD0", "#D4C4B0", "#C09878", "#AA1E15", "#1A1A1A"].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                  style={{
                    width: 7 + i * 3,
                    height: 12 + i * 4,
                    backgroundColor: color,
                    borderRadius: 3,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
              <span className="ml-2 text-[9px] tracking-widest self-center" style={{ color: "#9B9590" }}>
                SIZES AVAILABLE
              </span>
            </motion.div>
          </motion.div>

          {/* ── Address Column ── */}
          <motion.div variants={fadeUpVariant} className="md:col-span-3">
            <SectionHeading>Office Address</SectionHeading>

            <motion.div
              {...(fadeVerticalIn as object)}
              animate={inView ? "animate" : "initial"}
              className="flex items-start gap-3"
            >
              <span
                className="mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(170,30,21,0.1)",
                  border: "1.5px solid rgba(170,30,21,0.3)",
                  color: "#AA1E15",
                }}
              >
                <MapPin size={15} />
              </span>
              <address
                className="not-italic text-sm sm:text-base leading-7"
                style={{
                  color: "#2A2520",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                18/20, Kazi Sayeed Street,<br />
                1st Floor, Room No. 3B,<br />
                Opp. Silver Moon Hotel,<br />
                <span style={{ color: "#AA1E15", fontWeight: 700 }}>
                  Masjid Bunder – 400009.
                </span>
              </address>
            </motion.div>

            {/* Rotating band loop */}
            <motion.div
              className="mt-5"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="48" height="24" viewBox="0 0 52 26" aria-hidden>
                <ellipse cx="26" cy="13" rx="24" ry="10" stroke="#AA1E15" strokeWidth="4" fill="none" opacity="0.22" />
                <ellipse cx="26" cy="13" rx="24" ry="10" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeDasharray="4 6" opacity="0.12" />
              </svg>
            </motion.div>
          </motion.div>

          {/* ── Contact Column ── */}
          <motion.div variants={fadeUpVariant} className="md:col-span-4">
            <SectionHeading>Contact</SectionHeading>

            <div className="space-y-3.5">
              <ContactLink icon={<Phone size={14} />} label="9820674274" delay={0.1} />
              <ContactLink icon={<Phone size={14} />} label="7021238502" delay={0.14} />
              <ContactLink
                icon={<Mail size={14} />}
                label="vijayvagadrubber@gmail.com"
                href="mailto:vijayvagadrubber@gmail.com"
                delay={0.18}
              />
              <ContactLink
                icon={<Globe size={14} />}
                label="www.rubberbandindia.com"
                href="https://rubberbandindia.com"
                delay={0.22}
              />
            </div>

            {/* CTA buttons */}
            <motion.div
              {...(fadeIn as object)}
              animate={inView ? "animate" : "initial"}
              transition={{ delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="/products"
                {...springHover}
                className="px-4 sm:px-5 py-2.5 text-sm font-bold tracking-wide rounded text-white"
                style={{ backgroundColor: "#AA1E15", fontFamily: "Arial, Helvetica, sans-serif" }}
                // whileHover={{ backgroundColor: "#C4261C" } as object}
              >
                View Products
              </motion.a>
              <motion.a
                href="/contact"
                {...springHover}
                className="px-4 sm:px-5 py-2.5 text-sm font-bold tracking-wide rounded border"
                style={{
                  borderColor: "#C4BFB8",
                  color: "#1A1A1A",
                  backgroundColor: "transparent",
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          {...(fadeUp as object)}
          animate={inView ? "animate" : "initial"}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          style={{ borderTop: "1px solid #D4CFC8" }}
        >
          <p
            className="text-xs sm:text-sm tracking-wide"
            style={{ color: "#7A7570", fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            © {new Date().getFullYear()} Ghanshyam Enterprises. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-y-1">
            {["Since 2001", "Quality Assured", "Pan-India Delivery"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="text-xs sm:text-sm tracking-wide"
                style={{ color: "#7A7570", fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {tag}
                {i < 2 && <span className="mx-2 sm:mx-3" style={{ color: "#C4BFB8" }}>·</span>}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}