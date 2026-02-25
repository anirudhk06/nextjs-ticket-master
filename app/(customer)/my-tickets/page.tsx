"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────
type TabType = "upcoming" | "past" | "cancelled";
type BookingStatus = "confirmed" | "attended" | "cancelled";

interface Ticket {
  id: string;
  ticketNumber: string;
  holderName: string;
  holderEmail: string;
  tierName: string;
  tierEmoji: string;
}

interface Booking {
  id: string;
  status: BookingStatus;
  eventId: string;
  eventEmoji: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  bgGradient: string;
  tierName: string;
  tierEmoji: string;
  quantity: number;
  totalAmount: number;
  isFree: boolean;
  bookedOn: string;
  tickets: Ticket[];
}

// ─── Mock Data ────────────────────────────────────────
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    status: "confirmed",
    eventId: "1",
    eventEmoji: "🎸",
    eventTitle: "Arijit Singh Live Tour 2026",
    eventDate: "Sat, Mar 15, 2026",
    eventTime: "7:00 PM",
    eventVenue: "Nashik Grounds",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #1a0022, #3d0050)",
    tierName: "GENERAL ENTRY",
    tierEmoji: "🎫",
    quantity: 2,
    totalAmount: 1909,
    isFree: false,
    bookedOn: "Feb 17, 2026",
    tickets: [
      { id: "tk1", ticketNumber: "TKT-2026-ARL-00847", holderName: "Anirudh Sharma", holderEmail: "anirudh@gmail.com", tierName: "GENERAL ENTRY", tierEmoji: "🎫" },
      { id: "tk2", ticketNumber: "TKT-2026-ARL-00848", holderName: "Rahul Verma", holderEmail: "rahul@gmail.com", tierName: "GENERAL ENTRY", tierEmoji: "🎫" },
    ],
  },
  {
    id: "b2",
    status: "confirmed",
    eventId: "2",
    eventEmoji: "💻",
    eventTitle: "DevFest Nashik 2026",
    eventDate: "Sun, Feb 22, 2026",
    eventTime: "10:00 AM",
    eventVenue: "Nashik IT Park",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #001a22, #003d50)",
    tierName: "GENERAL PASS",
    tierEmoji: "🎫",
    quantity: 1,
    totalAmount: 0,
    isFree: true,
    bookedOn: "Feb 15, 2026",
    tickets: [
      { id: "tk3", ticketNumber: "TKT-2026-DEV-00312", holderName: "Anirudh Sharma", holderEmail: "anirudh@gmail.com", tierName: "GENERAL PASS", tierEmoji: "🎫" },
    ],
  },
  {
    id: "b3",
    status: "confirmed",
    eventId: "5",
    eventEmoji: "🤖",
    eventTitle: "AI & Future of Work Summit",
    eventDate: "Sun, Feb 22, 2026",
    eventTime: "9:00 AM",
    eventVenue: "Hotel Panchavati",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #001a22, #003d50)",
    tierName: "VIP PASS",
    tierEmoji: "🥇",
    quantity: 1,
    totalAmount: 1415,
    isFree: false,
    bookedOn: "Feb 10, 2026",
    tickets: [
      { id: "tk4", ticketNumber: "TKT-2026-AIS-00091", holderName: "Anirudh Sharma", holderEmail: "anirudh@gmail.com", tierName: "VIP PASS", tierEmoji: "🥇" },
    ],
  },
  {
    id: "b4",
    status: "attended",
    eventId: "3",
    eventEmoji: "😂",
    eventTitle: "Stand Up Night with Zakir Khan",
    eventDate: "Mon, Jan 10, 2026",
    eventTime: "8:00 PM",
    eventVenue: "Rajiv Gandhi Bhavan",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #1a1500, #3d3200)",
    tierName: "GENERAL",
    tierEmoji: "🎫",
    quantity: 2,
    totalAmount: 1178,
    isFree: false,
    bookedOn: "Jan 2, 2026",
    tickets: [
      { id: "tk5", ticketNumber: "TKT-2026-ZAK-00203", holderName: "Anirudh Sharma", holderEmail: "anirudh@gmail.com", tierName: "GENERAL", tierEmoji: "🎫" },
      { id: "tk6", ticketNumber: "TKT-2026-ZAK-00204", holderName: "Priya Desai", holderEmail: "priya@gmail.com", tierName: "GENERAL", tierEmoji: "🎫" },
    ],
  },
  {
    id: "b5",
    status: "attended",
    eventId: "4",
    eventEmoji: "🍕",
    eventTitle: "Nashik Street Food Carnival",
    eventDate: "Sat, Dec 14, 2025",
    eventTime: "12:00 PM",
    eventVenue: "Central Park",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #1a0800, #3d1800)",
    tierName: "FREE PASS",
    tierEmoji: "🎫",
    quantity: 3,
    totalAmount: 0,
    isFree: true,
    bookedOn: "Dec 10, 2025",
    tickets: [
      { id: "tk7", ticketNumber: "TKT-2025-SFC-00551", holderName: "Anirudh Sharma", holderEmail: "anirudh@gmail.com", tierName: "FREE PASS", tierEmoji: "🎫" },
    ],
  },
  {
    id: "b6",
    status: "cancelled",
    eventId: "7",
    eventEmoji: "⚽",
    eventTitle: "Pro Kabaddi Finals",
    eventDate: "Tue, Mar 10, 2026",
    eventTime: "6:00 PM",
    eventVenue: "Sports Complex",
    eventCity: "Nashik",
    bgGradient: "linear-gradient(135deg, #001a08, #003d18)",
    tierName: "GENERAL",
    tierEmoji: "🎫",
    quantity: 2,
    totalAmount: 824,
    isFree: false,
    bookedOn: "Feb 5, 2026",
    tickets: [],
  },
];

