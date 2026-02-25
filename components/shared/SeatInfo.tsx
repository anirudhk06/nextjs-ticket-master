"use client";

import { Event } from "@/data/mockEvents";

export default function SeatInfo({ event }: { event: Event }) {
  if (event.soldOut) {
    return (
      <span
        className="text-[10px] font-semibold"
        style={{ color: "var(--th-error)" }}
      >
        Sold Out
      </span>
    );
  }

  if (event.almostFull) {
    return (
      <span
        className="text-[10px] font-semibold"
        style={{ color: "var(--th-amber)" }}
      >
        Only {event.seats} left!
      </span>
    );
  }

  return (
    <span
      className="text-[10px]"
      style={{ color: "var(--th-muted)" }}
    >
      {event.seats.toLocaleString()} left
    </span>
  );
}