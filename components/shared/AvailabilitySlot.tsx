"use client";

import { Event } from "@/data/mockEvents";

export default function AvailabilityDot({ event }: { event: Event }) {
  if (event.soldOut) {
    return (
      <span
        className="absolute top-3 right-3 h-2 w-2 rounded-full"
        style={{
          backgroundColor: "var(--th-error)",
          boxShadow: "0 0 8px var(--th-error)",
        }}
      />
    );
  }

  if (event.almostFull) {
    return (
      <span
        className="absolute top-3 right-3 h-2 w-2 rounded-full"
        style={{
          backgroundColor: "var(--th-amber)",
          boxShadow: "0 0 8px var(--th-amber)",
        }}
      />
    );
  }

  return (
    <span
      className="absolute top-3 right-3 h-2 w-2 rounded-full"
      style={{
        backgroundColor: "var(--th-success)",
        boxShadow: "0 0 8px var(--th-success)",
      }}
    />
  );
}