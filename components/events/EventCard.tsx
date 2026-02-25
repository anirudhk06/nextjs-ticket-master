import Link from 'next/link'
import React from 'react'
import AvailabilityDot from '../shared/AvailabilitySlot'
import PriceDisplay from '../shared/PriceDisplay'

const EventCard = ({ event }: { event: any }) => {
    return (
        <Link href={`/events/${event.id}`} className="th-card block overflow-hidden rounded-2xl">
            {/* Image area */}
            <div
                className="relative flex h-36 items-center justify-center text-5xl"
                style={{ background: event.bgGradient }}
            >
                {event.emoji}
                <span className={`absolute top-3 left-3`}>
                    art
                </span>
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
                    <span>📅 {event.date} · {event.time}</span>
                    <span>📍 {event.venue}, {event.city}</span>
                </div>

                {/* Footer */}
                <div
                    className="flex items-center justify-between border-t pt-3"
                    style={{ borderColor: "var(--th-border)" }}
                >
                    <PriceDisplay price={event.price} />
                    <span className="text-[10px] font-semibold" style={{ color: "var(--th-error)" }}>Sold Out</span>
                </div>
            </div>
        </Link>
    )
}

export default EventCard