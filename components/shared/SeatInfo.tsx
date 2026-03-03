"use client";

import { NearestWeekdayEvent } from "@/types/event.types";

export default function SeatInfo({ event }: { event: NearestWeekdayEvent }) {
  // if (event.soldOut) {
  //   return (
  //     <span
  //       className="text-[10px] font-semibold"
  //       style={{ color: "var(--th-error)" }}
  //     >
  //       Sold Out
  //     </span>
  //   );
  // }

  // if (event.almostFull) {
  //   return (
  //     <span
  //       className="text-[10px] font-semibold"
  //       style={{ color: "var(--th-amber)" }}
  //     >
  //       Only {event.seats} left!
  //     </span>
  //   );
  // }

  return (
    <span
      className="text-[10px]"
      style={{ color: "var(--th-muted)" }}
    >
      {event.total_quantity} left
    </span>
  );
}