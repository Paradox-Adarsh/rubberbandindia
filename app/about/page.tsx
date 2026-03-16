"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AboutIntroSection from "@/sections/AboutIntroSection";

const FONT = "Arial, Helvetica, sans-serif";

/* ─── Reusable animated section wrapper ─────────────────────────────── */
function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ──────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-6 h-0.5 bg-[#AA1E15] rounded-full" />
      <span
        className="text-[10px] font-bold tracking-[0.3em] uppercase"
        style={{ color: "#AA1E15", fontFamily: FONT }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── Stat counter card ──────────────────────────────────────────────── */
function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(170,30,21,0.1)" }}
      className="flex flex-col items-center justify-center p-5 rounded-xl bg-white
        border border-[#E8E4E0] transition-shadow duration-300 text-center"
    >
      <span className="text-3xl sm:text-4xl font-black text-[#AA1E15]"
        style={{ fontFamily: FONT }}>
        {num}
      </span>
      <span className="text-xs sm:text-sm text-[#6B6560] mt-1.5 leading-snug"
        style={{ fontFamily: FONT }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Why choose us card ─────────────────────────────────────────────── */
function WhyCard({
  icon, title, desc, delay,
}: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(170,30,21,0.09)" }}
      className="p-5 sm:p-6 bg-white rounded-xl border border-[#E8E4E0]
        transition-shadow duration-300 flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(170,30,21,0.08)" }}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-[#1A1A1A] text-sm sm:text-base"
          style={{ fontFamily: FONT }}>
          {title}
        </h3>
        <p className="text-[#6B6560] text-xs sm:text-sm mt-1 leading-relaxed"
          style={{ fontFamily: FONT }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Quality list item ──────────────────────────────────────────────── */
function QualityItem({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex items-start gap-3"
    >
      <span className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ backgroundColor: "rgba(170,30,21,0.1)", color: "#AA1E15" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="text-sm sm:text-base text-[#4A4540] leading-relaxed"
        style={{ fontFamily: FONT }}>
        {text}
      </span>
    </motion.li>
  );
}

/* ─── Main About Page ────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative" style={{ fontFamily: FONT }}>

      {/* Existing intro section — untouched */}
      <AboutIntroSection />

      <div
        className="min-h-screen py-12 sm:py-20 px-4"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">

          {/* ── Page Header ── */}
          <RevealSection>
            <div className="text-center">
              <SectionLabel text="Who We Are" />
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A]
                  leading-tight mb-4"
                style={{ fontFamily: FONT }}
              >
                About <span style={{ color: "#AA1E15" }}>Ghanshyam</span> Enterprises
              </h1>
              <p
                className="text-sm sm:text-base text-[#6B6560] max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: FONT }}
              >
                Trusted rubber band manufacturers since 2001 — committed to consistent
                quality, reliable distribution, and strong customer relationships across India.
              </p>
            </div>
          </RevealSection>

          {/* ── Stats row ── */}
          <RevealSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <StatCard num="20+" label="Years of Experience" delay={0} />
              <StatCard num="500+" label="Enterprise Customers" delay={0.08} />
              <StatCard num="1M+" label="Pieces Per Month" delay={0.16} />
              <StatCard num="ISO" label="Quality Aligned" delay={0.24} />
            </div>
          </RevealSection>

          {/* ── Our Story ── */}
          <RevealSection delay={0.05}>
            <div
              className="rounded-2xl overflow-hidden border border-[#E8E4E0]"
              style={{ backgroundColor: "#fff" }}
            >
              {/* Red top accent */}
              <div className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #AA1E15, #C4261C 50%, #AA1E15)" }} />

              <div className="p-6 sm:p-10">
                <SectionLabel text="Our Story" />
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-5 leading-tight"
                  style={{ fontFamily: FONT }}
                >
                  Two decades of binding India together.
                </h2>

                {/* Story text with animated left border */}
                <div className="flex gap-5">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-1 rounded-full flex-shrink-0 origin-top"
                    style={{ backgroundColor: "#AA1E15", opacity: 0.25 }}
                  />
                  <div className="space-y-4">
                    <p
                      className="text-sm sm:text-base text-[#4A4540] leading-relaxed"
                      style={{ fontFamily: FONT }}
                    >
                      Ghanshyam Enterprises has been serving businesses for over two decades,
                      delivering high-quality rubber bands for stationery, packaging,
                      industrial, and commercial use.
                    </p>
                    <p
                      className="text-sm sm:text-base text-[#4A4540] leading-relaxed"
                      style={{ fontFamily: FONT }}
                    >
                      What started as a small retail setup in Mumbai has grown into a
                      full-scale manufacturing and distribution network. Today, our rubber
                      bands are trusted by distributors, wholesalers, offices, retailers, and
                      industries across India because of our consistency, durability, and
                      customer-first approach.
                    </p>
                  </div>
                </div>

                {/* Timeline chips */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { year: "2001", event: "Founded in Mumbai" },
                    { year: "2008", event: "Pan-India distribution" },
                    { year: "2015", event: "500+ business clients" },
                    { year: "2024", event: "1M+ pieces/month" },
                  ].map(({ year, event }, i) => (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.35 }}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E8E4E0]"
                    >
                      <span className="text-xs font-black text-[#AA1E15]">{year}</span>
                      <span className="text-xs text-[#6B6560]">{event}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* ── Manufacturing & Quality ── */}
          <RevealSection delay={0.05}>
            <div className="rounded-2xl border border-[#E8E4E0] bg-white overflow-hidden">
              <div className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #AA1E15, #C4261C 50%, #AA1E15)" }} />

              <div className="p-6 sm:p-10">
                <SectionLabel text="Quality Standards" />
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-5 leading-tight"
                  style={{ fontFamily: FONT }}
                >
                  Manufacturing &amp; Quality Standards
                </h2>

                <p
                  className="text-sm sm:text-base text-[#4A4540] leading-relaxed mb-6"
                  style={{ fontFamily: FONT }}
                >
                  Every rubber band we produce goes through strict quality checks to ensure
                  elasticity, uniform size, and long-lasting durability. We use premium natural
                  rubber and industry-grade processes to ensure your packaging and usage needs
                  are met without compromise.
                </p>
                <p
                  className="text-sm sm:text-base text-[#4A4540] leading-relaxed mb-6"
                  style={{ fontFamily: FONT }}
                >
                  Our manufacturing process focuses on:
                </p>

                <ul className="space-y-3">
                  {[
                    "Premium natural rubber sourcing",
                    "Uniform size and elasticity testing",
                    "Bulk production capacity for high-volume customers",
                    "Clean and hygienic packaging standards",
                    "ISO-aligned quality inspection",
                  ].map((item, i) => (
                    <QualityItem key={item} text={item} delay={i * 0.08} />
                  ))}
                </ul>
              </div>
            </div>
          </RevealSection>

          {/* ── Mission ── */}
          <RevealSection delay={0.05}>
            <div
              className="relative rounded-2xl overflow-hidden px-6 sm:px-10 py-8 sm:py-12"
              style={{
                background: "linear-gradient(135deg, #1A1A1A 0%, #2A0A08 60%, #AA1E15 100%)",
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Floating band ring decoration */}
              <motion.div
                animate={{ rotate: [0, 3, -3, 0], y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-8 opacity-15 pointer-events-none hidden sm:block"
              >
                <svg width="100" height="50" viewBox="0 0 100 50">
                  <ellipse cx="50" cy="25" rx="46" ry="20"
                    stroke="white" strokeWidth="5" fill="none" />
                  <ellipse cx="50" cy="25" rx="46" ry="20"
                    stroke="white" strokeWidth="2" fill="none" strokeDasharray="5 4" opacity="0.5" />
                </svg>
              </motion.div>

              <div className="relative z-10 max-w-2xl">
                <SectionLabel text="Our Mission" />
                <h2
                  className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight"
                  style={{ fontFamily: FONT }}
                >
                  Our Mission
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)", fontFamily: FONT }}
                >
                  Our mission is simple — to deliver reliable, consistent rubber bands that
                  meet the needs of every business, from local retailers to national
                  enterprises. We aim to stay ahead through better production, faster
                  delivery, and honest relationships.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* ── Why Choose Us ── */}
          <RevealSection delay={0.05}>
            <div className="rounded-2xl border border-[#E8E4E0] bg-white overflow-hidden">
              <div className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #AA1E15, #C4261C 50%, #AA1E15)" }} />

              <div className="p-6 sm:p-10">
                <SectionLabel text="Why Us" />
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-6 sm:mb-8 leading-tight"
                  style={{ fontFamily: FONT }}
                >
                  Why Choose Us?
                </h2>

                {/* 2-col grid on sm+, 1-col on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <WhyCard
                    delay={0}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    }
                    title="20+ Years Experience"
                    desc="Providing consistent supply and quality since 2001."
                  />
                  <WhyCard
                    delay={0.08}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    }
                    title="Trusted Nationwide"
                    desc="Wholesalers and businesses across India rely on us."
                  />
                  <WhyCard
                    delay={0.16}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    }
                    title="Quality You Can Rely On"
                    desc="Durable, uniform, and elasticity-tested rubber bands."
                  />
                  <WhyCard
                    delay={0.24}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <path d="M16 8h4l3 4v3h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    }
                    title="Bulk Order Ready"
                    desc="High-capacity manufacturing and fast delivery."
                  />
                </div>
              </div>
            </div>
          </RevealSection>

          {/* ── CTA strip ── */}
          <RevealSection delay={0.05}>
            <div
              className="rounded-2xl border border-[#E8E4E0] bg-white px-6 sm:px-10 py-6 sm:py-8
                flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            >
              <div>
                <h3
                  className="text-lg sm:text-xl font-black text-[#1A1A1A]"
                  style={{ fontFamily: FONT }}
                >
                  Ready to place a bulk order?
                </h3>
                <p className="text-sm text-[#6B6560] mt-1" style={{ fontFamily: FONT }}>
                  Talk to us directly — we offer custom pricing for wholesale buyers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm
                    font-bold text-white whitespace-nowrap"
                  style={{ backgroundColor: "#AA1E15", fontFamily: FONT }}
                >
                  Contact Us
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm
                    font-bold border border-[#D4CFC8] text-[#1A1A1A] whitespace-nowrap"
                  style={{ fontFamily: FONT }}
                >
                  View Products
                </motion.a>
              </div>
            </div>
          </RevealSection>

        </div>
      </div>
    </div>
  );
}