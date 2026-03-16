"use client";

import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FONT = "Arial, Helvetica, sans-serif";

/* ─── Animated section reveal ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ──────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-5 h-0.5 rounded-full bg-[#AA1E15]" />
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#AA1E15]"
        style={{ fontFamily: FONT }}>
        {text}
      </span>
    </div>
  );
}

/* ─── Contact info row ───────────────────────────────────────────────── */
function InfoRow({ icon, label, value, href, delay }: {
  icon: React.ReactNode; label: string; value: string;
  href?: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Tag = href ? motion.a : motion.div;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Tag
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        whileHover={href ? { x: 3 } : {}}
        transition={{ duration: 0.2 }}
        className={`flex items-start gap-3.5 group ${href ? "cursor-pointer" : ""}`}
        style={{ textDecoration: "none" }}
      >
        <div className="mt-0.5 w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center
          transition-colors duration-200 group-hover:bg-[rgba(170,30,21,0.12)]"
          style={{ backgroundColor: "rgba(170,30,21,0.08)", color: "#AA1E15" }}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#9B9590] mb-0.5"
            style={{ fontFamily: FONT }}>
            {label}
          </p>
          <p className={`text-sm sm:text-base font-medium text-[#1A1A1A] leading-snug
            ${href ? "group-hover:text-[#AA1E15] transition-colors duration-200" : ""}`}
            style={{ fontFamily: FONT }}>
            {value}
          </p>
        </div>
      </Tag>
    </motion.div>
  );
}

