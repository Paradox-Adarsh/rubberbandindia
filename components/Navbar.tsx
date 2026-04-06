"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { springHover } from "@/lib/motions";
import Image from "next/image";

/* ─── Nav link data ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ─── Desktop Nav Link ───────────────────────────────────────────────── */
function DesktopLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href} className="no-underline">
      <motion.div
        {...springHover}
        className={`font-poppins relative px-1 py-1.5 cursor-pointer text-[15px] tracking-[0.01em] font-arial
          ${isActive ? "font-bold text-[#AA1E15]" : "font-medium text-[#1A1A1A]"}`}
      >
        {label}
        {/* Active underline */}
        <motion.span
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AA1E15] rounded-sm origin-left"
        />
        {/* Hover underline */}
        {!isActive && (
          <motion.span
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#AA1E15] rounded-sm origin-left opacity-40"
          />
        )}
      </motion.div>
    </Link>
  );
}

/* ─── Cart Button ────────────────────────────────────────────────────── */

/* ─── Hamburger ──────────────────────────────────────────────────────── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`w-[38px] h-[38px] rounded-lg border border-[#D4CFC8] flex flex-col
        items-center justify-center gap-[5px] cursor-pointer p-0 transition-colors duration-200
        ${open ? "bg-[rgba(170,30,21,0.07)]" : "bg-transparent"}`}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={
            open
              ? i === 0
                ? { rotate: 45, y: 10, width: 18 }
                : i === 2
                  ? { rotate: -45, y: -10, width: 18 }
                  : { opacity: 0, width: 0 }
              : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 12 : 18 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="block h-0.5 rounded-sm bg-[#1A1A1A] origin-center"
        />
      ))}
    </motion.button>
  );
}

/* ─── Mobile Drawer ──────────────────────────────────────────────────── */
function MobileDrawer({
  open,
  pathname,
  cartCount,
  onClose,
}: {
  open: boolean;
  pathname: string;
  cartCount: number;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(26,26,26,0.5)] z-40"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 34,
              restDelta: 0.01,
            }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#EDE8DF] z-50
              flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.1)] font-poppins"
            style={{
              willChange: "transform",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#D4CFC8]">
              <div className="flex items-center gap-2.5">
                <div>
                  <p className="text-[13px] font-extrabold text-[#1A1A1A] m-0 leading-tight">
                    GHANSHYAM
                  </p>
                  <p className="text-[10px] text-[#9B9590] m-0 tracking-[0.08em]">
                    ENTERPRISES
                  </p>
                </div>
              </div>
              <motion.button
                {...springHover}
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 rounded-full border border-[#D4CFC8] bg-transparent cursor-pointer
                  flex items-center justify-center text-[#4A4540]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* Links */}
            <nav className="flex-1 py-3 overflow-y-auto">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`font-poppins flex items-center justify-between px-6 py-3.5 text-[15px]
                        no-underline transition-colors duration-150
                        ${
                          isActive
                            ? "font-bold text-[#AA1E15] border-l-[3px] border-[#AA1E15] bg-[rgba(170,30,21,0.05)]"
                            : "font-medium text-[#1A1A1A] border-l-[3px] border-transparent"
                        }`}
                    >
                      {link.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isActive ? "#AA1E15" : "#C4BFB8"}
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-6 pt-4 pb-6 border-t border-[#D4CFC8] flex flex-col gap-2.5">
              <Link
                href="/quote"
                onClick={onClose}
                className="block text-center py-[11px] bg-[#AA1E15] text-white rounded-md
                  text-sm font-bold no-underline tracking-[0.03em] font-poppins"
              >
                Get a Quote →
              </Link>
              <p className="text-center text-[11px] text-[#9B9590] m-0 font-poppins">
                🛍 {cartCount} items in cart · Trusted since 2001
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Scroll Progress ────────────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left", willChange: "transform" }}
      className="h-0.5 bg-[#AA1E15] opacity-35"
    />
  );
}


/* ─── Main Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/catalogue.pdf"; // ← put your PDF path here
    link.download = "Ghanshyam-Enterprises-Catalogue.pdf";
    link.click();
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top red stripe ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-[3px] sticky top-0 z-60 origin-left"
        style={{
          background: "#FCFAF7",
        }}
      />

      {/* ── Nav ── */}
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        role="navigation"
        aria-label="Main navigation"
        className={`font-poppins sticky top-[3px] z-[55] transition-all duration-300
          ${
            scrolled
              ? "bg-[#FAF7F2] border-b border-[#E8E4E0] shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
              : "bg-[#FCFAF7] border-b border-[#D4CFC8] shadow-none"
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* ── Brand ── */}
          <Link
            href="/"
            className="no-underline flex items-center gap-2.5 flex-shrink-0"
          >
            <div className="w-[100px] h-[50px] relative">
              <Image
                src="/assets/Images/logo/rubberindia_logo.png"
                alt="rubberIndia"
                fill
                className=" object-middle"
              />
            </div>
          </Link>

          {/* ── Desktop links — hidden below md ── */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07, delayChildren: 0.25 },
              },
            }}
            role="list"
            className="hidden md:flex items-center gap-5 lg:gap-7 list-none m-0 p-0"
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, y: -6 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <DesktopLink
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              </motion.li>
            ))}
          </motion.ul>

          {/* ── Right cluster ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            {/* Quote CTA — hidden on xs, shown sm+ */}
            <motion.div className="hidden sm:block" {...springHover}>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-[18px] py-2
                  bg-[#AA1E15] text-white rounded-md text-[12px] sm:text-[13px] font-bold
                  no-underline tracking-[0.03em] whitespace-nowrap
                  hover:bg-[#C4261C] transition-colors duration-200 font-poppins"
              >
                <span className="hidden sm:inline">Download Catalogue</span>
                <span className="sm:hidden">Quote</span>

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            <button
              className="cursor-pointer"
              onClick={handleDownload}
              style={{ transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#272362"
                strokeWidth="2.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
                <line x1="8" y1="9" x2="10" y2="9" />
              </svg>
            </button>

            {/* Cart */}

            {/* Hamburger — md and below */}
            <div className="flex md:hidden">
              <Hamburger
                open={mobileOpen}
                onClick={() => setMobileOpen((p) => !p)}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll progress */}
        <ScrollProgress />
      </motion.nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        pathname={pathname}
        cartCount={cartCount}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
