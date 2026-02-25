"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────
interface TicketTier {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number | null;
  totalQty: number;
  availableQty: number;
  maxPerBooking: number;
}

interface Event {
  id: string;
  emoji: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  endTime: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  organizer: string;
  organizerDesc: string;
  bgGradient: string;
  tiers: TicketTier[];
  tags: string[];
  highlights: string[];
}

// ─── Mock Data ────────────────────────────────────────
const MOCK_EVENTS: Record<string, Event> = {
  "1": {
    id: "1",
    emoji: "🎸",
    category: "music",
    title: "Arijit Singh",
    subtitle: "Live Tour 2026",
    description:
      "Experience the magic of Arijit Singh live in Nashik for the very first time. An unforgettable evening of soulful Bollywood melodies spanning his entire career — from Tum Hi Ho to Kesariya, Agar Tum Saath Ho to Channa Mereya. Outdoor venue with a professional surround sound setup, food stalls, and exclusive merchandise. Gates open 1 hour before the show.",
    date: "Saturday, March 15, 2026",
    time: "7:00 PM",
    endTime: "11:00 PM",
    venue: "Nashik Grounds",
    address: "Near CBS, Old Agra Road, Nashik, Maharashtra 422001",
    city: "Nashik",
    organizer: "Mumbai Live Events Pvt. Ltd.",
    organizerDesc: "India's largest live events company with 200+ shows per year.",
    bgGradient: "linear-gradient(145deg, #1a0022, #3d0050, #1a0800)",
    tags: ["music", "bollywood", "live-concert", "outdoor"],
    highlights: [
      "Live performance by Arijit Singh",
      "Professional surround sound system",
      "Food stalls & beverages on-site",
      "Exclusive merchandise counter",
      "VIP backstage access (VIP pass only)",
    ],
    tiers: [
      {
        id: "t1",
        name: "VIP PASS",
        emoji: "🥇",
        description: "Front row seating · Backstage access after show · Exclusive merch kit included",
        price: 2999,
        totalQty: 100,
        availableQty: 38,
        maxPerBooking: 4,
      },
      {
        id: "t2",
        name: "GOLD",
        emoji: "🌟",
        description: "Premium standing zone · Clear stage view · Priority entry",
        price: 1299,
        totalQty: 500,
        availableQty: 240,
        maxPerBooking: 6,
      },
      {
        id: "t3",
        name: "GENERAL ENTRY",
        emoji: "🎫",
        description: "Standard access · Standing zone · Food stalls included",
        price: 799,
        totalQty: 4000,
        availableQty: 3920,
        maxPerBooking: 10,
      },
      {
        id: "t4",
        name: "LIVESTREAM",
        emoji: "📺",
        description: "Watch the full concert live from anywhere · HD quality stream",
        price: null,
        totalQty: 99999,
        availableQty: 99999,
        maxPerBooking: 1,
      },
    ],
  },
  "2": {
    id: "2",
    emoji: "💻",
    category: "tech",
    title: "DevFest",
    subtitle: "Nashik 2026",
    description:
      "Google Developer Groups Nashik presents DevFest 2026 — a full-day tech conference featuring talks on AI, Flutter, Firebase, and Cloud. Connect with 300+ developers from across Maharashtra. Sessions by Google Developer Experts, hands-on workshops, and networking opportunities.",
    date: "Sunday, February 22, 2026",
    time: "10:00 AM",
    endTime: "6:00 PM",
    venue: "Nashik IT Park Auditorium",
    address: "Ambad MIDC, Nashik, Maharashtra 422010",
    city: "Nashik",
    organizer: "GDG Nashik",
    organizerDesc: "Google Developer Group chapter for Nashik region.",
    bgGradient: "linear-gradient(145deg, #001a22, #003d50, #001220)",
    tags: ["tech", "google", "flutter", "ai", "free"],
    highlights: [
      "12+ technical sessions",
      "Hands-on Flutter & Firebase workshops",
      "Google Developer Expert speakers",
      "Free lunch & refreshments",
      "Networking with 300+ developers",
    ],
    tiers: [
      {
        id: "t1",
        name: "GENERAL PASS",
        emoji: "🎫",
        description: "Full day access · All sessions · Lunch & refreshments included",
        price: null,
        totalQty: 300,
        availableQty: 48,
        maxPerBooking: 2,
      },
      {
        id: "t2",
        name: "WORKSHOP PASS",
        emoji: "🛠",
        description: "Full day + exclusive hands-on workshop session (limited seats)",
        price: 299,
        totalQty: 50,
        availableQty: 12,
        maxPerBooking: 1,
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────
function categoryTagClass(cat: string) {
  const map: Record<string, string> = {
    music: "th-tag-music",
    tech: "th-tag-tech",
    comedy: "th-tag-comedy",
    sports: "th-tag-sports",
    food: "th-tag-food",
  };
  return map[cat] ?? "th-tag-music";
}

function availabilityLabel(tier: TicketTier): { text: string; color: string } {
  if (tier.availableQty === 0) return { text: "Sold Out", color: "var(--th-error)" };
  if (tier.availableQty <= 50) return { text: `Only ${tier.availableQty} left!`, color: "var(--th-error)" };
  if (tier.availableQty <= 100) return { text: `${tier.availableQty} left`, color: "var(--th-amber)" };
  return { text: `${tier.availableQty.toLocaleString()} available`, color: "var(--th-success)" };
}

// ─── Ticket Tier Row ──────────────────────────────────
function TierRow({
  tier,
  qty,
  onAdd,
  onRemove,
}: {
  tier: TicketTier;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const avail = availabilityLabel(tier);
  const soldOut = tier.availableQty === 0;
  const isSelected = qty > 0;

  return (
    <div
      className="rounded-xl p-4 transition-all duration-200"
      style={{
        background: isSelected ? "rgba(245,166,35,0.05)" : "var(--th-surface)",
        border: `1px solid ${isSelected ? "var(--th-amber)" : "var(--th-border)"}`,
        opacity: soldOut ? 0.5 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="th-font-display text-lg tracking-wide" style={{ color: "var(--th-text)" }}>
              {tier.emoji} {tier.name}
            </span>
            <span className="text-[10px] font-bold" style={{ color: avail.color }}>
              {avail.text}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--th-muted-2)" }}>
            {tier.description}
          </p>
          <p className="mt-1 text-[10px]" style={{ color: "var(--th-muted)" }}>
            Max {tier.maxPerBooking} per booking
          </p>
        </div>

        {/* Right — price + qty controls */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="th-font-display text-2xl" style={{ color: tier.price === null ? "var(--th-success)" : "var(--th-amber)" }}>
            {tier.price === null ? "FREE" : `₹${tier.price.toLocaleString("en-IN")}`}
          </div>

          {!soldOut && (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                disabled={qty === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold transition-all duration-150 disabled:opacity-30"
                style={{
                  border: "1px solid var(--th-border-2)",
                  background: "var(--th-surface-2)",
                  color: "var(--th-text)",
                }}
                onMouseEnter={(e) => { if (qty > 0) (e.currentTarget as HTMLElement).style.borderColor = "var(--th-amber)"; }}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--th-border-2)"}
              >
                −
              </button>
              <span
                className="th-font-display w-6 text-center text-xl"
                style={{ color: qty > 0 ? "var(--th-amber)" : "var(--th-muted-2)" }}
              >
                {qty}
              </span>
              <button
                onClick={onAdd}
                disabled={qty >= tier.maxPerBooking || qty >= tier.availableQty}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold transition-all duration-150 disabled:opacity-30"
                style={{
                  border: "1px solid var(--th-border-2)",
                  background: "var(--th-surface-2)",
                  color: "var(--th-text)",
                }}
                onMouseEnter={(e) => { if (qty < tier.maxPerBooking) (e.currentTarget as HTMLElement).style.borderColor = "var(--th-amber)"; }}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--th-border-2)"}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────
export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const event = MOCK_EVENTS[id] ?? MOCK_EVENTS["1"];

  // Ticket quantities per tier
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(event.tiers.map((t) => [t.id, 0]))
  );

  // Sticky bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const tiersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (tiersRef.current) observer.observe(tiersRef.current);
    return () => observer.disconnect();
  }, []);

  const addQty = (tierId: string, max: number, available: number) => {
    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.min((prev[tierId] ?? 0) + 1, max, available),
    }));
  };

  const removeQty = (tierId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.max((prev[tierId] ?? 0) - 1, 0),
    }));
  };

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalAmount = event.tiers.reduce((sum, tier) => {
    return sum + (quantities[tier.id] ?? 0) * (tier.price ?? 0);
  }, 0);

  const handleProceed = () => {
    if (totalTickets === 0) return;
    const selection = event.tiers
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => `${t.id}:${quantities[t.id]}`)
      .join(",");
    router.push(`/book/${event.id}?selection=${selection}`);
  };

  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ height: "300px", background: event.bgGradient }}
      >
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 60px)`,
          }}
        />

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: `linear-gradient(to bottom, transparent, var(--th-bg))` }}
        />

        {/* Category badge */}
        <div className="absolute left-6 top-6 md:left-12">
          <span className={categoryTagClass(event.category)}>{event.category}</span>
        </div>

        {/* Giant emoji */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20 select-none"
          style={{ filter: "blur(2px)" }}
        >
          {event.emoji}
        </div>

        {/* Foreground emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-7xl">
          {event.emoji}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 pb-32 md:px-12">

        {/* Breadcrumb */}
        <div
          className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          <Link href="/"
            style={{ color: "var(--th-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--th-amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--th-muted)")}
          >Home</Link>
          <span>/</span>
          <Link href="/events"
            style={{ color: "var(--th-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--th-amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--th-muted)")}
          >Events</Link>
          <span>/</span>
          <span style={{ color: "var(--th-amber)" }}>{event.title}</span>
        </div>

        {/* Two-col layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0">

            {/* Title */}
            <h1
              className="th-font-display mb-1 leading-none tracking-wide"
              style={{ fontSize: "clamp(42px, 7vw, 72px)", color: "var(--th-text)" }}
            >
              {event.title}
            </h1>
            <h2
              className="th-font-display mb-6 tracking-wide"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                WebkitTextStroke: "1px var(--th-amber)",
                color: "transparent",
              }}
            >
              {event.subtitle}
            </h2>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[1.5px]"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border-2)",
                    color: "var(--th-muted-2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta info grid */}
            <div
              className="mb-8 grid grid-cols-1 gap-3 rounded-2xl p-5 sm:grid-cols-2"
              style={{
                background: "var(--th-surface-2)",
                border: "1px solid var(--th-border)",
              }}
            >
              {[
                { icon: "📅", label: "Date", value: event.date },
                { icon: "🕐", label: "Time", value: `${event.time} – ${event.endTime}` },
                { icon: "📍", label: "Venue", value: event.venue },
                { icon: "🗺️", label: "Address", value: event.address },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
                    style={{
                      background: "var(--th-surface)",
                      border: "1px solid var(--th-border-2)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[1px]" style={{ color: "var(--th-muted)" }}>
                      {item.label}
                    </div>
                    <div className="text-[13px] font-medium" style={{ color: "var(--th-text)" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="mb-8">
              <h3
                className="th-font-display mb-3 text-2xl tracking-wide"
                style={{ color: "var(--th-text)" }}
              >
                ABOUT THIS EVENT
              </h3>
              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ color: "var(--th-muted-2)" }}
              >
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3
                className="th-font-display mb-4 text-2xl tracking-wide"
                style={{ color: "var(--th-text)" }}
              >
                HIGHLIGHTS
              </h3>
              <div className="flex flex-col gap-2">
                {event.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: "var(--th-amber)", color: "#000" }}
                    >
                      ✓
                    </span>
                    <span className="text-[13px]" style={{ color: "var(--th-muted-2)" }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div
              className="mb-8 flex items-center gap-4 rounded-xl p-4"
              style={{
                background: "var(--th-surface-2)",
                border: "1px solid var(--th-border)",
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{ background: "var(--th-surface)", border: "1px solid var(--th-border-2)" }}
              >
                🎪
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "var(--th-muted)" }}>
                  Organized by
                </div>
                <div className="text-[14px] font-semibold" style={{ color: "var(--th-text)" }}>
                  {event.organizer}
                </div>
                <div className="text-[12px]" style={{ color: "var(--th-muted-2)" }}>
                  {event.organizerDesc}
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mb-8">
              <h3
                className="th-font-display mb-4 text-2xl tracking-wide"
                style={{ color: "var(--th-text)" }}
              >
                LOCATION
              </h3>
              <div
                className="flex h-48 items-center justify-center rounded-2xl text-[13px]"
                style={{
                  background: "var(--th-surface-2)",
                  border: "1px solid var(--th-border)",
                  color: "var(--th-muted)",
                }}
              >
                <div className="text-center">
                  <div className="mb-2 text-3xl">🗺️</div>
                  <div className="font-semibold" style={{ color: "var(--th-muted-2)" }}>
                    {event.venue}
                  </div>
                  <div className="text-[11px] mt-1">{event.address}</div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[1px] transition-colors"
                    style={{ color: "var(--th-amber)" }}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Ticket Tiers ── */}
          <div className="lg:w-[360px] lg:shrink-0" ref={tiersRef}>
            <div
              className="sticky top-24 overflow-hidden rounded-2xl"
              style={{
                background: "var(--th-ticket)",
                border: "1px solid var(--th-border-2)",
              }}
            >
              {/* Panel header */}
              <div
                className="px-5 py-4"
                style={{
                  background: "var(--th-surface-2)",
                  borderBottom: "1px solid var(--th-border)",
                }}
              >
                <h3
                  className="th-font-display text-xl tracking-[2px]"
                  style={{ color: "var(--th-text)" }}
                >
                  SELECT TICKETS
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "var(--th-muted)" }}>
                  Choose your tier and quantity below
                </p>
              </div>

              {/* Tier rows */}
              <div className="flex flex-col gap-3 p-4">
                {event.tiers.map((tier) => (
                  <TierRow
                    key={tier.id}
                    tier={tier}
                    qty={quantities[tier.id] ?? 0}
                    onAdd={() => addQty(tier.id, tier.maxPerBooking, tier.availableQty)}
                    onRemove={() => removeQty(tier.id)}
                  />
                ))}
              </div>

              {/* Summary + CTA */}
              <div
                className="p-5"
                style={{
                  background: "var(--th-surface-2)",
                  borderTop: "1px solid var(--th-border)",
                }}
              >
                {/* Breakdown */}
                {totalTickets > 0 && (
                  <div className="mb-4 flex flex-col gap-2">
                    {event.tiers
                      .filter((t) => (quantities[t.id] ?? 0) > 0)
                      .map((t) => (
                        <div key={t.id} className="flex justify-between text-[12px]">
                          <span style={{ color: "var(--th-muted-2)" }}>
                            {t.name} × {quantities[t.id]}
                          </span>
                          <span style={{ color: "var(--th-text)", fontWeight: 600 }}>
                            {t.price === null
                              ? "FREE"
                              : `₹${((quantities[t.id] ?? 0) * t.price).toLocaleString("en-IN")}`}
                          </span>
                        </div>
                      ))}
                    <div
                      className="my-1 h-px"
                      style={{ background: "var(--th-border)" }}
                    />
                  </div>
                )}

                {/* Total */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "var(--th-muted)" }}>
                      Total
                    </div>
                    <div className="th-font-display text-3xl" style={{ color: "var(--th-amber)" }}>
                      {totalAmount === 0 && totalTickets > 0
                        ? "FREE"
                        : totalTickets > 0
                        ? `₹${totalAmount.toLocaleString("en-IN")}`
                        : "—"}
                    </div>
                  </div>
                  {totalTickets > 0 && (
                    <div
                      className="th-badge-amber text-[11px]"
                    >
                      {totalTickets} ticket{totalTickets > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                {/* CTA button */}
                <button
                  onClick={handleProceed}
                  disabled={totalTickets === 0}
                  className="w-full rounded-xl py-4 font-bold uppercase tracking-[3px] transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    background: totalTickets > 0 ? "var(--th-amber)" : "var(--th-surface)",
                    color: totalTickets > 0 ? "#000" : "var(--th-muted)",
                    border: `1px solid ${totalTickets > 0 ? "var(--th-amber)" : "var(--th-border-2)"}`,
                    boxShadow: totalTickets > 0 ? "0 6px 28px rgba(245,166,35,0.35)" : "none",
                  }}
                >
                  {totalTickets === 0 ? "Select Tickets" : "Proceed to Book →"}
                </button>

                <p
                  className="mt-3 text-center text-[10px]"
                  style={{ color: "var(--th-muted)" }}
                >
                  🔒 Secure checkout · Powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          STICKY BOTTOM BAR (mobile + when panel scrolled out)
      ══════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 transition-all duration-300"
        style={{
          background: "rgba(10,8,0,0.97)",
          borderTop: "1px solid var(--th-border-2)",
          backdropFilter: "blur(16px)",
          transform: showStickyBar ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left — event mini info */}
          <div className="min-w-0">
            <div
              className="th-font-display truncate text-lg leading-tight tracking-wide"
              style={{ color: "var(--th-text)" }}
            >
              {event.title} {event.subtitle}
            </div>
            <div className="text-[11px]" style={{ color: "var(--th-muted-2)" }}>
              {event.date} · {event.time}
            </div>
          </div>

          {/* Right — total + CTA */}
          <div className="flex shrink-0 items-center gap-3">
            {totalTickets > 0 && (
              <div className="text-right">
                <div className="text-[10px]" style={{ color: "var(--th-muted)" }}>Total</div>
                <div className="th-font-display text-xl" style={{ color: "var(--th-amber)" }}>
                  {totalAmount === 0 ? "FREE" : `₹${totalAmount.toLocaleString("en-IN")}`}
                </div>
              </div>
            )}
            <button
              onClick={handleProceed}
              disabled={totalTickets === 0}
              className="rounded-xl px-5 py-3 font-bold uppercase tracking-[2px] transition-all duration-200 disabled:opacity-40"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                background: "var(--th-amber)",
                color: "#000",
                boxShadow: "0 4px 20px rgba(245,166,35,0.3)",
              }}
            >
              {totalTickets === 0 ? "Book Now" : `Book ${totalTickets} Ticket${totalTickets > 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}