/* ─── Floating rubber band ring ─────────────────────────────────────── */
function FloatRing({ size, delay }: { size: number; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute pointer-events-none opacity-[0.12]"
    >
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        <ellipse cx={size / 2} cy={size / 4} rx={size / 2 - 6} ry={size / 4 - 4}
          stroke="#AA1E15" strokeWidth="5" fill="none" />
        <ellipse cx={size / 2} cy={size / 4} rx={size / 2 - 6} ry={size / 4 - 4}
          stroke="#AA1E15" strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── Input field ────────────────────────────────────────────────────── */
function FormField({
  label, name, type = "text", value, onChange, placeholder, required = false,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: any) => void; placeholder: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        animate={{ color: focused ? "#AA1E15" : "#4A4540" }}
        transition={{ duration: 0.2 }}
        className="block text-sm font-semibold mb-1.5"
        style={{ fontFamily: FONT }}
      >
        {label}
        {required && <span className="text-[#AA1E15] ml-0.5">*</span>}
      </motion.label>
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 rounded-xl text-sm text-[#1A1A1A] bg-[#F5F0E8]
            border-2 transition-all duration-200 outline-none placeholder:text-[#C4BFB8]"
          style={{
            fontFamily: FONT,
            borderColor: focused ? "#AA1E15" : "#E8E4E0",
            boxShadow: focused ? "0 0 0 3px rgba(170,30,21,0.08)" : "none",
          }}
        />
        {/* Animated focus bar */}
        <motion.div
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#AA1E15] origin-left"
        />
      </div>
    </div>
  );
}

/* ─── Textarea field ─────────────────────────────────────────────────── */
function TextareaField({
  label, name, value, onChange, placeholder, rows = 5, required = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: any) => void; placeholder: string;
  rows?: number; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        animate={{ color: focused ? "#AA1E15" : "#4A4540" }}
        transition={{ duration: 0.2 }}
        className="block text-sm font-semibold mb-1.5"
        style={{ fontFamily: FONT }}
      >
        {label}
        {required && <span className="text-[#AA1E15] ml-0.5">*</span>}
      </motion.label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl text-sm text-[#1A1A1A] bg-[#F5F0E8]
          border-2 transition-all duration-200 outline-none placeholder:text-[#C4BFB8]
          resize-none"
        style={{
          fontFamily: FONT,
          borderColor: focused ? "#AA1E15" : "#E8E4E0",
          boxShadow: focused ? "0 0 0 3px rgba(170,30,21,0.08)" : "none",
        }}
      />
    </div>
  );
}

/* ─── Success toast ──────────────────────────────────────────────────── */
function SuccessToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3
            px-5 py-4 rounded-xl shadow-xl"
          style={{ backgroundColor: "#1A1A1A", fontFamily: FONT, maxWidth: 320 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#AA1E15] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-bold">Message sent!</p>
            <p className="text-white/60 text-xs mt-0.5">We'll get back to you shortly.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Contact Page ──────────────────────────────────────────────── */
export default function ContactPage() {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate send delay — replace with your actual email service call
    setTimeout(() => {
      console.log("Form submitted:", form);
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <div
      className="min-h-screen py-12 sm:py-20 px-4"
      style={{ backgroundColor: "#F5F0E8", fontFamily: FONT }}
    >
      {/* Success toast */}
      <SuccessToast show={submitted} />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">

        {/* ── Page header ── */}
        <Reveal>
          <div className="text-center">
            <SectionLabel text="Contact Us" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight mb-3"
              style={{ fontFamily: FONT }}>
              Get In <span style={{ color: "#AA1E15" }}>Touch</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B6560] max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: FONT }}>
              Whether you need bulk orders, custom packaging, or product details,
              we're here to help. Reach out to us anytime.
            </p>
          </div>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* ── LEFT: Business info ── */}
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-6 h-full">

              {/* Info card */}
              <div className="relative bg-white rounded-2xl border border-[#E8E4E0]
                overflow-hidden flex-1">
                {/* Red top stripe */}
                <div className="h-1"
                  style={{ background: "linear-gradient(90deg, #AA1E15, #C4261C 50%, #AA1E15)" }} />

                {/* Floating rings */}
                <div className="absolute top-6 right-6">
                  <FloatRing size={80} delay={0} />
                </div>
                <div className="absolute bottom-10 right-20">
                  <FloatRing size={50} delay={1.5} />
                </div>

                <div className="relative z-10 p-6 sm:p-8">
                  <SectionLabel text="Our Details" />
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-6"
                    style={{ fontFamily: FONT }}>
                    Ghanshyam Enterprises
                  </h2>

                  <div className="space-y-5">
                    <InfoRow
                      delay={0.1}
                      label="Customer Care"
                      value="9820674274 / 7021238502"
                      href="tel:9820674274"
                      icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      }
                    />
                    <InfoRow
                      delay={0.18}
                      label="Email"
                      value="vijayvagadrubber@gmail.com"
                      href="mailto:vijayvagadrubber@gmail.com"
                      icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      }
                    />
                    <InfoRow
                      delay={0.26}
                      label="Address"
                      value="18/20, Kazi Sayeed Street, 1st Floor, Room No. 3B, Opp. Silver Moon Hotel, Masjid Bunder – 400009."
                      icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Hours */}
                  <div className="mt-6 pt-5 border-t border-[#E8E4E0]">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#9B9590] mb-2"
                      style={{ fontFamily: FONT }}>
                      Business Hours
                    </p>
                    <div className="flex flex-col gap-1">
                      {[
                        { day: "Mon – Sat", hours: "9:00 AM – 7:00 PM" },
                        { day: "Sunday", hours: "Closed" },
                      ].map(({ day, hours }) => (
                        <div key={day} className="flex justify-between text-sm"
                          style={{ fontFamily: FONT }}>
                          <span className="text-[#6B6560]">{day}</span>
                          <span className={`font-semibold ${hours === "Closed" ? "text-[#AA1E15]" : "text-[#1A1A1A]"}`}>
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map — unchanged, just styled wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[#E8E4E0] shadow-sm"
                style={{ height: 220 }}
              >
                <iframe
                  src="https://www.google.com/maps?q=18/20%20Kazi%20Sayeed%20Street,%20Masjid%20Bunder%20400009&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

            </div>
          </Reveal>

          {/* ── RIGHT: Contact form ── */}
          <Reveal delay={0.12}>
            <div className="bg-white rounded-2xl border border-[#E8E4E0] overflow-hidden h-full">
              {/* Red top stripe */}
              <div className="h-1"
                style={{ background: "linear-gradient(90deg, #AA1E15, #C4261C 50%, #AA1E15)" }} />

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">
                <div>
                  <SectionLabel text="Send a Message" />
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]"
                    style={{ fontFamily: FONT }}>
                    We'll get back to you soon
                  </h3>
                </div>

                <FormField
                  label="Your Name" name="name" value={form.name}
                  onChange={handleChange} placeholder="Enter your name" required
                />
                <FormField
                  label="Email Address" name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="Enter your email" required
                />
                <FormField
                  label="Phone Number" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="Enter your phone number"
                />
                <TextareaField
                  label="Message" name="message" value={form.message}
                  onChange={handleChange} placeholder="Tell us what you need..." required rows={5}
                />

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white
                    flex items-center justify-center gap-2.5 transition-colors duration-200"
                  style={{
                    backgroundColor: submitting ? "#C4261C" : "#AA1E15",
                    fontFamily: FONT,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-[#9B9590]" style={{ fontFamily: FONT }}>
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </div>
          </Reveal>
        </div>

        {/* ── Quick contact strip ── */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
                label: "Call Us",
                value: "9820674274",
                href: "tel:9820674274",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email Us",
                value: "vijayvagadrubber@gmail.com",
                href: "mailto:vijayvagadrubber@gmail.com",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#AA1E15" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                label: "Visit Us",
                value: "Masjid Bunder, Mumbai – 400009",
                href: "https://maps.google.com/?q=Masjid+Bunder+Mumbai",
              },
            ].map(({ icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(170,30,21,0.1)" }}
                className="flex items-center gap-3.5 p-4 bg-white rounded-xl
                  border border-[#E8E4E0] transition-shadow duration-200 no-underline group"
              >
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center
                  group-hover:bg-[rgba(170,30,21,0.1)] transition-colors duration-200"
                  style={{ backgroundColor: "rgba(170,30,21,0.07)" }}>
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-[#9B9590]"
                    style={{ fontFamily: FONT }}>{label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A] truncate
                    group-hover:text-[#AA1E15] transition-colors duration-200"
                    style={{ fontFamily: FONT }}>{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

      </div>
    </div>
  );
}