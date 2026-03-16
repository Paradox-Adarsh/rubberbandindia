"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FONT = "Arial, Helvetica, sans-serif";

/* ─────────────────────────────────────────────────────────────────────
   IMAGES ARRAY — replace src values with your actual imports
   
   How to add your images:
   1. Import them at the top:
      import vijayPack from "@/public/assets/images/vijay-pack.jpg";
   2. Set src: vijayPack in the object below
   3. Set wide: true for images you want to span 2 columns
   4. Set tall: true for images you want to be taller
   
   Categories available: "All" | "Vijay" | "Vagad" | "Coloured" | "Bulk" | "Fluorescent"
───────────────────────────────────────────────────────────────────── */
interface GalleryImage {
  id: number;
  src: string | StaticImageData;
  name: string;
  desc: string;
  category: "Vijay" | "Vagad" | "Coloured" | "Bulk" | "Fluorescent" | "Industrial";
  tag: string;
  tagColor?: string;
  wide?: boolean;
  tall?: boolean;
}

const IMAGES: GalleryImage[] = [
  // ── Replace src with your actual image imports ──
  { id: 1,  src: "/assets/images/gallery/vijay_multicoloured.png", name: "Vijay Mixed Colour Pack", desc: "Single, double colour and nylon bands — 1kg assorted pack", category: "Vijay", tag: "Bestseller", wide: true },
  { id: 2,  src: "/assets/images/gallery/vagad_premium.png", name: "Vagad Premium Bands", desc: "Premium quality Vagad bands in vibrant colours", category: "Vagad", tag: "Premium", tagColor: "#E8008A" },
  { id: 3,  src: "/assets/images/gallery/vijaydisco.png", name: "Fluorescent Disco Nylon", desc: "High-visibility neon bands for retail and packaging", category: "Fluorescent", tag: "Vibrant", tagColor: "#FF6D00" },
  { id: 4,  src: "/assets/images/gallery/vijaypattiflat.png", name: "Vijay patti flat band", desc: "Standard 1kg bulk pack — ideal for wholesalers", category: "Bulk", tag: "Bulk", wide: false },
  { id: 5,  src: "/assets/images/gallery/vijaysc.jpg", name: "Vagad SC Assorted", desc: "Multi-colour assorted rubber bands by Vagad", category: "Coloured", tag: "Coloured", tagColor: "#E8008A" },
  { id: 6,  src: "/assets/images/gallery/vijay_central.png", name: "Vijay Centre Line Double", desc: "Classic centre-line double colour signature band", category: "Vijay", tag: "Classic", wide: true },
  { id: 7,  src: "/assets/images/gallery/vagad4k.jpg", name: "Industrial Heavy Duty 4\"", desc: "Extra-thick bands for warehousing and industrial use", category: "Industrial", tag: "Industrial", tagColor: "#1A3A8F", tall: true },
  { id: 8,  src: "/assets/images/gallery/vagadmini.png", name: "Vagad mini ½\" Bands ", desc: "Fine-grade mini bands for currency and postal use", category: "Vagad", tag: "Mini Size", tagColor: "#E8008A" },
  { id: 9,  src: "/assets/images/gallery/vijay_sc.jpg", name: "Vijay Mini 1½\" Bands", desc: "Fine-grade mini bands for currency and postal use", category: "Vijay", tag: "Mini Size" },
  { id: 10, src: "/assets/images/gallery/green.png", name: "Fluorescent Green Bands", desc: "Bright lime-green fluorescent nylon rubber bands", category: "Fluorescent", tag: "Neon", tagColor: "#2E7D32" },
  { id: 11, src: "/assets/images/gallery/Vijay5kg.png", name: "Vijay 5kg Wholesale Pack", desc: "5kg bulk wholesale packing for distributors", category: "Bulk", tag: "Wholesale", wide: true },
  { id: 12, src: "/assets/images/gallery/vagad3k.jpg", name: "Vagad 3\"Industrial Heavy", desc: "Heavy-duty Vagad bands for industrial applications", category: "Industrial", tag: "Industrial", tagColor: "#1A3A8F" },
  { id: 13, src: "/assets/images/gallery/assorted.jpg", name: "Coloured Assorted 100g", desc: "100g assorted coloured bands — retail ready", category: "Coloured", tag: "Retail" },
  { id: 14, src: "/assets/images/gallery/vagad_red.png", name: "Vagad Red Colour Bands", desc: "Classic red single-colour Vagad rubber bands", category: "Vagad", tag: "Single Colour" ,tagColor: "#E8008A"},
  { id: 15, src: "/assets/images/gallery/vijay4k.png", name: "Vagad 4\" Bulk", desc: "Largest bulk pack — best price per kg", category: "Bulk", tag: "Best Value", tagColor: "#E8008A", wide: true },
  { id: 16, src: "/assets/images/gallery/vijay_nylon.png", name: "Fluorescent Nylon", desc: "Hot neon nylon bands — standout packaging", category: "Fluorescent", tag: "Neon", tagColor: "#E8008A" },
  { id: 17, src: "/assets/images/gallery/vijay_disco_black.png", name: "Vijay Disco Black Bands", desc: "Bright yellow standard bands by Vijay", category: "Vijay", tag: "Single Colour" },
  { id: 18, src: "/assets/images/gallery/vagad_assorted.jpg", name: "Vagad Assorted Coloured", desc: "Full-range assorted colour pack by Vagad", category: "Coloured", tag: "Assorted", tagColor: "#E8008A" },
];

