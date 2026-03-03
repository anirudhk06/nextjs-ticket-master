"use client";
import Link from "next/link";
import PriceDisplay from "@/components/shared/PriceDisplay";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedEvent } from "@/services/event.service";
import { NearestWeekdayEvent } from "@/types/event.types";
import { formatEventDate } from "@/utils/formatDate";
import { Skeleton } from "../ui/skeleton";

export default function HeroSection() {
    const { data: event, isLoading, error } = useQuery<NearestWeekdayEvent>({
        queryKey: ['featured-event'],
        queryFn: getFeaturedEvent,
    })


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

                    <div className="flex flex-wrap gap-4">
                        <Link href="/events" className="th-btn-primary px-8 py-3 text-sm">
                            Browse All Events
                        </Link>
                    </div>

                </div>

                {/* Featured Card Area */}
                <div className="flex items-center justify-center lg:justify-end">
                    {
                        isLoading ? (
                            <div
                                className="w-full max-w-[360px] overflow-hidden rounded-2xl border bg-th-card"
                                style={{
                                    borderColor: "var(--th-border-2)",
                                    transform: "rotate(1.5deg)",
                                }}
                            >
                                {/* Image Skeleton */}
                                <Skeleton className="h-48 w-full rounded-none opacity-20" />

                                <div className="p-6">
                                    {/* Category Skeleton */}
                                    <Skeleton className="mb-3 h-3 w-20 opacity-20" />

                                    {/* Title Skeleton */}
                                    <Skeleton className="mb-4 h-8 w-full opacity-30" />

                                    {/* Details Skeleton */}
                                    <div className="mb-6 space-y-2">
                                        <Skeleton className="h-4 w-3/4 opacity-15" />
                                        <Skeleton className="h-4 w-1/2 opacity-15" />
                                        <Skeleton className="h-4 w-2/3 opacity-15" />
                                    </div>

                                    {/* Footer Skeleton */}
                                    <div className="flex items-center justify-between border-t border-dashed pt-5" style={{ borderColor: "var(--th-border)" }}>
                                        <div className="space-y-1">
                                            <Skeleton className="h-2 w-16 opacity-10" />
                                            <Skeleton className="h-6 w-24 opacity-20" />
                                        </div>
                                        <Skeleton className="h-10 w-28 rounded-md opacity-30" />
                                    </div>
                                </div>
                            </div>
                        ) : error ? (
                            <div
                                className="w-full max-w-[360px] rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[380px]"
                                style={{
                                    background: "rgba(20, 18, 0, 0.4)",
                                    border: "2px dashed var(--th-border-2)",
                                    backdropFilter: "blur(10px)",
                                    transform: "rotate(-1.5deg)",
                                }}
                            >
                                <div className="w-16 h-16 rounded-full bg-th-surface-2 flex items-center justify-center mb-6 border border-th-border">
                                    <span className="text-3xl grayscale opacity-40">✨</span>
                                </div>
                                <h3 className="th-font-display text-xl mb-3 text-th-text opacity-70">
                                    Fresh Events Soon
                                </h3>
                                <p className="text-sm text-th-muted-2 mb-8 max-w-[220px]">
                                    We're curating the next set of unforgettable live experiences.
                                </p>
                                <Link href="/events" className="th-btn-outline px-6 py-2.5 text-[10px]">
                                    Browse Categories
                                </Link>
                            </div>
                        ) : (
                            event &&
                            <div
                                className="group w-full max-w-[360px] overflow-hidden rounded-2xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02]"
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
                                    className="relative flex h-48 items-center justify-center text-7xl transition-transform duration-500 group-hover:scale-110"
                                    style={{ background: event.bg_color }}
                                >
                                    {event.category__emoji}

                                    {/* FEATURED Badge */}
                                    <div
                                        className="absolute left-3 top-3 rounded px-3 py-1 th-font-display text-xs tracking-[2px]"
                                        style={{ background: "var(--th-amber)", color: "#000" }}
                                    >
                                        FEATURED
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <div
                                        className="mb-2 text-[10px] font-bold uppercase tracking-[3px]"
                                        style={{ color: "var(--th-amber)" }}
                                    >
                                        {event.category__name}
                                    </div>

                                    <h3
                                        className="th-font-display mb-3 text-2xl leading-tight tracking-wide"
                                        style={{ color: "var(--th-text)" }}
                                    >
                                        {event.name}
                                    </h3>

                                    <div
                                        className="mb-5 flex flex-col gap-1 text-[12px]"
                                        style={{ color: "var(--th-muted-2)" }}
                                    >
                                        <span>
                                            📅 {formatEventDate(event.start_at).date} · {formatEventDate(event.start_at).time}
                                        </span>
                                        <span>
                                            📍 {event.venue_name}
                                        </span>
                                        <span>
                                            🎟 {event.total_quantity === null ? "Unlimited" : event.total_quantity} seats available
                                        </span>
                                    </div>

                                    <div
                                        className="flex items-center justify-between border-t border-dashed pt-4"
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
                                                price={event.starting_from}
                                                className="text-2xl"
                                            />
                                        </div>

                                        <Link
                                            href={`/events/${event.id}`}
                                            className="th-btn-primary h-10 flex items-center px-5 text-[10px]"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }



                </div>

            </div>
        </section>
    );
}