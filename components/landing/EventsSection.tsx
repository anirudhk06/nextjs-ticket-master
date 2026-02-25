"use client";
import SectionHeader from "../shared/SectionHeader";
import EventCard from "../shared/EventCard";
import { useQuery } from "@tanstack/react-query";
import { getNearbyEvents, getWeekendEvents } from "@/services/event.service";

type EventType = "nearby" | "weekend";

interface Props {
  title: string;
  href: string;
  type: EventType;
}

const queryConfig: Record<EventType, { queryKey: string[]; queryFn: () => Promise<any> }> = {
  nearby: {
    queryKey: ["events", "nearby"],
    queryFn: getNearbyEvents,
  },
  weekend: {
    queryKey: ["events", "weekend"],
    queryFn: getWeekendEvents,
  },
};

export default function EventsSection({ title, href, type }: Props) {
  const { queryKey, queryFn } = queryConfig[type];

  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) {
    return (
      <section className="mb-14">
        <SectionHeader title={title} href={href} />
        <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl"
              style={{ background: "var(--th-surface)" }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-14">
        <SectionHeader title={title} href={href} />
        <div className="flex justify-center px-6 md:px-12">
          <div
            className="relative flex w-full max-w-md flex-col items-center gap-4 overflow-hidden rounded-2xl border px-8 py-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,75,75,0.05), rgba(255,150,50,0.04), transparent)",
              borderColor: "rgba(255,75,75,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Decorative glow */}
            <div
              className="pointer-events-none absolute -top-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,75,75,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Animated icon */}
            <div
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,75,75,0.12), rgba(255,150,50,0.10))",
                animation: "gentle-bounce 2.4s ease-in-out infinite",
              }}
            >
              ⚠️
            </div>

            {/* Message */}
            <div className="relative z-10">
              <h4
                className="mb-1 text-base font-semibold tracking-wide"
                style={{ color: "var(--th-text)" }}
              >
                Couldn&apos;t load events
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--th-muted-2)" }}
              >
                Something went wrong while fetching events.
                <br />
                Please check your connection and try again.
              </p>
            </div>

            {/* Retry button */}
            <button
              onClick={() => refetch()}
              className="relative z-10 mt-1 cursor-pointer rounded-full px-6 py-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ff4b4b, #ff9632)",
                color: "#fff",
                border: "none",
                boxShadow: "0 4px 20px rgba(255,75,75,0.25)",
              }}
            >
              ↻ Try Again
            </button>
          </div>
        </div>

        {/* Keyframes for the icon bounce */}
        <style jsx>{`
          @keyframes gentle-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="mb-14">
      <SectionHeader title={title} href={href} />
      <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}