"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative px-6 py-20 text-center md:px-12"
      style={{ borderTop: "1px solid var(--th-border)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(245,166,35,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative">

        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[4px]"
          style={{ color: "var(--th-amber)" }}
        >
          Don't miss out
        </div>

        <h2
          className="th-font-display mx-auto mb-6 max-w-3xl text-5xl leading-tight tracking-wide md:text-6xl"
          style={{ color: "var(--th-text)" }}
        >
          YOUR NEXT FAVOURITE MEMORY
          <br />
          <span
            style={{
              WebkitTextStroke: "1px var(--th-amber)",
              color: "transparent",
            }}
          >
            STARTS HERE
          </span>
        </h2>

        <p
          className="mx-auto mb-10 max-w-lg text-[15px] font-light leading-relaxed"
          style={{ color: "var(--th-muted-2)" }}
        >
          Join thousands of event-goers across India. Sign up free and never
          miss an event in your city.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/auth/register"
            className="th-btn-primary px-10 py-4 text-sm"
          >
            Get Started Free →
          </Link>

          <Link
            href="/events"
            className="th-btn-outline px-10 py-4 text-sm"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}