// ─── QR Code Visual ───────────────────────────────────
function QRCodeVisual({ ticketNumber }: { ticketNumber: string }) {
  // Deterministic "random" pattern from ticket number
  const seed = ticketNumber.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (i: number) => ((seed * (i + 1) * 2654435761) >>> 0) % 100;

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-xl"
      style={{
        width: 180,
        height: 180,
        background: "#fff",
        padding: 12,
      }}
    >
      {/* QR grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(13, 1fr)",
          gridTemplateRows: "repeat(13, 1fr)",
          gap: 1.5,
          width: "100%",
          height: "100%",
        }}
      >
        {Array(169)
          .fill(null)
          .map((_, i) => {
            const row = Math.floor(i / 13);
            const col = i % 13;
            // Corner squares (finder patterns)
            const inTL = row < 4 && col < 4;
            const inTR = row < 4 && col >= 9;
            const inBL = row >= 9 && col < 4;
            const isCorner = inTL || inTR || inBL;
            const isCornerBorder =
              (inTL && (row === 0 || row === 3 || col === 0 || col === 3)) ||
              (inTR && (row === 0 || row === 3 || col === 9 || col === 12)) ||
              (inBL && (row === 9 || row === 12 || col === 0 || col === 3));
            const isCornerInner =
              (inTL && row >= 1 && row <= 2 && col >= 1 && col <= 2) ||
              (inTR && row >= 1 && row <= 2 && col >= 10 && col <= 11) ||
              (inBL && row >= 10 && row <= 11 && col >= 1 && col <= 2);

            const filled = isCorner
              ? isCornerBorder || isCornerInner
              : rand(i) < 45;

            return (
              <div
                key={i}
                style={{
                  borderRadius: isCorner ? 1 : 0.5,
                  background: filled ? "#000" : "transparent",
                }}
              />
            );
          })}
      </div>

      {/* Center logo */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="flex items-center justify-center rounded-lg text-lg"
          style={{
            width: 32,
            height: 32,
            background: "#fff",
            border: "2px solid #000",
          }}
        >
          🎟
        </div>
      </div>
    </div>
  );
}

