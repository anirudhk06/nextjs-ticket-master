"use client";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: "🔍",
      title: "Discover Events",
      desc: "Browse events by category, city, or date. Find what excites you.",
    },
    {
      step: "02",
      icon: "🎫",
      title: "Pick Your Tickets",
      desc: "Choose from VIP, General, or Free tiers. Select quantity and attendee details.",
    },
    {
      step: "03",
      icon: "⚡",
      title: "Pay & Go",
      desc: "Pay instantly via UPI, card, or wallet. Get your QR ticket on email.",
    },
  ];

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ borderTop: "1px solid var(--th-border)" }}
    >
      {/* Background subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(245,166,35,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative mb-14 text-center">
        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[4px]"
          style={{ color: "var(--th-amber)" }}
        >
          Simple Process
        </div>

        <h2
          className="th-font-display text-4xl tracking-wide md:text-5xl"
          style={{ color: "var(--th-text)" }}
        >
          HOW IT WORKS
        </h2>
      </div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">

        {steps.map((item, index) => (
          <div
            key={item.step}
            className="relative rounded-2xl p-8 transition-all duration-300"
            style={{
              background: "var(--th-surface-2)",
              border: "1px solid var(--th-border)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
          >
            {/* Big background step number */}
            <div
              className="th-font-display absolute right-6 top-6 text-6xl opacity-10"
              style={{ color: "var(--th-amber)" }}
            >
              {item.step}
            </div>

            {/* Icon */}
            <div className="mb-5 text-5xl">{item.icon}</div>

            {/* Title */}
            <h3
              className="th-font-display mb-3 text-xl tracking-wide"
              style={{ color: "var(--th-text)" }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p
              className="text-[14px] font-light leading-relaxed"
              style={{ color: "var(--th-muted-2)" }}
            >
              {item.desc}
            </p>

            {/* Decorative bottom accent line */}
            <div
              className="mt-6 h-[2px] w-12"
              style={{ background: "var(--th-amber)" }}
            />
          </div>
        ))}

      </div>
    </section>
  );
}