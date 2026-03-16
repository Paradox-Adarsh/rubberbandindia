"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const FONT = "Arial, Helvetica, sans-serif";

/* ─── Brand card ─────────────────────────────────────────────────────── */
function BrandCard({
  href,
  name,
  tagline,
  description,
  accent,
  bgFrom,
  bgTo,
  delay,
  logo,
  stats,
}: {
  href: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  bgFrom: string;
  bgTo: string;
  delay: number;
  logo: React.ReactNode;
  stats: { num: string; label: string }[];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <motion.div
          whileHover={{ y: -6, boxShadow: `0 20px 50px ${accent}25` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border cursor-pointer group h-full"
          style={{ borderColor: `${accent}22`, backgroundColor: "#fff" }}
        >
          {/* Gradient top half */}
          <div
            className="relative px-6 sm:px-8 pt-8 pb-10"
            style={{
              background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
            }}
          >
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Floating ring decoration */}
            <motion.div
              animate={{ rotate: [0, 4, -4, 0], y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-6 opacity-15 pointer-events-none"
            >
              <svg width="70" height="35" viewBox="0 0 70 35">
                <ellipse cx="35" cy="17" rx="32" ry="14"
                  stroke="white" strokeWidth="4" fill="none" />
                <ellipse cx="35" cy="17" rx="32" ry="14"
                  stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.5" />
              </svg>
            </motion.div>

            {/* Logo */}
            <div className="relative z-10 mb-4">
              {logo}
            </div>

            <h2 className="relative z-10 text-2xl sm:text-3xl font-black text-white leading-tight mb-2"
              style={{ fontFamily: FONT }}>
              {name}
            </h2>
            <p className="relative z-10 text-sm font-semibold tracking-wide text-white/70"
              style={{ fontFamily: FONT }}>
              {tagline}
            </p>

            {/* Stats */}
            <div className="relative z-10 mt-5 flex gap-5">
              {stats.map(({ num, label }) => (
                <div key={num}>
                  <p className="text-lg font-black text-white" style={{ fontFamily: FONT }}>{num}</p>
                  <p className="text-[10px] text-white/50" style={{ fontFamily: FONT }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* White bottom half */}
          <div className="px-6 sm:px-8 py-6">
            <p className="text-sm text-[#6B6560] leading-relaxed mb-5"
              style={{ fontFamily: FONT }}>
              {description}
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  text-sm font-bold text-white"
                style={{ backgroundColor: accent, fontFamily: FONT }}
                whileHover={{ backgroundColor: accent, opacity: 0.88 }}
              >
                View Products
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>

              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#C4BFB8] group-hover:text-[#9B9590] transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ─── Main products page ─────────────────────────────────────────────── */
export default function ProductsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <main
      className="min-h-screen py-12 sm:py-20 px-4"
      style={{ backgroundColor: "#F5F0E8", fontFamily: FONT }}
    >
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-0.5 rounded-full bg-[#AA1E15]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#AA1E15]"
              style={{ fontFamily: FONT }}>
              Our Brands
            </span>
            <span className="w-5 h-0.5 rounded-full bg-[#AA1E15]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight mb-4"
            style={{ fontFamily: FONT }}>
            Our Product Range
          </h1>
          <p className="text-sm sm:text-base text-[#6B6560] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: FONT }}>
            Ghanshyam Enterprises distributes two trusted rubber band brands across India.
            Choose your brand below to explore the full product range.
          </p>
        </motion.div>

        {/*
          ┌──────────────────────────────────────────────────────────┐
          │  GRID EXPLANATION                                        │
          │                                                          │
          │  grid              → enable CSS grid                    │
          │  grid-cols-1       → 1 column on mobile                 │
          │  md:grid-cols-2    → 2 columns on md (768px+)           │
          │  gap-6 sm:gap-8    → space between cards                │
          │                                                          │
          │  Each BrandCard fills one column.                        │
          │  On mobile they stack, on md they sit side by side.     │
          └──────────────────────────────────────────────────────────┘
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* Vijay brand card */}
          <BrandCard
            href="/products/vijay"
            name="Vijay Rubber Bands"
            tagline="Classic · Trusted · Since 2001"
            description="Single colour, centre line double colour, fluorescent disco nylon bands — available in sizes ½″ to 4″. India's most trusted rubber band brand for stationery and industrial use."
            accent="#AA1E15"
            bgFrom="#1A1A1A"
            bgTo="#AA1E15"
            delay={0.1}
            stats={[
              { num: "6+", label: "Product types" },
              { num: "6", label: "Size variants" },
            ]}
            logo={
              <div className="flex items-center gap-3">
                {/* Vijay SVG logo mark */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15">
                  <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
                    <ellipse cx="24" cy="24" rx="20" ry="12"
                      stroke="white" strokeWidth="4" fill="none" />
                    <ellipse cx="24" cy="24" rx="20" ry="12"
                      stroke="white" strokeWidth="2" fill="none"
                      strokeDasharray="4 3" opacity="0.5" />
                    <ellipse cx="24" cy="24" rx="11" ry="6"
                      stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
                  </svg>
                </div>
                <span className="text-white/60 text-xs tracking-widest font-bold uppercase"
                  style={{ fontFamily: FONT }}>
                  VIJAY
                </span>
              </div>
            }
          />

          {/* Vagad brand card */}
          <BrandCard
            href="/products/vagad"
            name="Vagad Rubber Bands"
            tagline="Premium · Vibrant · Consistent"
            description="Premium quality rubber bands with superior elasticity and stretch. Available in standard, fluorescent and heavy-duty variants in sizes ½″ to 4″. Ideal for bulk industrial and retail use."
            accent="#E8008A"
            bgFrom="#0D1F5C"
            bgTo="#E8008A"
            delay={0.2}
            stats={[
              { num: "6+", label: "Product types" },
              { num: "6", label: "Size variants" },
            ]}
            logo={
              <div className="flex items-center gap-3">
                {/* Vagad V-shield logo mark */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15">
                  <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
                    <path d="M 12 6 L 12 26 L 24 38 L 36 26 L 36 6 L 28 6 L 28 22 L 24 30 L 20 22 L 20 6 Z"
                      fill="white" opacity="0.3" />
                    <ellipse cx="24" cy="17" rx="14" ry="9"
                      stroke="white" strokeWidth="2.5" fill="none" />
                    <text x="24" y="21" textAnchor="middle" fontSize="7"
                      fontWeight="900" fill="white" fontFamily="Arial" letterSpacing="0.5">
                      VAGAD
                    </text>
                  </svg>
                </div>
                <span className="text-white/60 text-xs tracking-widest font-bold uppercase"
                  style={{ fontFamily: FONT }}>
                  VAGAD
                </span>
              </div>
            }
          />
        </div>

        {/* ── Compare strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-white rounded-2xl border border-[#E8E4E0] overflow-hidden"
        >
          <div className="h-1"
            style={{ background: "linear-gradient(90deg, #AA1E15, #E8008A)" }} />
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <h3 className="text-lg font-black text-[#1A1A1A] mb-1"
              style={{ fontFamily: FONT }}>
              Not sure which brand?
            </h3>
            <p className="text-sm text-[#6B6560] mb-5" style={{ fontFamily: FONT }}>
              Both brands are repacked by Ghanshyam Enterprises with the same
              quality standards. Contact us and we'll help you pick the right one.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  text-sm font-bold text-white no-underline"
                style={{ backgroundColor: "#AA1E15", fontFamily: FONT }}>
                Ask Us
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="tel:9820674274"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm
                  font-bold border border-[#D4CFC8] text-[#1A1A1A] no-underline"
                style={{ fontFamily: FONT }}>
                Call 9820674274
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}