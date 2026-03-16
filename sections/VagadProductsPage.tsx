"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { springHover } from "@/lib/motions";

const FONT = "Arial, Helvetica, sans-serif";

/* ─── Product data ───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Standard Elastic Bands",
    size: '1" – 4"',
    weight: "100g / 500g / 1kg",
    colors: ["#E8008A", "#1A3A8F", "#F472B6"],
    tag: "Bestseller",
    desc: "High-quality standard elastic bands suitable for office, retail and general use.",
  },
  {
    id: 2,
    name: "Premium Coloured Bands",
    size: '½" – 3"',
    weight: "100g / 500g",
    colors: ["#E8008A", "#EC4899", "#BE185D"],
    tag: "Premium",
    desc: "Vibrant multi-colour bands with superior stretch and snap-back performance.",
  },
  {
    id: 3,
    name: "Industrial Heavy Bands",
    size: '3" – 4"',
    weight: "1kg / 5kg",
    colors: ["#1A3A8F", "#2B4EAD", "#E8008A"],
    tag: "Industrial",
    desc: "Thick heavy-duty bands engineered for industrial packaging and warehousing.",
  },
  {
    id: 4,
    name: "Mini Precision Bands",
    size: '½"',
    weight: "50g / 100g",
    colors: ["#E8008A", "#1A3A8F"],
    tag: "Small Size",
    desc: "Fine-grade mini bands ideal for currency bundles, postal and stationery use.",
  },
  {
    id: 5,
    name: "Fluorescent Series",
    size: '1" – 2"',
    weight: "100g / 500g",
    colors: ["#FF0099", "#FF66CC", "#1A3A8F"],
    tag: "Vibrant",
    desc: "Bright neon fluorescent bands — high-visibility for retail display and sorting.",
  },
  {
    id: 6,
    name: "Bulk Assorted Pack",
    size: '½" – 4"',
    weight: "5kg / 10kg",
    colors: ["#E8008A", "#1A3A8F", "#EC4899"],
    tag: "Value Pack",
    desc: "Assorted mixed-size bulk pack. Best value for wholesalers and distributors.",
  },
];

const SIZES = ['½"', '1"', '1½"', '2"', '3"', '4"'];

/* ─── Vagad SVG product illustration ────────────────────────────────── */
function VagadProductSVG({ colors }: { colors: string[] }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">
      <rect width="240" height="200" fill="#FDF0F7" />

      {/* Scattered rubber band loops */}
      {[
        { cx: 75,  cy: 115, rx: 50, ry: 17, rot: -20, color: colors[0] },
        { cx: 145, cy: 132, rx: 50, ry: 17, rot: 14,  color: colors[1] ?? colors[0] },
        { cx: 108, cy: 152, rx: 50, ry: 17, rot: 38,  color: colors[2] ?? colors[0] },
        { cx: 68,  cy: 142, rx: 38, ry: 13, rot: -6,  color: colors[1] ?? colors[0] },
        { cx: 162, cy: 118, rx: 38, ry: 13, rot: 22,  color: colors[0] },
      ].map((b, i) => (
        <g key={i} transform={`rotate(${b.rot}, ${b.cx}, ${b.cy})`}>
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
            stroke={b.color} strokeWidth="7" fill="none" opacity="0.85" />
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
            stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" />
        </g>
      ))}

      {/* V-shield brand shape */}
      <path d="M 88 28 L 88 62 L 120 80 L 152 62 L 152 28 Z"
        fill="#E8008A" opacity="0.15" />
      <path d="M 92 30 L 92 60 L 120 76 L 148 60 L 148 30 Z"
        fill="#E8008A" opacity="0.25" />

      {/* VAGAD oval */}
      <ellipse cx="120" cy="58" rx="42" ry="24" fill="#1A3A8F" />
      <ellipse cx="120" cy="58" rx="38" ry="20"
        fill="url(#vagadGrad)" />
      <defs>
        <linearGradient id="vagadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2B4EAD" />
          <stop offset="100%" stopColor="#1A3A8F" />
        </linearGradient>
      </defs>
      <text x="120" y="63" textAnchor="middle" fontSize="14" fontWeight="900"
        fill="white" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">
        VAGAD
      </text>

      {/* Pink V-wings */}
      <path d="M 78 30 L 78 68 L 120 88 L 162 68 L 162 30 L 152 30 L 152 62 L 120 78 L 88 62 L 88 30 Z"
        fill="#E8008A" opacity="0.18" />

      {/* Dot pattern */}
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <circle key={`${i}-${j}`}
            cx={15 + i * 42} cy={10 + j * 8}
            r="1.2" fill="#E8008A" opacity="0.12" />
        ))
      )}
    </svg>
  );
}

/* ─── Product card ───────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1, y: 0,
          transition: { duration: 0.45, delay: index * 0.08 },
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-xl overflow-hidden border border-[#F0E0EC]
        flex flex-col transition-shadow duration-300
        hover:shadow-[0_8px_32px_rgba(232,0,138,0.12)]"
      style={{ fontFamily: FONT }}
    >
      {/* Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#E8008A" }}>
          {product.tag}
        </span>
      </div>

      {/* Image area */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FDF0F7]">
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          {/* Replace with <Image> when you have product photos */}
          <VagadProductSVG colors={product.colors} />
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

        {/* Chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: "rgba(232,0,138,0.07)", color: "#E8008A" }}>
            Size: {product.size}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: "rgba(26,58,143,0.07)", color: "#1A3A8F" }}>
            {product.weight}
          </span>
        </div>

        {/* CTA */}
        <motion.a
          href="/contact"
          {...springHover}
          className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg
            text-sm font-bold tracking-wide text-white transition-colors duration-200"
          style={{ backgroundColor: "#E8008A" }}
          // whileHover={{ backgroundColor: "#C4006E" } as object}
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

