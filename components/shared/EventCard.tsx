"use client";

import Link from "next/link";
import { NearestWeekdayEvent } from "@/types/event.types";
import PriceDisplay from "@/components/shared/PriceDisplay";
import AvailabilityDot from "@/components/shared/AvailabilitySlot"
import CategoryTag from "@/components/shared/CategoryTag";
import { formatEventDate } from "@/utils/formatDate";

export default function EventCard({ event }: { event: NearestWeekdayEvent }) {
    return (
        <Link
            href={`/events/${event.id}`}
            className="th-card block overflow-hidden rounded-2xl"
        >
            {/* Image Area */}
            <div
                className="relative flex h-36 items-center justify-center text-5xl"
                style={{ background: event.bg_color }}
            >
                {event.category__emoji}

                <CategoryTag type={event.category__name} />
                <AvailabilityDot event={event} />
            </div>

            {/* Body */}
            <div className="p-4">
                <h3
                    className="th-font-display mb-1 text-lg leading-tight tracking-wide"
                    style={{ color: "var(--th-text)" }}
                >
                    {event.name}
                </h3>

                <div
                    className="mb-3 flex flex-col gap-1 text-[11px]"
                    style={{ color: "var(--th-muted-2)" }}
                >
                    <span>
                        📅 {formatEventDate(event.start_at).date} · {formatEventDate(event.start_at).time}
                    </span>
                    <span>
                        📍 {event.venue_name}
                    </span>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-between border-t pt-3"
                    style={{ borderColor: "var(--th-border)" }}
                >
                    <PriceDisplay price={event.starting_from} />
                </div>
            </div>
        </Link>
    );
}