// ─── QR Modal ─────────────────────────────────────────
function QRModal({
  ticket,
  booking,
  onClose,
}: {
  ticket: Ticket;
  booking: Booking;
  onClose: () => void;
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    // await downloadTicketPDF(ticket.id)
    await new Promise((r) => setTimeout(r, 1000));
    setDownloading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-3xl"
        style={{
          background: "var(--th-ticket)",
          border: "1px solid var(--th-border-2)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header — event banner */}
        <div
          className="relative flex flex-col items-center justify-center py-8 text-center"
          style={{ background: booking.bgGradient }}
        >
          {/* Close btn */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-[16px] transition-all"
            style={{
              background: "rgba(0,0,0,0.3)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            ✕
          </button>

          <div className="mb-3 text-5xl">{booking.eventEmoji}</div>
          <h3
            className="th-font-display px-6 text-xl leading-tight tracking-wide"
            style={{ color: "#fff" }}
          >
            {booking.eventTitle}
          </h3>
          <p className="mt-1 text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            {booking.eventDate} · {booking.eventTime}
          </p>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            📍 {booking.eventVenue}, {booking.eventCity}
          </p>
        </div>

        {/* Tear line */}
        <div className="relative flex items-center">
          <div
            className="h-[1px] flex-1"
            style={{ borderTop: "2px dashed var(--th-border-2)" }}
          />
          <div
            className="absolute -left-3 h-6 w-6 rounded-full"
            style={{ background: "var(--th-bg)" }}
          />
          <div
            className="absolute -right-3 h-6 w-6 rounded-full"
            style={{ background: "var(--th-bg)" }}
          />
        </div>

        {/* QR Body */}
        <div className="px-6 py-6 text-center">
          {/* Tier badge */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span
              className="th-badge-amber"
            >
              {ticket.tierEmoji} {ticket.tierName}
            </span>
          </div>

          {/* QR Code */}
          <QRCodeVisual ticketNumber={ticket.ticketNumber} />

          {/* Ticket number */}
          <div
            className="th-font-display mt-4 tracking-[3px] text-[13px]"
            style={{ color: "var(--th-muted-2)" }}
          >
            {ticket.ticketNumber}
          </div>

          {/* Holder info */}
          <div className="mt-3">
            <div
              className="text-[15px] font-semibold"
              style={{ color: "var(--th-text)" }}
            >
              {ticket.holderName}
            </div>
            <div className="text-[12px]" style={{ color: "var(--th-muted-2)" }}>
              {ticket.holderEmail}
            </div>
          </div>

          {/* Instructions */}
          <p
            className="mt-4 text-[11px] leading-relaxed"
            style={{ color: "var(--th-muted)" }}
          >
            Show this QR code at the venue entrance. One scan per ticket.
          </p>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-5 w-full rounded-xl py-3 text-[12px] font-bold uppercase tracking-[2px] transition-all duration-200 disabled:opacity-60"
            style={{
              background: "var(--th-surface-2)",
              border: "1px solid var(--th-border-2)",
              color: "var(--th-amber)",
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              letterSpacing: "3px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--th-amber-dim)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--th-surface-2)")
            }
          >
            {downloading ? "Generating PDF..." : "⬇ Download Ticket PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cancel Confirm Modal ─────────────────────────────
function CancelModal({
  booking,
  onConfirm,
  onClose,
}: {
  booking: Booking;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl p-6"
        style={{
          background: "var(--th-surface-2)",
          border: "1px solid var(--th-border-2)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-4xl text-center">⚠️</div>
        <h3
          className="th-font-display mb-2 text-center text-2xl tracking-wide"
          style={{ color: "var(--th-text)" }}
        >
          CANCEL BOOKING?
        </h3>
        <p
          className="mb-2 text-center text-[13px] leading-relaxed"
          style={{ color: "var(--th-muted-2)" }}
        >
          You're about to cancel{" "}
          <strong style={{ color: "var(--th-text)" }}>
            {booking.quantity} ticket{booking.quantity > 1 ? "s" : ""}
          </strong>{" "}
          for{" "}
          <strong style={{ color: "var(--th-text)" }}>{booking.eventTitle}</strong>.
        </p>
        {!booking.isFree && (
          <p
            className="mb-6 text-center text-[12px]"
            style={{ color: "var(--th-amber)" }}
          >
            Refund of ₹{booking.totalAmount.toLocaleString("en-IN")} will be
            processed within 5–7 business days.
          </p>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="th-btn-outline flex-1 py-3 text-sm">
            Keep Tickets
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 rounded-xl py-3 text-[12px] font-bold uppercase tracking-[2px] transition-all disabled:opacity-60"
            style={{
              background: "rgba(233,69,96,0.12)",
              border: "1px solid rgba(233,69,96,0.3)",
              color: "var(--th-error)",
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Ticket Card ──────────────────────────────────────
function TicketCard({
  booking,
  onViewQR,
  onCancel,
}: {
  booking: Booking;
  onViewQR: (ticket: Ticket) => void;
  onCancel: (booking: Booking) => void;
}) {
  const isPast = booking.status === "attended";
  const isCancelled = booking.status === "cancelled";
  const isConfirmed = booking.status === "confirmed";

  const statusConfig = {
    confirmed: { label: "Confirmed", color: "var(--th-success)", dot: true },
    attended: { label: "Attended", color: "var(--th-muted-2)", dot: false },
    cancelled: { label: "Cancelled", color: "var(--th-error)", dot: false },
  }[booking.status];

  return (
    <div
      className="overflow-hidden rounded-2xl transition-all duration-200"
      style={{
        background: "var(--th-ticket)",
        border: "1px solid var(--th-border)",
        opacity: isCancelled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isCancelled)
          (e.currentTarget as HTMLElement).style.borderColor = "var(--th-amber)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--th-border)";
      }}
    >
      <div className="flex">
        {/* Left thumb */}
        <div
          className="relative flex w-28 shrink-0 flex-col items-center justify-center gap-1 sm:w-36"
          style={{ background: booking.bgGradient }}
        >
          <div className="text-5xl">{booking.eventEmoji}</div>
          {/* Dashed separator */}
          <div
            className="absolute right-0 top-0 h-full"
            style={{ borderRight: "2px dashed rgba(255,255,255,0.15)" }}
          />
          {/* Notches */}
          <div
            className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
            style={{ background: "var(--th-bg)", zIndex: 1 }}
          />
        </div>

        {/* Right body */}
        <div className="flex flex-1 flex-col justify-between p-4 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3
                className="th-font-display mb-1 truncate text-xl leading-tight tracking-wide"
                style={{ color: "var(--th-text)" }}
              >
                {booking.eventTitle}
              </h3>
              <div
                className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]"
                style={{ color: "var(--th-muted-2)" }}
              >
                <span>📅 {booking.eventDate} · {booking.eventTime}</span>
                <span>📍 {booking.eventVenue}</span>
              </div>
            </div>

            {/* Amount */}
            <div
              className="th-font-display shrink-0 text-xl"
              style={{
                color: booking.isFree
                  ? "var(--th-success)"
                  : "var(--th-amber)",
              }}
            >
              {booking.isFree
                ? "FREE"
                : `₹${booking.totalAmount.toLocaleString("en-IN")}`}
            </div>
          </div>

          {/* Tier + qty badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[1.5px]"
              style={{
                background: "var(--th-amber-dim)",
                border: "1px solid rgba(245,166,35,0.2)",
                color: "var(--th-amber)",
              }}
            >
              {booking.tierEmoji} {booking.tierName}
            </span>
            <span
              className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[1.5px]"
              style={{
                background: "var(--th-surface-2)",
                border: "1px solid var(--th-border-2)",
                color: "var(--th-muted-2)",
              }}
            >
              {booking.quantity} Ticket{booking.quantity > 1 ? "s" : ""}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-[1.5px]"
              style={{ color: "var(--th-muted)" }}
            >
              Booked {booking.bookedOn}
            </span>
          </div>

          {/* Bottom row — status + actions */}
          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: "var(--th-border)" }}
          >
            {/* Status */}
            <div
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px]"
              style={{ color: statusConfig.color }}
            >
              {statusConfig.dot && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: statusConfig.color,
                    boxShadow: `0 0 8px ${statusConfig.color}`,
                  }}
                />
              )}
              {statusConfig.label}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {!isCancelled && booking.tickets.length > 0 && (
                <button
                  onClick={() => onViewQR(booking.tickets[0])}
                  className="rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[1.5px] transition-all duration-150"
                  style={{
                    background: "var(--th-amber)",
                    color: "#000",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {booking.quantity > 1 ? `View QRs (${booking.quantity})` : "View QR"}
                </button>
              )}

              {isConfirmed && (
                <button
                  onClick={() => onCancel(booking)}
                  className="rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[1.5px] transition-all duration-150"
                  style={{
                    border: "1px solid rgba(233,69,96,0.3)",
                    background: "rgba(233,69,96,0.08)",
                    color: "var(--th-error)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Cancel
                </button>
              )}

              {isPast && (
                <Link
                  href={`/events/${booking.eventId}`}
                  className="rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[1.5px] transition-all duration-150"
                  style={{
                    border: "1px solid var(--th-border-2)",
                    background: "var(--th-surface-2)",
                    color: "var(--th-muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Rebook
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-ticket row — show all tickets if quantity > 1 */}
      {!isCancelled && booking.tickets.length > 1 && (
        <div
          className="border-t px-4 py-3"
          style={{ borderColor: "var(--th-border)" }}
        >
          <div
            className="mb-2 text-[10px] font-bold uppercase tracking-[2px]"
            style={{ color: "var(--th-muted)" }}
          >
            All Tickets
          </div>
          <div className="flex flex-wrap gap-2">
            {booking.tickets.map((ticket, i) => (
              <button
                key={ticket.id}
                onClick={() => onViewQR(ticket)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all duration-150"
                style={{
                  background: "var(--th-surface-2)",
                  border: "1px solid var(--th-border-2)",
                  color: "var(--th-muted-2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--th-amber)";
                  (e.currentTarget as HTMLElement).style.color = "var(--th-amber)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--th-border-2)";
                  (e.currentTarget as HTMLElement).style.color = "var(--th-muted-2)";
                }}
              >
                🎫 Ticket {i + 1} — {ticket.holderName.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────
function EmptyState({ tab }: { tab: TabType }) {
  const config = {
    upcoming: {
      emoji: "🎟️",
      title: "No Upcoming Tickets",
      desc: "You haven't booked any upcoming events yet. Find something exciting!",
      cta: "Browse Events",
      href: "/events",
    },
    past: {
      emoji: "🎭",
      title: "No Past Events",
      desc: "Your attended events will show up here.",
      cta: "Browse Events",
      href: "/events",
    },
    cancelled: {
      emoji: "🚫",
      title: "No Cancelled Bookings",
      desc: "You haven't cancelled any bookings.",
      cta: "My Upcoming Tickets",
      href: "#",
    },
  }[tab];

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
      style={{
        background: "var(--th-surface-2)",
        border: "1px solid var(--th-border)",
      }}
    >
      <div className="mb-4 text-6xl opacity-25">{config.emoji}</div>
      <h3
        className="th-font-display mb-2 text-2xl tracking-wide"
        style={{ color: "var(--th-text)" }}
      >
        {config.title}
      </h3>
      <p
        className="mb-6 max-w-xs text-[13px] leading-relaxed"
        style={{ color: "var(--th-muted-2)" }}
      >
        {config.desc}
      </p>
      <Link href={config.href} className="th-btn-primary px-8 py-3 text-xs">
        {config.cta} →
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────
export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  // QR modal state
  const [qrTicket, setQrTicket] = useState<Ticket | null>(null);
  const [qrBooking, setQrBooking] = useState<Booking | null>(null);

  // Cancel modal state
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);

  const TAB_FILTERS: Record<TabType, (b: Booking) => boolean> = {
    upcoming: (b) => b.status === "confirmed",
    past: (b) => b.status === "attended",
    cancelled: (b) => b.status === "cancelled",
  };

  const filtered = bookings.filter(TAB_FILTERS[activeTab]);

  const TABS: { key: TabType; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: bookings.filter(TAB_FILTERS.upcoming).length },
    { key: "past", label: "Past", count: bookings.filter(TAB_FILTERS.past).length },
    { key: "cancelled", label: "Cancelled", count: bookings.filter(TAB_FILTERS.cancelled).length },
  ];

  const handleViewQR = (ticket: Ticket, booking: Booking) => {
    setQrTicket(ticket);
    setQrBooking(booking);
  };

  const handleCancelConfirm = () => {
    if (!cancelBooking) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancelBooking.id ? { ...b, status: "cancelled" as BookingStatus, tickets: [] } : b
      )
    );
    setCancelBooking(null);
  };

  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.totalAmount, 0);

  const totalTickets = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.quantity, 0);

  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-12">

        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className="mb-2 text-[10px] font-bold uppercase tracking-[4px]"
              style={{ color: "var(--th-amber)" }}
            >
              Your Account
            </div>
            <h1
              className="th-font-display text-5xl tracking-wide md:text-6xl"
              style={{ color: "var(--th-text)" }}
            >
              MY TICKETS
            </h1>
          </div>
          <Link href="/events" className="th-btn-primary shrink-0 px-6 py-3 text-xs">
            + Find Events
          </Link>
        </div>

        {/* ── Stats Row ── */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[
            { label: "Total Bookings", value: bookings.filter((b) => b.status !== "cancelled").length },
            { label: "Tickets Booked", value: totalTickets },
            {
              label: "Total Spent",
              value: totalSpent === 0 ? "FREE" : `₹${totalSpent.toLocaleString("en-IN")}`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-xl py-4 text-center"
              style={{
                background: "var(--th-surface-2)",
                border: "1px solid var(--th-border)",
              }}
            >
              <div
                className="th-font-display text-2xl sm:text-3xl"
                style={{ color: "var(--th-amber)" }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[10px] font-bold uppercase tracking-[1.5px]"
                style={{ color: "var(--th-muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div
          className="mb-6 flex gap-1 rounded-xl p-1"
          style={{
            background: "var(--th-surface-2)",
            border: "1px solid var(--th-border)",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-bold uppercase tracking-[1.5px] transition-all duration-200"
              style={{
                background:
                  activeTab === tab.key ? "var(--th-amber)" : "transparent",
                color:
                  activeTab === tab.key ? "#000" : "var(--th-muted-2)",
                boxShadow:
                  activeTab === tab.key
                    ? "0 2px 10px rgba(245,166,35,0.3)"
                    : "none",
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{
                    background:
                      activeTab === tab.key
                        ? "rgba(0,0,0,0.2)"
                        : "var(--th-surface)",
                    color:
                      activeTab === tab.key ? "#000" : "var(--th-muted-2)",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Ticket List ── */}
        {filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <TicketCard
                key={booking.id}
                booking={booking}
                onViewQR={(ticket) => handleViewQR(ticket, booking)}
                onCancel={(b) => setCancelBooking(b)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── QR Modal ── */}
      {qrTicket && qrBooking && (
        <QRModal
          ticket={qrTicket}
          booking={qrBooking}
          onClose={() => {
            setQrTicket(null);
            setQrBooking(null);
          }}
        />
      )}

      {/* ── Cancel Modal ── */}
      {cancelBooking && (
        <CancelModal
          booking={cancelBooking}
          onConfirm={handleCancelConfirm}
          onClose={() => setCancelBooking(null)}
        />
      )}
    </main>
  );
}