/* ─── Size bar ───────────────────────────────────────────────────────── */
function SizeBar() {
  return (
    <div className="bg-white border border-[#F0E0EC] rounded-xl
      px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3 sm:gap-6">
      <span className="text-xs font-bold tracking-widest uppercase"
        style={{ color: "#E8008A" }}>
        Available Sizes
      </span>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((s) => (
          <span key={s}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border
              transition-colors duration-200 cursor-default"
            style={{ borderColor: "#F0E0EC", color: "#4A4540" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8008A";
              e.currentTarget.style.color = "#E8008A";
              e.currentTarget.style.backgroundColor = "rgba(232,0,138,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#F0E0EC";
              e.currentTarget.style.color = "#4A4540";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <span className="text-xs text-[#9B9590] ml-auto hidden sm:block">
        Custom sizes on bulk orders
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
        background:
          "linear-gradient(135deg, #0D1F5C 0%, #1A3A8F 40%, #8B0057 80%, #E8008A 100%)",
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating V-shield shapes */}
      {[
        { size: 80, top: "-15%", right: "8%", delay: 0 },
        { size: 55, top: "55%", right: "20%", delay: 1.2 },
        { size: 40, bottom: "-8%", left: "42%", delay: 1.8 },
      ].map((r, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          className="absolute pointer-events-none opacity-15"
          style={{
            top: r.top, right: (r as any).right,
            bottom: (r as any).bottom, left: (r as any).left,
            width: r.size,
          }}
        >
          <svg viewBox="0 0 80 60" fill="none">
            <path d="M 10 0 L 10 34 L 40 54 L 70 34 L 70 0 L 58 0 L 58 28 L 40 42 L 22 28 L 22 0 Z"
              fill="white" opacity="0.4" />
            <ellipse cx="40" cy="18" rx="26" ry="16" stroke="white" strokeWidth="3" fill="none" />
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
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E8008A" }} />
          <span className="text-[11px] tracking-widest text-white/70 uppercase font-semibold"
            style={{ fontFamily: FONT }}>
            Vagad Rubber Bands
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white"
          style={{ fontFamily: FONT }}
        >
          Premium Quality
          <br />
          <span style={{ color: "#F472B6" }}>Rubber Bands</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-4 text-sm sm:text-base text-white/60 max-w-lg leading-relaxed"
          style={{ fontFamily: FONT }}
        >
          Vagad rubber bands — trusted for consistency, elasticity, and durability.
          Available in all sizes from ½" to 4", supplied by Ghanshyam Enterprises,
          Masjid Bunder.
        </motion.p>

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
              <p className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: FONT }}>{num}</p>
              <p className="text-[11px] text-white/45 mt-0.5"
                style={{ fontFamily: FONT }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────── */
export default function VagadProductsPage() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#FDF5FA", fontFamily: FONT }}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-[#9B9590]"
          style={{ fontFamily: FONT }}>
          <Link href="/" className="hover:text-[#E8008A] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#E8008A] transition-colors">Products</Link>
          <span>/</span>
          <span className="font-semibold" style={{ color: "#E8008A" }}>Vagad Rubber Bands</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        <HeroBanner />
        <SizeBar />

        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.3em] font-bold uppercase mb-1"
              style={{ color: "#E8008A", fontFamily: FONT }}>
              — Our Range
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight"
              style={{ fontFamily: FONT }}>
              Vagad Band Collection
            </h2>
          </div>
          <p className="text-sm text-[#9B9590]" style={{ fontFamily: FONT }}>
            {PRODUCTS.length} products · Bulk pricing available
          </p>
        </div>

        {/* Product grid — responsive Tailwind */}
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
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        {/* Bulk CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="rounded-xl border border-[#F0E0EC] bg-white
            px-6 sm:px-10 py-6 sm:py-8
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]"
              style={{ fontFamily: FONT }}>
              Need bulk quantities?
            </h3>
            <p className="text-sm text-[#6B6560] mt-1 max-w-md"
              style={{ fontFamily: FONT }}>
              We supply 100g to 10kg packs. Custom sizes, colours and private
              labelling available for wholesale buyers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <motion.a
              href="/contact"
              {...springHover}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
                text-sm font-bold text-white whitespace-nowrap"
              style={{ backgroundColor: "#E8008A", fontFamily: FONT }}
              // whileHover={{ backgroundColor: "#C4006E" } as object}
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm
                font-bold border whitespace-nowrap"
              style={{ borderColor: "#F0E0EC", color: "#1A1A1A", fontFamily: FONT }}
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
          <span className="text-xs text-[#9B9590] tracking-wide"
            style={{ fontFamily: FONT }}>
            Also browse:
          </span>
          <Link
            href="/products/vijay"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border
              text-sm font-semibold text-[#1A1A1A] transition-all duration-200"
            style={{ borderColor: "#E8E4E0", fontFamily: FONT }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8008A";
              e.currentTarget.style.color = "#E8008A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E8E4E0";
              e.currentTarget.style.color = "#1A1A1A";
            }}
          >
            Vijay Rubber Bands →
          </Link>
        </div>

      </div>
    </main>
  );
}