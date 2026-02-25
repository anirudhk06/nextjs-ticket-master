"use client";
import Link from "next/link";

export default function FreeEventsBanner() {
  return (
    <section className="mb-14 px-6 md:px-12">
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-10 md:px-14 md:py-12"
        style={{
          background: "linear-gradient(135deg, #1a1500, #2a2000, #1a1500)",
          border: "1px solid var(--th-border-2)",
        }}
      >
        {/* Subtle glow on right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2"
          style={{
            background:
              "radial-gradient(ellipse at right, rgba(245,166,35,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          
          {/* Left Content */}
          <div>
            <div
              className="mb-2 text-[10px] font-bold uppercase tracking-[4px]"
              style={{ color: "var(--th-amber)" }}
            >
              🆓 Zero Cost
            </div>

            <h2
              className="th-font-display mb-2 text-4xl tracking-wide md:text-5xl"
              style={{ color: "var(--th-text)" }}
            >
              FREE EVENTS
            </h2>

            <p
              className="max-w-md text-[14px] font-light leading-relaxed"
              style={{ color: "var(--th-muted-2)" }}
            >
              Discover amazing events that cost nothing. Workshops, meetups,
              food fests and more — all free to attend.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/events?price=free"
            className="th-btn-primary whitespace-nowrap px-8 py-4 text-sm"
          >
            Browse Free Events →
          </Link>
        </div>
      </div>
    </section>
  );
}