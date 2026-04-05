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
        style={{ height: stretched ? 44 : 14 }}
        animate={{ height: stretched ? 44 : 14 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <motion.ellipse
          cx="600"
          cy={stretched ? 38 : 12}
          rx="580"
          ry="5"
          fill="rgba(170,30,21,0.12)"
          animate={{ cy: stretched ? 38 : 12, ry: stretched ? 8 : 4 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
        <motion.path
          d={
            stretched
              ? "M 10 4 Q 300 38 600 42 Q 900 38 1190 4 L 1190 16 Q 900 50 600 54 Q 300 50 10 16 Z"
              : "M 10 4 Q 600 10 1190 4 L 1190 16 Q 600 22 10 16 Z"
          }
          fill="#AA1E15"
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />
        <motion.path
          d={
            stretched
              ? "M 10 4 Q 300 34 600 38 Q 900 34 1190 4 L 1190 9 Q 900 38 600 42 Q 300 38 10 9 Z"
              : "M 10 4 Q 600 8 1190 4 L 1190 9 Q 600 13 10 9 Z"
          }
          fill="#C4261C"
          opacity="0.55"
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />
        <motion.text
          x="600"
          y={stretched ? 28 : 11}
          textAnchor="middle"
          fontSize="6"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="3.5"
          fill="#F5F0E8"
          opacity="0.9"
          animate={{ y: stretched ? 28 : 11 }}
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
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] tracking-widest whitespace-nowrap pointer-events-none"
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
      {...springHover}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <motion.span
        whileHover={{ rotate: [0, -12, 12, 0] }}
        transition={{ duration: 0.35 }}
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(170,30,21,0.08)",
          border: "1px solid rgba(170,30,21,0.2)",
          color: "#AA1E15",
        }}
      >
        {icon}
      </motion.span>
      <span
        className="text-sm transition-colors duration-200 group-hover:underline underline-offset-4 break-all"
        style={{ color: "#4A4540", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {label}
      </span>
      {href && (
        <ArrowUpRight
          size={12}
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
    <div className="flex items-center gap-2 mb-3">
      <Minus size={11} style={{ color: "#AA1E15" }} />
      <h3
        className="text-[10px] tracking-[0.28em] font-bold uppercase"
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
        backgroundColor: "#FAF7F2",
       fontFamily: "Poppins, Arial, Helvetica, sans-serif",
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

      {/* Red glow — bottom left — reduced size */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(170,30,21,0.05) 0%, transparent 70%)",
          bottom: "-10%",
          left: "-5%",
          filter: "blur(30px)",
        }}
      />

      {/* Band rings */}
      <div className="absolute top-3 right-8 hidden sm:block">
        <BandRing size={72} delay={0} />
      </div>
      <div className="absolute bottom-8 left-[55%] hidden sm:block">
        <BandRing size={44} delay={1.4} />
      </div>

      {/* Elastic band divider */}
      <div className="relative z-10">
        <ElasticBand />
      </div>

      {/* ── Main content ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

          {/* ── Brand Column ── */}
          <motion.div variants={fadeUpVariant} className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
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
              className="text-xl sm:text-2xl font-black tracking-tight leading-tight"
              style={{ color: "#1A1A1A", fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Durable rubber bands
              <br />
              <span style={{ color: "#AA1E15" }}>built for every job.</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              className="mt-2 text-sm leading-relaxed max-w-sm"
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
              className="mt-4 flex items-center gap-6"
            >
              {[
                { num: "1M+", label: "Pieces supplied monthly" },
                { num: "500+", label: "Enterprise customers" },
              ].map(({ num, label }) => (
                <div key={num}>
                  <p className="text-lg font-black" style={{ color: "#1A1A1A" }}>{num}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9B9590" }}>{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Band size bars */}
            <motion.div
              {...(fadeIn as object)}
              animate={inView ? "animate" : "initial"}
              transition={{ delay: 0.55 }}
              className="mt-4 flex gap-1.5 items-end"
              aria-hidden
            >
              {["#E8DDD0", "#D4C4B0", "#C09878", "#AA1E15", "#1A1A1A"].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                  style={{
                    width: 6 + i * 3,
                    height: 10 + i * 3,
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
                className="mt-1 w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(170,30,21,0.1)",
                  border: "1.5px solid rgba(170,30,21,0.3)",
                  color: "#AA1E15",
                }}
              >
                <MapPin size={13} />
              </span>
              <address
                className="not-italic text-sm leading-6"
                style={{ color: "#2A2520", fontFamily: "Arial, Helvetica, sans-serif" }}
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
              className="mt-4"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="40" height="20" viewBox="0 0 52 26" aria-hidden>
                <ellipse cx="26" cy="13" rx="24" ry="10" stroke="#AA1E15" strokeWidth="4" fill="none" opacity="0.22" />
                <ellipse cx="26" cy="13" rx="24" ry="10" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeDasharray="4 6" opacity="0.12" />
              </svg>
            </motion.div>
          </motion.div>

          {/* ── Contact Column ── */}
          <motion.div variants={fadeUpVariant} className="md:col-span-4">
            <SectionHeading>Contact</SectionHeading>

            <div className="space-y-2.5">
              <ContactLink icon={<Phone size={13} />} label="9820674274" delay={0.1} />
              <ContactLink icon={<Phone size={13} />} label="7021238502" delay={0.14} />
              <ContactLink
                icon={<Mail size={13} />}
                label="vijayvagadrubber@gmail.com"
                href="mailto:vijayvagadrubber@gmail.com"
                delay={0.18}
              />
              <ContactLink
                icon={<Globe size={13} />}
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
              className="mt-5 flex flex-wrap items-center gap-2.5"
            >
              <motion.a
                href="/products"
                {...springHover}
                className="px-4 py-2 text-xs font-bold tracking-wide rounded text-white"
                style={{ backgroundColor: "#AA1E15", fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                View Products
              </motion.a>
              <motion.a
                href="/contact"
                {...springHover}
                className="px-4 py-2 text-xs font-bold tracking-wide rounded border"
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

        {/* ── Divider line ── */}
        <hr
          style={{
            marginTop: 24,
            marginBottom: 0,
            border: "none",
            borderTop: "1.5px solid #8A7E78",
            opacity: 1,
          }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          {...(fadeUp as object)}
          animate={inView ? "animate" : "initial"}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left"
        >
          <p
            className="text-xs tracking-wide"
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
                className="text-xs tracking-wide"
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