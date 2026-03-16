"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeUpVariant, fadeIn, fadeVerticalIn, scaleIn, springHover } from "@/lib/motions";

const FONT = "Arial, Helvetica, sans-serif";

/* ─── Product data ───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Single Colour Bands",
    size: '1" – 4"',
    weight: "100g / 500g / 1kg",
    colors: ["#CC2200", "#E8A000", "#2E7D32"],
    tag: "Bestseller",
    desc: "Premium single colour rubber bands for everyday bundling and stationery use.",
  },
  {
    id: 2,
    name: "Centre Line Double Colour",
    size: '1" – 3"',
    weight: "100g / 500g",
    colors: ["#CC2200", "#F5C518"],
    tag: "Popular",
    desc: "Dual-tone bands with a distinctive centre line stripe for easy identification.",
  },
  {
    id: 3,
    name: "Fluorescent Bands",
    size: '½" – 2"',
    weight: "100g / 500g",
    colors: ["#FF3D00", "#AEEA00", "#FF6D00"],
    tag: "Vibrant",
    desc: "High-visibility fluorescent rubber bands ideal for retail and packaging.",
  },
  {
    id: 4,
    name: "Nylon Disco Bands",
    size: '1" – 4"',
    weight: "500g / 1kg",
    colors: ["#9C27B0", "#2196F3", "#E91E63"],
    tag: "Premium",
    desc: "Durable nylon bands with a glossy disco finish. High stretch, long life.",
  },
  {
    id: 5,
    name: "Mini Bands",
    size: '½"',
    weight: "50g / 100g",
    colors: ["#CC2200", "#E8A000"],
    tag: "Small Size",
    desc: "Compact ½ inch bands perfect for currency, postal and fine bundling work.",
  },
  {
    id: 6,
    name: "Industrial Heavy Duty",
    size: '3" – 4"',
    weight: "1kg / 5kg",
    colors: ["#1A1A1A", "#CC2200"],
    tag: "Industrial",
    desc: "Extra-thick heavy-duty bands built for industrial packaging and warehousing.",
  },
];

const SIZES = ['½"', '1"', '1½"', '2"', '3"', '4"'];

/* ─── SVG product illustration placeholder ──────────────────────────── */
function ProductSVG({ colors, name }: { colors: string[]; name: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background */}
      <rect width="240" height="200" fill="#F5F0E8" />

      {/* Scattered rubber band loops */}
      {[
        { cx: 80, cy: 110, rx: 52, ry: 18, rot: -18, color: colors[0] },
        { cx: 140, cy: 130, rx: 52, ry: 18, rot: 12, color: colors[1] ?? colors[0] },
        { cx: 110, cy: 150, rx: 52, ry: 18, rot: 35, color: colors[2] ?? colors[0] },
        { cx: 70, cy: 140, rx: 40, ry: 14, rot: -5, color: colors[1] ?? colors[0] },
        { cx: 160, cy: 115, rx: 40, ry: 14, rot: 20, color: colors[0] },
      ].map((b, i) => (
        <g key={i} transform={`rotate(${b.rot}, ${b.cx}, ${b.cy})`}>
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
            stroke={b.color} strokeWidth="7" fill="none" opacity="0.85" />
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
            stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none" />
        </g>
      ))}

      {/* Brand oval badge */}
      <ellipse cx="120" cy="72" rx="72" ry="42" fill="#CC2200" />
      <ellipse cx="120" cy="72" rx="66" ry="36" fill="white" />
      <ellipse cx="120" cy="72" rx="66" ry="36"
        stroke="#1A7A3C" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />

      {/* VIJAY text */}
      <text x="120" y="62" textAnchor="middle"
        fontSize="20" fontWeight="900" fill="#CC2200"
        fontFamily="Arial, Helvetica, sans-serif" letterSpacing="2">
        VIJAY
      </text>

      {/* RUBBER BANDS text */}
      <rect x="68" y="68" width="104" height="22" rx="4" fill="#1A1A1A" />
      <text x="120" y="83" textAnchor="middle"
        fontSize="10" fontWeight="800" fill="white"
        fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">
        RUBBER BANDS
      </text>

      {/* Subtle dot pattern top */}
      {Array.from({ length: 6 }).map((_, i) =>
        Array.from({ length: 4 }).map((_, j) => (
          <circle key={`${i}-${j}`}
            cx={20 + i * 35} cy={12 + j * 8}
            r="1.2" fill="#CC2200" opacity="0.15" />
        ))
      )}
    </svg>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: index * 0.08 } },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-xl overflow-hidden border border-[#E8E4E0]
        flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(170,30,21,0.12)]"
      style={{ fontFamily: FONT }}
    >
      {/* Tag badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "#AA1E15", color: "#fff" }}>
          {product.tag}
        </span>
      </div>

      {/* Image area */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F5F0E8]">
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          {/* Replace this ProductSVG with your <Image> component */}
          <ProductSVG colors={product.colors} name={product.name} />
        </motion.div>

        {/* Color dots */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {product.colors.map((c, i) => (
            <span key={i} className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] leading-tight">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B6560] mt-1.5 leading-relaxed flex-1">
          {product.desc}
        </p>

        {/* Size + weight chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: "rgba(170,30,21,0.07)", color: "#AA1E15" }}>
            Size: {product.size}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: "rgba(26,26,26,0.06)", color: "#4A4540" }}>
            {product.weight}
          </span>
        </div>

        {/* CTA */}
        <motion.a
          href="/contact"
          {...springHover}
          className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg
            text-sm font-bold tracking-wide text-white transition-colors duration-200"
          style={{ backgroundColor: "#AA1E15" }}
          whileHover={{ backgroundColor: "#C4261C" } as object}
        >
          Get a Quote
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ─── Size reference bar ─────────────────────────────────────────────── */
function SizeBar() {
  return (
    <div className="bg-white border border-[#E8E4E0] rounded-xl px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3 sm:gap-6">
      <span className="text-xs font-bold tracking-widest text-[#AA1E15] uppercase">
        Available Sizes
      </span>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((s) => (
          <span key={s}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D4CFC8] text-[#4A4540]
              hover:border-[#AA1E15] hover:text-[#AA1E15] hover:bg-[rgba(170,30,21,0.05)] transition-colors duration-200 cursor-default">
            {s}
          </span>
        ))}
      </div>
      <span className="text-xs text-[#9B9590] ml-auto hidden sm:block">
        Custom sizes available on bulk orders
      </span>
    </div>
  );
}

/* ─── Hero banner ────────────────────────────────────────────────────── */
function HeroBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl px-6 sm:px-10 lg:px-16 py-10 sm:py-14"
      style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #2A0A08 60%, #AA1E15 100%)",
        fontFamily: FONT,
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating band rings */}
      {[
        { size: 120, top: "-20%", right: "5%", delay: 0 },
        { size: 80, top: "50%", right: "18%", delay: 1 },
        { size: 60, bottom: "-10%", left: "40%", delay: 1.8 },
      ].map((r, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          className="absolute pointer-events-none opacity-20"
          style={{ width: r.size, height: r.size / 2, top: r.top, right: r.right, bottom: (r as any).bottom, left: (r as any).left }}
        >
          <svg viewBox={`0 0 ${r.size} ${r.size / 2}`}>
            <ellipse cx={r.size / 2} cy={r.size / 4} rx={r.size / 2 - 8} ry={r.size / 4 - 4}
              stroke="white" strokeWidth="6" fill="none" />
            <ellipse cx={r.size / 2} cy={r.size / 4} rx={r.size / 2 - 8} ry={r.size / 4 - 4}
              stroke="white" strokeWidth="2" fill="none" strokeDasharray="5 4" opacity="0.5" />
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-2xl">
        {/* Brand pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#AA1E15]" />
          <span className="text-[11px] tracking-widest text-white/70 uppercase font-semibold">
            Vijay Rubber Bands
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white"
        >
          All Types of
          <br />
          <span style={{ color: "#AA1E15" }}>Rubber Bands</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-4 text-sm sm:text-base text-white/60 max-w-lg leading-relaxed"
        >
          Single colour · Centre line double colour · Nylon · Fluorescent disco —
          available in sizes ½" to 4". Repacked by Ghanshyam Enterprises, Masjid Bunder.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-6 flex flex-wrap gap-6"
        >
          {[
            { num: "6+", label: "Product types" },
            { num: "6", label: "Size variants" },
            { num: "1M+", label: "Pieces/month" },
          ].map(({ num, label }) => (
            <div key={num}>
              <p className="text-xl sm:text-2xl font-black text-white">{num}</p>
              <p className="text-[11px] text-white/45 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function VijayProductsPage() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#F5F0E8", fontFamily: FONT }}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-[#9B9590]">
          <Link href="/" className="hover:text-[#AA1E15] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#AA1E15] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#AA1E15] font-semibold">Vijay Rubber Bands</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Hero */}
        <HeroBanner />

        {/* Size reference */}
        <SizeBar />

        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#AA1E15] font-bold uppercase mb-1">
              — Our Range
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight">
              Vijay Band Collection
            </h2>
          </div>
          <p className="text-sm text-[#9B9590]">
            {PRODUCTS.length} products · Bulk pricing available
          </p>
        </div>

        {/*
          ┌─────────────────────────────────────────────────────┐
          │  TAILWIND GRID USED HERE                            │
          │                                                     │
          │  grid           → enable grid layout               │
          │  grid-cols-1    → 1 column on mobile (xs)          │
          │  sm:grid-cols-2 → 2 columns at 640px+              │
          │  lg:grid-cols-3 → 3 columns at 1024px+             │
          │  gap-4          → 16px gap on mobile               │
          │  sm:gap-5       → 20px gap on sm+                  │
          │  lg:gap-6       → 24px gap on lg+                  │
          └─────────────────────────────────────────────────────┘
        */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* Bulk CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="rounded-xl border border-[#E8E4E0] bg-white px-6 sm:px-10 py-6 sm:py-8
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]">
              Need bulk quantities?
            </h3>
            <p className="text-sm text-[#6B6560] mt-1 max-w-md">
              We supply 100g to 5kg packs. Custom sizes, colours and packaging available for
              wholesale and institutional buyers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <motion.a
              href="/contact"
              {...springHover}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold
                text-white whitespace-nowrap"
              style={{ backgroundColor: "#AA1E15" }}
              whileHover={{ backgroundColor: "#C4261C" } as object}
            >
              Contact for Pricing
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="tel:9820674274"
              {...springHover}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold
                border border-[#D4CFC8] text-[#1A1A1A] whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Us
            </motion.a>
          </div>
        </motion.div>

        {/* Brand switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pb-4">
          <span className="text-xs text-[#9B9590] tracking-wide">Also browse:</span>
          <Link
            href="/products/vagad"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4CFC8]
              text-sm font-semibold text-[#1A1A1A] hover:border-[#AA1E15] hover:text-[#AA1E15]
              hover:bg-[rgba(170,30,21,0.04)] transition-all duration-200"
          >
            Vagad Rubber Bands →
          </Link>
        </div>

      </div>
    </main>
  );
}