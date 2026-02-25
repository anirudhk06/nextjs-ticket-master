"use client";
import Link from "next/link";
import { FEATURED_EVENT } from "@/data/mockEvents";
import PriceDisplay from "@/components/shared/PriceDisplay";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div className="relative mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 md:px-12 md:py-20 lg:grid-cols-[1fr_400px]">

                <div className="flex flex-col justify-center">

                    <div
                        className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[4px]"
                        style={{ color: "var(--th-amber)" }}
                    >
                        <span
                            className="h-[2px] w-6 inline-block"
                            style={{ backgroundColor: "var(--th-amber)" }}
                        />
                        India's Live Events Platform
                    </div>

                    <h1
                        className="th-font-display mb-5 leading-[0.92] tracking-[2px]"
                        style={{ fontSize: "clamp(52px, 8vw, 88px)", color: "var(--th-text)" }}
                    >
                        <span className="block">DISCOVER</span>
                        <span
                            className="block"
                            style={{
                                WebkitTextStroke: "1px var(--th-amber)",
                                color: "transparent",
                            }}
                        >
                            UNFORGETTABLE
                        </span>
                        <span className="block">EVENTS.</span>
                    </h1>

                    <p
                        className="mb-8 max-w-md text-[15px] font-light leading-relaxed"
                        style={{ color: "var(--th-muted-2)" }}
                    >
                        Concerts, tech meetups, comedy nights, food festivals — book instantly.
                    </p>

                    <div className="flex max-w-lg flex-col gap-3 sm:flex-row">
                        <input type="text" placeholder="Search events..." className="th-input flex-1" />
                        <select className="th-input sm:w-36">
                            <option>All Cities</option>
                            <option>Nashik</option>
                            <option>Pune</option>
                        </select>
                        <button className="th-btn-primary px-6 py-3 text-sm">
                            Search
                        </button>
                    </div>

                </div>

                {/* Featured Card */}
                <div className="flex items-center justify-center">
                    <div
                        className="w-full max-w-sm overflow-hidden rounded-2xl"
                        style={{
                            background: "var(--th-card)",
                            border: "1px solid var(--th-border-2)",
                            boxShadow:
                                "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,166,35,0.08)",
                            transform: "rotate(1.5deg)",
                        }}
                    >
                        {/* Image Area */}
                        <div
                            className="relative flex h-48 items-center justify-center text-7xl"
                            style={{ background: FEATURED_EVENT.bgGradient }}
                        >
                            {FEATURED_EVENT.emoji}

                            {/* FEATURED Badge */}
                            <div
                                className="absolute left-3 top-3 rounded px-3 py-1 th-font-display text-xs tracking-[2px]"
                                style={{ background: "var(--th-amber)", color: "#000" }}
                            >
                                FEATURED
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                            <div
                                className="mb-2 text-[10px] font-bold uppercase tracking-[3px]"
                                style={{ color: "var(--th-amber)" }}
                            >
                                {FEATURED_EVENT.category}
                            </div>

                            <h3
                                className="th-font-display mb-3 text-2xl leading-tight tracking-wide"
                                style={{ color: "var(--th-text)" }}
                            >
                                {FEATURED_EVENT.title}
                            </h3>

                            <div
                                className="mb-4 flex flex-col gap-1 text-[12px]"
                                style={{ color: "var(--th-muted-2)" }}
                            >
                                <span>
                                    📅 {FEATURED_EVENT.date} · {FEATURED_EVENT.time}
                                </span>
                                <span>
                                    📍 {FEATURED_EVENT.venue}, {FEATURED_EVENT.city}
                                </span>
                                <span>
                                    🎟 {FEATURED_EVENT.seats.toLocaleString()} seats available
                                </span>
                            </div>

                            <div
                                className="flex items-center justify-between border-t pt-4"
                                style={{ borderColor: "var(--th-border)" }}
                            >
                                <div>
                                    <span
                                        className="block text-[10px] font-semibold uppercase tracking-[1px]"
                                        style={{ color: "var(--th-muted)" }}
                                    >
                                        Starting from
                                    </span>
                                    <PriceDisplay
                                        price={FEATURED_EVENT.price}
                                        className="text-2xl"
                                    />
                                </div>

                                <Link
                                    href={`/events/${FEATURED_EVENT.id}`}
                                    className="th-btn-primary text-xs px-4 py-2"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}