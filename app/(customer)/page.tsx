"use client";

import HeroSection from "@/components/landing/HeroSection";
import CategoryBar from "@/components/landing/CategoryBar";
import EventsSection from "@/components/landing/EventsSection";
import FreeEventsBanner from "@/components/landing/FreeEventsBanner";
import CityGrid from "@/components/landing/CityGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>
      <HeroSection />
      <CategoryBar />

      <EventsSection
        title="Events Near You"
        href="/events"
        type="nearby"
      />

      <EventsSection
        title="This Weekend"
        href="/events?date=weekend"
        type="weekend"
      />

      <FreeEventsBanner />
      <CityGrid />
      <HowItWorks />
      <CTASection />
    </main>
  );
}