const FILTERS = ["All", "Vijay", "Vagad", "Coloured", "Bulk", "Fluorescent", "Industrial"] as const;
type Filter = typeof FILTERS[number];

/* ─── Placeholder SVG shown until real image loads ───────────────────── */
function PlaceholderImg({ name, tag, tagColor }: { name: string; tag: string; tagColor?: string }) {
  const color = tagColor ?? "#AA1E15";
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ backgroundColor: "#F5F0E8" }}>
      <svg width="48" height="28" viewBox="0 0 80 40" fill="none">
        <ellipse cx="40" cy="20" rx="36" ry="14" stroke={color} strokeWidth="5" fill="none" />
        <ellipse cx="40" cy="20" rx="36" ry="14" stroke={color} strokeWidth="2" fill="none"
          strokeDasharray="5 4" opacity="0.45" />
        <ellipse cx="40" cy="20" rx="20" ry="7" stroke={color} strokeWidth="2.5" fill="none" opacity="0.35" />
      </svg>
      <span className="text-[10px] font-bold tracking-wide text-center px-2 leading-snug"
        style={{ color: "#9B9590", fontFamily: FONT, maxWidth: 120 }}>
        {name}
      </span>
    </div>
  );
}

/* ─── Individual gallery card ────────────────────────────────────────── */
function GalleryCard({
  image, index, onClick,
}: { image: GalleryImage; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [imgError, setImgError] = useState(false);
  const tagColor = image.tagColor ?? "#AA1E15";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: "easeOut" }}
      onClick={onClick}
      className={`
        group relative bg-white rounded-xl overflow-hidden border border-[#E8E4E0]
        cursor-pointer flex flex-col
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300
        ${image.wide ? "sm:col-span-2" : ""}
      `}
    >
      {/* Image area */}
      <div className={`relative w-full overflow-hidden bg-[#F5F0E8]
        ${image.tall ? "aspect-[3/4]" : image.wide ? "aspect-[16/7]" : "aspect-[4/3]"}`}>

        {imgError || image.src === "/placeholder.jpg" ? (
          <PlaceholderImg name={image.name} tag={image.tag} tagColor={tagColor} />
        ) : (
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image
              src={image.src}
              alt={image.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </motion.div>
        )}

        {/* Tag badge */}
        <div className="absolute top-3 left-3 z-10">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: (index % 6) * 0.07 + 0.2 }}
            className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: tagColor, fontFamily: FONT }}
          >
            {image.tag}
          </motion.span>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2"
          style={{ backgroundColor: "rgba(26,26,26,0.72)" }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-11 h-11 rounded-full border-2 border-white/60
              flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </motion.div>
          <span className="text-white/80 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: FONT }}>
            View Full Size
          </span>
        </motion.div>
      </div>

      {/* Card info */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-black text-[#1A1A1A] truncate" style={{ fontFamily: FONT }}>
            {image.name}
          </p>
          <p className="text-xs text-[#9B9590] truncate mt-0.5" style={{ fontFamily: FONT }}>
            {image.desc}
          </p>
        </div>
        <div className="flex-shrink-0 w-7 h-7 rounded-full border border-[#E8E4E0]
          flex items-center justify-center text-[#C4BFB8] group-hover:border-[#AA1E15]
          group-hover:text-[#AA1E15] transition-colors duration-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────── */
function Lightbox({
  image, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const tagColor = image.tagColor ?? "#AA1E15";
  const [imgError, setImgError] = useState(false);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(10,10,10,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl
          w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] bg-[#F5F0E8] overflow-hidden flex-shrink-0">
          {imgError || image.src === "/placeholder.jpg" ? (
            <PlaceholderImg name={image.name} tag={image.tag} tagColor={tagColor} />
          ) : (
            <Image
              src={image.src}
              alt={image.name}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
            />
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full
              bg-black/50 border border-white/20 flex items-center justify-center
              text-white hover:bg-black/70 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10
                rounded-full bg-black/50 border border-white/20 flex items-center
                justify-center text-white hover:bg-black/70 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10
                rounded-full bg-black/50 border border-white/20 flex items-center
                justify-center text-white hover:bg-black/70 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Info */}
        <div className="px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: tagColor, fontFamily: FONT }}>
              {image.tag}
            </span>
            <h3 className="text-lg font-black text-[#1A1A1A] mt-2" style={{ fontFamily: FONT }}>
              {image.name}
            </h3>
            <p className="text-sm text-[#6B6560] mt-1" style={{ fontFamily: FONT }}>
              {image.desc}
            </p>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5
              rounded-lg text-xs font-bold text-white whitespace-nowrap"
            style={{ backgroundColor: "#AA1E15", fontFamily: FONT }}
          >
            Get a Quote
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Stats bar ──────────────────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
    >
      {[
        { num: "2", label: "Trusted Brands" },
        { num: "18+", label: "Product Variants" },
        { num: "6", label: "Size Options" },
        { num: "1M+", label: "Pieces Per Month" },
      ].map(({ num, label }, i) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="flex flex-col items-center justify-center py-4 px-3
            bg-white rounded-xl border border-[#E8E4E0] text-center"
        >
          <span className="text-2xl sm:text-3xl font-black text-[#AA1E15]"
            style={{ fontFamily: FONT }}>
            {num}
          </span>
          <span className="text-xs text-[#9B9590] mt-1" style={{ fontFamily: FONT }}>
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Hero banner ────────────────────────────────────────────────────── */
function HeroBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl px-6 sm:px-10 lg:px-14 py-10 sm:py-14"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2A0A08 55%, #AA1E15 100%)" }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Floating rings */}
      {[
        { s: 110, t: "-15%", r: "4%",  d: 0   },
        { s: 70,  t: "50%",  r: "18%", d: 1.2 },
        { s: 50,  b: "-8%",  l: "44%", d: 1.8 },
      ].map((r, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: r.d }}
          className="absolute pointer-events-none opacity-15"
          style={{ width: r.s, top: r.t, right: (r as any).r, bottom: (r as any).b, left: (r as any).l }}
        >
          <svg viewBox={`0 0 ${r.s} ${r.s / 2}`}>
            <ellipse cx={r.s / 2} cy={r.s / 4} rx={r.s / 2 - 8} ry={r.s / 4 - 5}
              stroke="white" strokeWidth="5" fill="none" />
            <ellipse cx={r.s / 2} cy={r.s / 4} rx={r.s / 2 - 8} ry={r.s / 4 - 5}
              stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.4" />
          </svg>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#AA1E15]" />
          <span className="text-[11px] tracking-widest text-white/70 uppercase font-bold"
            style={{ fontFamily: FONT }}>
            Ghanshyam Enterprises
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
          style={{ fontFamily: FONT }}
        >
          Our Product
          <br />
          <span style={{ color: "#f87171" }}>Gallery</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="text-sm sm:text-base text-white/55 leading-relaxed"
          style={{ fontFamily: FONT }}
        >
          Browse our complete range of Vijay and Vagad rubber bands —
          single colour, double colour, fluorescent, nylon disco, heavy duty
          and bulk packs available in sizes ½" to 4".
        </motion.p>
      </div>
    </div>
  );
}

/* ─── Main Gallery Page ──────────────────────────────────────────────── */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Filtered images
  const filtered = activeFilter === "All"
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Lightbox nav
  const lightboxIndex = lightboxId !== null
    ? filtered.findIndex((img) => img.id === lightboxId)
    : -1;
  const lightboxImage = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const openLightbox = (id: number) => {
    setLightboxId(id);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = useCallback(() => {
    setLightboxId(null);
    document.body.style.overflow = "";
  }, []);
  const prevImage = useCallback(() => {
    if (lightboxIndex > 0) setLightboxId(filtered[lightboxIndex - 1].id);
  }, [lightboxIndex, filtered]);
  const nextImage = useCallback(() => {
    if (lightboxIndex < filtered.length - 1) setLightboxId(filtered[lightboxIndex + 1].id);
  }, [lightboxIndex, filtered]);

  // Reset visible count when filter changes
  const handleFilter = (f: Filter) => {
    setActiveFilter(f);
    setVisibleCount(12);
  };

  return (
    <main
      className="min-h-screen py-8 sm:py-14 px-4"
      style={{ backgroundColor: "#F5F0E8", fontFamily: FONT }}
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Hero */}
        <HeroBanner />

        {/* Stats */}
        <StatsBar />

        {/* Section heading + filter tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-0.5 rounded-full bg-[#AA1E15]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#AA1E15]"
                  style={{ fontFamily: FONT }}>
                  Browse All
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]"
                style={{ fontFamily: FONT }}>
                Product Gallery
              </h2>
            </div>
            <p className="text-sm text-[#9B9590]" style={{ fontFamily: FONT }}>
              Showing {visible.length} of {filtered.length} photos
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => handleFilter(f)}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold
                  border transition-colors duration-200"
                style={{
                  fontFamily: FONT,
                  backgroundColor: activeFilter === f ? "#AA1E15" : "transparent",
                  borderColor: activeFilter === f ? "#AA1E15" : "#D4CFC8",
                  color: activeFilter === f ? "#fff" : "#4A4540",
                }}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    ({IMAGES.filter(i => i.category === f).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Gallery grid
            ┌────────────────────────────────────────────────────────┐
            │ grid-cols-1          → 1 col on mobile                │
            │ sm:grid-cols-2       → 2 cols on 640px+               │
            │ lg:grid-cols-3       → 3 cols on 1024px+              │
            │ [wide cards use sm:col-span-2 to span 2 columns]      │
            └────────────────────────────────────────────────────────┘ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {visible.length > 0 ? (
              visible.map((image, i) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={i}
                  onClick={() => openLightbox(image.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-[#9B9590]"
                style={{ fontFamily: FONT }}>
                No images in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center pt-2">
            <motion.button
              onClick={() => setVisibleCount((c) => c + 6)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                text-sm font-bold border-2 border-[#AA1E15] text-[#AA1E15]
                hover:bg-[rgba(170,30,21,0.05)] transition-colors duration-200"
              style={{ fontFamily: FONT }}
            >
              Load More Photos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.button>
          </div>
        )}

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-[#E8E4E0] bg-white
            px-6 sm:px-10 py-6 sm:py-8
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]"
              style={{ fontFamily: FONT }}>
              Interested in any product?
            </h3>
            <p className="text-sm text-[#6B6560] mt-1 max-w-md"
              style={{ fontFamily: FONT }}>
              Contact us for bulk pricing, custom packing or wholesale enquiries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
                text-sm font-bold text-white"
              style={{ backgroundColor: "#AA1E15", fontFamily: FONT }}
            >
              Get a Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="tel:9820674274"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm
                font-bold border border-[#D4CFC8] text-[#1A1A1A]"
              style={{ fontFamily: FONT }}
            >
              Call Us
            </motion.a>
          </div>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            hasPrev={lightboxIndex > 0}
            hasNext={lightboxIndex < filtered.length - 1}
          />
        )}
      </AnimatePresence>
    </main>
  );
}