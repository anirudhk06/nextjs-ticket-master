"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

// ─── Types ────────────────────────────────────────────
type Step = 1 | 2 | 3;

interface AttendeeInfo {
  name: string;
  email: string;
}

interface TicketSelection {
  tierId: string;
  tierName: string;
  tierEmoji: string;
  price: number | null;
  quantity: number;
}

interface FormErrors {
  [key: string]: string;
}

// ─── Mock Event Data (swap with API call) ─────────────
const MOCK_EVENT = {
  id: "1",
  emoji: "🎸",
  title: "Arijit Singh Live Tour 2026",
  date: "Saturday, March 15, 2026",
  time: "7:00 PM – 11:00 PM",
  venue: "Nashik Grounds",
  city: "Nashik",
  bgGradient: "linear-gradient(135deg, #1a0022, #3d0050)",
};

const MOCK_TIERS: Record<string, { name: string; emoji: string; price: number | null }> = {
  t1: { name: "VIP PASS", emoji: "🥇", price: 2999 },
  t2: { name: "GOLD", emoji: "🌟", price: 1299 },
  t3: { name: "GENERAL ENTRY", emoji: "🎫", price: 799 },
  t4: { name: "LIVESTREAM", emoji: "📺", price: null },
};

// ─── Step Indicator ───────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { num: 1, label: "Attendees" },
    { num: 2, label: "Review" },
    { num: 3, label: "Payment" },
  ];

  return (
    <div className="mb-8 flex items-center">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-all duration-300"
              style={{
                background:
                  step.num < current
                    ? "var(--th-success)"
                    : step.num === current
                    ? "var(--th-amber)"
                    : "var(--th-surface-2)",
                border: `2px solid ${
                  step.num < current
                    ? "var(--th-success)"
                    : step.num === current
                    ? "var(--th-amber)"
                    : "var(--th-border-2)"
                }`,
                color: step.num <= current ? "#000" : "var(--th-muted)",
                boxShadow:
                  step.num === current
                    ? "0 0 16px rgba(245,166,35,0.5)"
                    : "none",
              }}
            >
              {step.num < current ? "✓" : step.num}
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-[1.5px]"
              style={{
                color:
                  step.num === current
                    ? "var(--th-amber)"
                    : step.num < current
                    ? "var(--th-success)"
                    : "var(--th-muted)",
              }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-3 h-[2px] flex-1 mb-5 transition-all duration-500"
              style={{
                background:
                  step.num < current
                    ? "var(--th-success)"
                    : "var(--th-border-2)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────
function OrderSummary({
  selections,
  platformFee,
  gst,
  total,
  showPayBtn,
  onPay,
  payLoading,
}: {
  selections: TicketSelection[];
  platformFee: number;
  gst: number;
  total: number;
  showPayBtn?: boolean;
  onPay?: () => void;
  payLoading?: boolean;
}) {
  return (
    <div
      className="sticky top-24 overflow-hidden rounded-2xl"
      style={{
        background: "var(--th-ticket)",
        border: "1px solid var(--th-border-2)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{
          background: "var(--th-surface-2)",
          borderBottom: "1px solid var(--th-border)",
        }}
      >
        <h3
          className="th-font-display text-lg tracking-[2px]"
          style={{ color: "var(--th-amber)" }}
        >
          ORDER SUMMARY
        </h3>
      </div>

      {/* Event mini card */}
      <div
        className="mx-4 mt-4 flex items-center gap-3 rounded-xl p-3"
        style={{
          background: "var(--th-surface-2)",
          border: "1px solid var(--th-border)",
        }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
          style={{ background: MOCK_EVENT.bgGradient }}
        >
          {MOCK_EVENT.emoji}
        </div>
        <div className="min-w-0">
          <div
            className="th-font-display truncate text-[14px] tracking-wide"
            style={{ color: "var(--th-text)" }}
          >
            {MOCK_EVENT.title}
          </div>
          <div className="text-[11px]" style={{ color: "var(--th-muted-2)" }}>
            {MOCK_EVENT.date}
          </div>
          <div className="text-[11px]" style={{ color: "var(--th-muted-2)" }}>
            📍 {MOCK_EVENT.venue}
          </div>
        </div>
      </div>

      {/* Ticket breakdown */}
      <div className="p-4">
        <div className="mb-3 flex flex-col gap-2">
          {selections.map((s) => (
            <div key={s.tierId} className="flex justify-between text-[13px]">
              <span style={{ color: "var(--th-muted-2)" }}>
                {s.tierEmoji} {s.tierName} × {s.quantity}
              </span>
              <span style={{ color: "var(--th-text)", fontWeight: 600 }}>
                {s.price === null
                  ? "FREE"
                  : `₹${(s.price * s.quantity).toLocaleString("en-IN")}`}
              </span>
            </div>
          ))}
        </div>

        <div
          className="my-3 h-px"
          style={{ background: "var(--th-border)" }}
        />

        <div className="flex flex-col gap-2 text-[12px]">
          <div className="flex justify-between">
            <span style={{ color: "var(--th-muted-2)" }}>Platform fee</span>
            <span style={{ color: "var(--th-text)" }}>₹{platformFee}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--th-muted-2)" }}>GST (18%)</span>
            <span style={{ color: "var(--th-text)" }}>₹{gst}</span>
          </div>
        </div>

        <div
          className="my-3 h-px"
          style={{ background: "var(--th-border-2)" }}
        />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span
            className="th-font-display text-sm tracking-[2px]"
            style={{ color: "var(--th-muted-2)" }}
          >
            TOTAL
          </span>
          <span
            className="th-font-display text-3xl"
            style={{ color: "var(--th-amber)" }}
          >
            {total === 0 ? "FREE" : `₹${total.toLocaleString("en-IN")}`}
          </span>
        </div>

        {/* Pay button */}
        {showPayBtn && (
          <button
            onClick={onPay}
            disabled={payLoading}
            className="mt-4 w-full rounded-xl py-4 font-bold uppercase tracking-[3px] transition-all duration-200 disabled:opacity-60"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              background: "var(--th-amber)",
              color: "#000",
              boxShadow: "0 6px 28px rgba(245,166,35,0.35)",
            }}
          >
            {payLoading ? "Processing..." : total === 0 ? "Confirm Free Booking →" : `Pay ₹${total.toLocaleString("en-IN")} →`}
          </button>
        )}

        <p
          className="mt-3 text-center text-[10px]"
          style={{ color: "var(--th-muted)" }}
        >
          🔒 Secured by Razorpay · UPI · Cards · Wallets
        </p>
      </div>
    </div>
  );
}

// ─── Input field helper ───────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="th-label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = "var(--th-amber)";
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = "var(--th-border-2)";
        }}
        style={{
          width: "100%",
          padding: "11px 14px",
          background: disabled ? "var(--th-surface-2)" : "var(--th-surface)",
          border: `1px solid ${error ? "var(--th-error)" : "var(--th-border-2)"}`,
          borderRadius: "8px",
          color: disabled ? "var(--th-muted-2)" : "var(--th-text)",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          outline: "none",
          transition: "border-color 0.2s",
          opacity: disabled ? 0.7 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {error && (
        <p className="mt-1 text-[11px]" style={{ color: "var(--th-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Booking Content ──────────────────────────────────
function BookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = params?.eventId as string;
  const selectionParam = searchParams.get("selection") ?? "t3:2";

  // Parse selection from URL: "t3:2,t1:1"
  const selections: TicketSelection[] = selectionParam
    .split(",")
    .map((seg) => {
      const [tierId, qty] = seg.split(":");
      const tier = MOCK_TIERS[tierId];
      if (!tier) return null;
      return {
        tierId,
        tierName: tier.name,
        tierEmoji: tier.emoji,
        price: tier.price,
        quantity: parseInt(qty, 10) || 1,
      };
    })
    .filter(Boolean) as TicketSelection[];

  // Compute totals
  const subtotal = selections.reduce(
    (sum, s) => sum + (s.price ?? 0) * s.quantity,
    0
  );
  const platformFee = subtotal > 0 ? 20 * selections.reduce((s, t) => s + t.quantity, 0) : 0;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + platformFee + gst;
  const totalTickets = selections.reduce((s, t) => s + t.quantity, 0);

  // Attendee state — one per ticket
  const [attendees, setAttendees] = useState<AttendeeInfo[]>(
    Array(totalTickets).fill(null).map(() => ({ name: "", email: "" }))
  );

  // Contact
  const [contactPhone, setContactPhone] = useState("");
  const [contactCity, setContactCity] = useState("");

  // Step
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [payLoading, setPayLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const updateAttendee = (index: number, field: keyof AttendeeInfo, value: string) => {
    setAttendees((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    const key = `attendee_${index}_${field}`;
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  // ── Validate Step 1 ──
  const validateStep1 = () => {
    const e: FormErrors = {};
    attendees.forEach((a, i) => {
      if (!a.name.trim()) e[`attendee_${i}_name`] = "Name is required";
      if (!a.email.trim()) e[`attendee_${i}_email`] = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email))
        e[`attendee_${i}_email`] = "Invalid email";
    });
    if (!contactPhone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(contactPhone.replace(/\s/g, "")))
      e.phone = "Enter valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Handle Razorpay ──
  const handlePayment = async () => {
    setPayLoading(true);
    try {
      // Step 1: Create Razorpay order from backend
      // const { order_id, amount } = await createOrder({ eventId, selections, attendees });

      // Step 2: Open Razorpay popup (mock for now)
      await new Promise((r) => setTimeout(r, 1500));

      // const rzp = new (window as any).Razorpay({
      //   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      //   amount: amount,
      //   currency: "INR",
      //   order_id: order_id,
      //   name: "TicketHive",
      //   description: MOCK_EVENT.title,
      //   handler: async (response: any) => {
      //     await verifyPayment(response);
      //     setBookingSuccess(true);
      //   },
      //   prefill: { name: attendees[0].name, email: attendees[0].email, contact: contactPhone },
      //   theme: { color: "#F5A623" },
      // });
      // rzp.open();

      setBookingSuccess(true);
    } catch {
      setErrors({ general: "Payment failed. Please try again." });
    } finally {
      setPayLoading(false);
    }
  };

  // ── Success Screen ──
  if (bookingSuccess) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-6 py-16"
        style={{ backgroundColor: "var(--th-bg)" }}
      >
        <div className="w-full max-w-md text-center">
          {/* Animated checkmark */}
          <div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-5xl"
            style={{
              background: "rgba(6,214,160,0.12)",
              border: "2px solid var(--th-success)",
              boxShadow: "0 0 40px rgba(6,214,160,0.2)",
            }}
          >
            ✅
          </div>

          <h1
            className="th-font-display mb-2 text-5xl tracking-wide"
            style={{ color: "var(--th-text)" }}
          >
            BOOKING
          </h1>
          <h1
            className="th-font-display mb-6 text-5xl tracking-wide"
            style={{
              WebkitTextStroke: "1px var(--th-success)",
              color: "transparent",
            }}
          >
            CONFIRMED!
          </h1>

          <p className="mb-8 text-[14px] font-light leading-relaxed" style={{ color: "var(--th-muted-2)" }}>
            Your tickets for <strong style={{ color: "var(--th-text)" }}>{MOCK_EVENT.title}</strong> are confirmed.
            QR tickets have been sent to{" "}
            <strong style={{ color: "var(--th-amber)" }}>{attendees[0]?.email}</strong>
          </p>

          {/* Booking ref */}
          <div
            className="mb-8 rounded-xl px-6 py-4"
            style={{
              background: "var(--th-surface-2)",
              border: "1px solid var(--th-border-2)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ color: "var(--th-muted)" }}>
              Booking Reference
            </div>
            <div
              className="th-font-display text-2xl tracking-[4px]"
              style={{ color: "var(--th-amber)" }}
            >
              TKT-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/my-tickets"
              className="th-btn-primary block w-full py-4 text-center text-sm"
            >
              View My Tickets →
            </Link>
            <Link
              href="/events"
              className="th-btn-outline block w-full py-4 text-center text-sm"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">

        {/* Breadcrumb */}
        <div
          className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          <Link href="/" style={{ color: "var(--th-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--th-amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--th-muted)")}
          >Home</Link>
          <span>/</span>
          <Link href={`/events/${eventId}`} style={{ color: "var(--th-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--th-amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--th-muted)")}
          >Event</Link>
          <span>/</span>
          <span style={{ color: "var(--th-amber)" }}>Book Tickets</span>
        </div>

        {/* Page title */}
        <h1
          className="th-font-display mb-8 text-4xl tracking-wide md:text-5xl"
          style={{ color: "var(--th-text)" }}
        >
          BOOK TICKETS
        </h1>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* General error */}
        {errors.general && (
          <div
            className="mb-6 rounded-xl px-5 py-4 text-[13px]"
            style={{
              background: "rgba(233,69,96,0.1)",
              border: "1px solid rgba(233,69,96,0.3)",
              color: "var(--th-error)",
            }}
          >
            ⚠ {errors.general}
          </div>
        )}

        {/* Two-col layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ── MAIN FORM ── */}
          <div className="flex-1 min-w-0">

            {/* ════ STEP 1 — ATTENDEE DETAILS ════ */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                {/* Build attendee forms from selections */}
                {(() => {
                  let ticketIndex = 0;
                  return selections.map((sel) =>
                    Array(sel.quantity).fill(null).map((_, qi) => {
                      const idx = ticketIndex++;
                      return (
                        <div
                          key={`${sel.tierId}-${qi}`}
                          className="overflow-hidden rounded-2xl"
                          style={{
                            background: "var(--th-surface-2)",
                            border: "1px solid var(--th-border)",
                          }}
                        >
                          {/* Ticket header */}
                          <div
                            className="flex items-center gap-3 px-5 py-4"
                            style={{
                              background: "var(--th-surface)",
                              borderBottom: "1px solid var(--th-border)",
                            }}
                          >
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg"
                              style={{
                                background: "var(--th-amber-dim)",
                                border: "1px solid rgba(245,166,35,0.25)",
                              }}
                            >
                              {sel.tierEmoji}
                            </div>
                            <div>
                              <div
                                className="th-font-display text-[15px] tracking-wide"
                                style={{ color: "var(--th-text)" }}
                              >
                                TICKET {idx + 1} — {sel.tierName}
                              </div>
                              <div className="text-[11px]" style={{ color: "var(--th-muted)" }}>
                                {sel.price === null ? "Free" : `₹${sel.price.toLocaleString("en-IN")}`}
                              </div>
                            </div>
                          </div>

                          {/* Fields */}
                          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                            <Field
                              label="Full Name"
                              placeholder="Attendee name"
                              value={attendees[idx]?.name ?? ""}
                              onChange={(v) => updateAttendee(idx, "name", v)}
                              error={errors[`attendee_${idx}_name`]}
                            />
                            <Field
                              label="Email Address"
                              type="email"
                              placeholder="Ticket sent here"
                              value={attendees[idx]?.email ?? ""}
                              onChange={(v) => updateAttendee(idx, "email", v)}
                              error={errors[`attendee_${idx}_email`]}
                            />
                          </div>
                        </div>
                      );
                    })
                  );
                })()}

                {/* Contact info */}
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 px-5 py-4"
                    style={{
                      background: "var(--th-surface)",
                      borderBottom: "1px solid var(--th-border)",
                    }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
                      style={{
                        background: "var(--th-amber-dim)",
                        border: "1px solid rgba(245,166,35,0.25)",
                      }}
                    >
                      📱
                    </div>
                    <div
                      className="th-font-display text-[15px] tracking-wide"
                      style={{ color: "var(--th-text)" }}
                    >
                      CONTACT INFO
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                    <div>
                      <label className="th-label">Phone Number</label>
                      <div className="flex gap-2">
                        <div
                          className="flex shrink-0 items-center rounded-lg px-3 text-[12px] font-semibold"
                          style={{
                            background: "var(--th-surface)",
                            border: "1px solid var(--th-border-2)",
                            color: "var(--th-muted-2)",
                          }}
                        >
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={contactPhone}
                          onChange={(e) => {
                            setContactPhone(e.target.value);
                            if (errors.phone) setErrors((p) => { const n = { ...p }; delete n.phone; return n; });
                          }}
                          onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = "var(--th-amber)"; }}
                          onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = "var(--th-border-2)"; }}
                          style={{
                            flex: 1,
                            padding: "11px 14px",
                            background: "var(--th-surface)",
                            border: `1px solid ${errors.phone ? "var(--th-error)" : "var(--th-border-2)"}`,
                            borderRadius: "8px",
                            color: "var(--th-text)",
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            outline: "none",
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-[11px]" style={{ color: "var(--th-error)" }}>{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="th-label">Your City</label>
                      <input
                        type="text"
                        placeholder="Nashik"
                        value={contactCity}
                        onChange={(e) => setContactCity(e.target.value)}
                        onFocus={(e) => (e.target.style.borderColor = "var(--th-amber)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--th-border-2)")}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "var(--th-surface)",
                          border: "1px solid var(--th-border-2)",
                          borderRadius: "8px",
                          color: "var(--th-text)",
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Next button */}
                <button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="th-btn-primary w-full py-4 text-sm"
                >
                  Continue to Review →
                </button>
              </div>
            )}

            {/* ════ STEP 2 — REVIEW ════ */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border)",
                  }}
                >
                  <div
                    className="px-5 py-4"
                    style={{
                      background: "var(--th-surface)",
                      borderBottom: "1px solid var(--th-border)",
                    }}
                  >
                    <h3
                      className="th-font-display text-xl tracking-wide"
                      style={{ color: "var(--th-text)" }}
                    >
                      REVIEW YOUR BOOKING
                    </h3>
                  </div>

                  <div className="divide-y p-0" style={{ borderColor: "var(--th-border)" }}>
                    {(() => {
                      let ticketIndex = 0;
                      return selections.map((sel) =>
                        Array(sel.quantity).fill(null).map((_, qi) => {
                          const idx = ticketIndex++;
                          const att = attendees[idx];
                          return (
                            <div
                              key={`${sel.tierId}-${qi}-review`}
                              className="flex items-center justify-between px-5 py-4"
                              style={{ borderBottom: "1px solid var(--th-border)" }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                                  style={{
                                    background: "var(--th-amber-dim)",
                                    border: "1px solid rgba(245,166,35,0.2)",
                                  }}
                                >
                                  {sel.tierEmoji}
                                </div>
                                <div>
                                  <div className="text-[13px] font-semibold" style={{ color: "var(--th-text)" }}>
                                    {att?.name || "—"}
                                  </div>
                                  <div className="text-[11px]" style={{ color: "var(--th-muted-2)" }}>
                                    {att?.email || "—"} · {sel.tierName}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="th-font-display text-lg"
                                style={{ color: sel.price === null ? "var(--th-success)" : "var(--th-amber)" }}
                              >
                                {sel.price === null ? "FREE" : `₹${sel.price.toLocaleString("en-IN")}`}
                              </div>
                            </div>
                          );
                        })
                      );
                    })()}

                    {/* Contact row */}
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-[12px]" style={{ color: "var(--th-muted-2)" }}>
                        📱 +91 {contactPhone}
                      </span>
                      <button
                        onClick={() => setStep(1)}
                        className="text-[11px] font-semibold uppercase tracking-[1px] transition-colors"
                        style={{ color: "var(--th-amber)" }}
                      >
                        Edit ✎
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cancellation policy */}
                <div
                  className="rounded-xl px-5 py-4 text-[12px] leading-relaxed"
                  style={{
                    background: "rgba(245,166,35,0.05)",
                    border: "1px solid rgba(245,166,35,0.15)",
                    color: "var(--th-muted-2)",
                  }}
                >
                  <strong style={{ color: "var(--th-amber)" }}>⚠ Cancellation Policy: </strong>
                  Cancel 2+ hours before the event for a full refund. No refund for cancellations within 2 hours.
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="th-btn-outline flex-1 py-4 text-sm"
                  >
                    ← Edit Details
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="th-btn-primary flex-1 py-4 text-sm"
                  >
                    Proceed to Pay →
                  </button>
                </div>
              </div>
            )}

            {/* ════ STEP 3 — PAYMENT ════ */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                {/* Payment methods info */}
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border)",
                  }}
                >
                  <div
                    className="px-5 py-4"
                    style={{
                      background: "var(--th-surface)",
                      borderBottom: "1px solid var(--th-border)",
                    }}
                  >
                    <h3
                      className="th-font-display text-xl tracking-wide"
                      style={{ color: "var(--th-text)" }}
                    >
                      PAYMENT
                    </h3>
                    <p className="text-[12px] mt-1" style={{ color: "var(--th-muted-2)" }}>
                      Clicking "Pay" will open the Razorpay secure payment window
                    </p>
                  </div>

                  {/* Accepted methods */}
                  <div className="p-5">
                    <div
                      className="mb-4 text-[10px] font-bold uppercase tracking-[2px]"
                      style={{ color: "var(--th-muted)" }}
                    >
                      Accepted Payment Methods
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { icon: "📲", label: "UPI", desc: "GPay, PhonePe, Paytm" },
                        { icon: "💳", label: "Cards", desc: "Visa, Mastercard, RuPay" },
                        { icon: "🏦", label: "Netbanking", desc: "All major banks" },
                        { icon: "👛", label: "Wallets", desc: "Paytm, Amazon Pay" },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="flex flex-col items-center gap-2 rounded-xl py-4 text-center"
                          style={{
                            background: "var(--th-surface)",
                            border: "1px solid var(--th-border-2)",
                          }}
                        >
                          <span className="text-2xl">{m.icon}</span>
                          <span
                            className="th-font-display text-[13px] tracking-wide"
                            style={{ color: "var(--th-text)" }}
                          >
                            {m.label}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--th-muted)" }}>
                            {m.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security note */}
                  <div
                    className="flex items-center gap-3 px-5 pb-5"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(6,214,160,0.1)",
                        border: "1px solid rgba(6,214,160,0.2)",
                      }}
                    >
                      🔒
                    </div>
                    <p className="text-[12px]" style={{ color: "var(--th-muted-2)" }}>
                      Your payment is secured by <strong style={{ color: "var(--th-text)" }}>Razorpay</strong> with
                      256-bit SSL encryption. We never store your card details.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="th-btn-outline py-4 px-6 text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={payLoading}
                    className="flex-1 rounded-xl py-4 font-bold uppercase tracking-[3px] transition-all duration-200 disabled:opacity-60"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      background: "var(--th-amber)",
                      color: "#000",
                      boxShadow: "0 6px 28px rgba(245,166,35,0.35)",
                    }}
                  >
                    {payLoading
                      ? "Opening Razorpay..."
                      : total === 0
                      ? "Confirm Free Booking →"
                      : `Pay ₹${total.toLocaleString("en-IN")} →`}
                  </button>
                </div>

                <p
                  className="text-center text-[11px]"
                  style={{ color: "var(--th-muted)" }}
                >
                  By completing this purchase you agree to our{" "}
                  <Link href="/terms" style={{ color: "var(--th-amber)" }}>Terms</Link>
                </p>
              </div>
            )}
          </div>

          {/* ── ORDER SUMMARY SIDEBAR ── */}
          <div className="lg:w-[320px] lg:shrink-0">
            <OrderSummary
              selections={selections}
              platformFee={platformFee}
              gst={gst}
              total={total}
              showPayBtn={step === 3}
              onPay={handlePayment}
              payLoading={payLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Page Export ──────────────────────────────────────
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ background: "var(--th-bg)" }}
        >
          <div
            className="th-font-display text-2xl tracking-[4px]"
            style={{ color: "var(--th-amber)" }}
          >
            LOADING...
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}