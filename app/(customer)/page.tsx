"use client";

import HeroSection from "@/components/landing/HeroSection";
import CategoryBar from "@/components/landing/CategoryBar";
import EventsSection from "@/components/landing/EventsSection";
import FreeEventsBanner from "@/components/landing/FreeEventsBanner";
import CityGrid from "@/components/landing/CityGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";
import { useQuery } from "@tanstack/react-query";
import { getNearbyWeekendEvents } from "@/services/event.service";
import { NearbyWeekendResponse } from "@/types/response.types";

export default function LandingPage() {


  const { data, isLoading, error } = useQuery<NearbyWeekendResponse>({
    queryKey: ["events", "nearby", "weekend"],
    queryFn: getNearbyWeekendEvents,
  });

  const { nearest, weekend } = data || {};

  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>
      <HeroSection />
      <CategoryBar />

      <EventsSection
        title="Events Near You"
        href="/events"
        type="nearby"
        isLoading={isLoading}
        error={error}
        events={nearest || []}
      />

      <EventsSection
        title="This Weekend"
        href="/events?date=weekend"
        type="weekend"
        isLoading={isLoading}
        error={error}
        events={weekend || []}
      />

      <FreeEventsBanner />
      <CityGrid />
      <HowItWorks />
      <CTASection />
    </main>
  );
}