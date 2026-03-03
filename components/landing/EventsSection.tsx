"use client";
import SectionHeader from "../shared/SectionHeader";
import EventCard from "../shared/EventCard";
import { Skeleton } from "../ui/skeleton";
import { NearestWeekdayEvent } from "@/types/event.types";

interface Props {
  title: string;
  href: string;
  type: string;
  isLoading: boolean;
  error: Error | null;
  events: NearestWeekdayEvent[];
}

export default function EventsSection({ title, href, type, isLoading, error, events }: Props) {


  if (isLoading) {
    return (
      <section className="mb-14">
        <SectionHeader title={title} href={href} />
        <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="th-card overflow-hidden rounded-2xl border"
              style={{
                backgroundColor: "var(--th-surface-2)",
                borderColor: "var(--th-border-2)",
              }}
            >
              {/* Image Area Skeleton */}
              <Skeleton className="h-36 w-full rounded-none" style={{
                borderColor: "var(--th-border-2)",
              }} />

              {/* Body Skeleton */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <Skeleton className="h-5 w-3/4 rounded-md" style={{
                  borderColor: "var(--th-border-2)",
                }} />

                {/* Info Lines */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-1/2 rounded-md" style={{
                    borderColor: "var(--th-border-2)",
                  }} />
                  <Skeleton className="h-3 w-2/3 rounded-md" style={{
                    borderColor: "var(--th-border-2)",
                  }} />
                </div>

                {/* Footer divider */}
                <div className="border-t pt-3" style={{ borderColor: "var(--th-border-2)" }}>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-12 rounded-md" style={{
                      borderColor: "var(--th-border-2)",
                    }} />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    );
  }

  if (error || events.length == 0) {
    return (
      <section className="mb-14">
        <SectionHeader title={title} href={href} />
        <div className="px-6 md:px-12">
          <div
            className="mt-4 text-[13px] text-center"
            style={{ color: "var(--th-muted)" }}
          >
            No events found.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-14">
      <SectionHeader title={title} href={href} />
      <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        {events.map((event: NearestWeekdayEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}