"use client";

import Link from "next/link";
import { Event } from "@/data/mockEvents";
import PriceDisplay from "@/components/shared/PriceDisplay";
import AvailabilityDot from "@/components/shared/AvailabilitySlot"
import CategoryTag from "@/components/shared/CategoryTag";
import SeatInfo from "@/components/shared/SeatInfo";

export default function EventCard({ event }: { event: Event }) {
    return (
        <Link
            href={`/events/${event.id}`}
            className="th-card block overflow-hidden rounded-2xl"
        >
            {/* Image Area */}
            <div
                className="relative flex h-36 items-center justify-center text-5xl"
                style={{ background: event.bgGradient }}
            >
                {event.emoji}
                <CategoryTag type={event.categoryStyle} />
                <AvailabilityDot event={event} />
            </div>

            {/* Body */}
            <div className="p-4">
                <h3
                    className="th-font-display mb-1 text-lg leading-tight tracking-wide"
                    style={{ color: "var(--th-text)" }}
                >
                    {event.title}
                </h3>

                <div
                    className="mb-3 flex flex-col gap-1 text-[11px]"
                    style={{ color: "var(--th-muted-2)" }}
                >
                    <span>
                        📅 {event.date} · {event.time}
                    </span>
                    <span>
                        📍 {event.venue}, {event.city}
                    </span>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-between border-t pt-3"
                    style={{ borderColor: "var(--th-border)" }}
                >
                    <PriceDisplay price={event.price} />
                    {/* <SeatInfo event={event} /> */}
                </div>
            </div>
        </Link>
    );
}