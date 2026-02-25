"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, Suspense } from "react";

// ─── Types ────────────────────────────────────────────
interface Event {
  id: string;
  emoji: string;
  category: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number | null;
  seats: number;
  almostFull: boolean;
  soldOut: boolean;
  bgGradient: string;
  dateObj: Date;
}

type SortOption = "date" | "price-asc" | "price-desc" | "popularity";

// ─── Mock Data ────────────────────────────────────────
const ALL_EVENTS: Event[] = [
  { id: "1", emoji: "🎸", category: "music", title: "Arijit Singh Live Tour 2026", date: "Mar 15, 2026", time: "7:00 PM", venue: "Nashik Grounds", city: "Nashik", price: 799, seats: 4200, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#1a0022,#3d0050)", dateObj: new Date("2026-03-15") },
  { id: "2", emoji: "💻", category: "tech", title: "DevFest Nashik 2026", date: "Feb 22, 2026", time: "10:00 AM", venue: "Nashik IT Park", city: "Nashik", price: null, seats: 48, almostFull: true, soldOut: false, bgGradient: "linear-gradient(135deg,#001a22,#003d50)", dateObj: new Date("2026-02-22") },
  { id: "3", emoji: "😂", category: "comedy", title: "Stand Up Night with Zakir Khan", date: "Mar 2, 2026", time: "8:00 PM", venue: "Rajiv Gandhi Bhavan", city: "Nashik", price: 499, seats: 820, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#1a1500,#3d3200)", dateObj: new Date("2026-03-02") },
  { id: "4", emoji: "🍕", category: "food", title: "Nashik Street Food Carnival", date: "Feb 21, 2026", time: "12:00 PM", venue: "Central Park", city: "Nashik", price: null, seats: 999, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#1a0800,#3d1800)", dateObj: new Date("2026-02-21") },
  { id: "5", emoji: "🤖", category: "tech", title: "AI & Future of Work Summit", date: "Feb 22, 2026", time: "9:00 AM", venue: "Hotel Panchavati", city: "Nashik", price: 1199, seats: 20, almostFull: true, soldOut: false, bgGradient: "linear-gradient(135deg,#001a22,#003d50)", dateObj: new Date("2026-02-22") },
  { id: "6", emoji: "🎭", category: "art", title: "Theatre Fest: One Night Only", date: "Feb 23, 2026", time: "6:30 PM", venue: "Town Hall", city: "Nashik", price: 299, seats: 150, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#1a0022,#2d1b4e)", dateObj: new Date("2026-02-23") },
  { id: "7", emoji: "⚽", category: "sports", title: "Pro Kabaddi Finals", date: "Mar 10, 2026", time: "6:00 PM", venue: "Sports Complex", city: "Nashik", price: 349, seats: 1200, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#001a08,#003d18)", dateObj: new Date("2026-03-10") },
  { id: "8", emoji: "🧘", category: "wellness", title: "International Yoga Day Retreat", date: "Mar 20, 2026", time: "6:00 AM", venue: "Sula Vineyards", city: "Nashik", price: 599, seats: 80, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#001a08,#003d18)", dateObj: new Date("2026-03-20") },
  { id: "9", emoji: "🎵", category: "music", title: "Classical Fusion Night", date: "Mar 5, 2026", time: "7:30 PM", venue: "Kalaram Temple Grounds", city: "Nashik", price: 199, seats: 0, almostFull: false, soldOut: true, bgGradient: "linear-gradient(135deg,#1a0022,#3d0050)", dateObj: new Date("2026-03-05") },
  { id: "10", emoji: "📚", category: "workshop", title: "Full Stack Bootcamp Weekend", date: "Mar 8, 2026", time: "9:00 AM", venue: "Nashik Incubation Hub", city: "Nashik", price: 1499, seats: 30, almostFull: true, soldOut: false, bgGradient: "linear-gradient(135deg,#001a22,#003d50)", dateObj: new Date("2026-03-08") },
  { id: "11", emoji: "🎤", category: "music", title: "Indie Music Showcase", date: "Feb 28, 2026", time: "6:00 PM", venue: "The Loft Bar", city: "Pune", price: 249, seats: 200, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#1a0022,#3d0050)", dateObj: new Date("2026-02-28") },
  { id: "12", emoji: "🏋️", category: "sports", title: "Fitness Fest 2026", date: "Mar 14, 2026", time: "7:00 AM", venue: "Balewadi Stadium", city: "Pune", price: null, seats: 500, almostFull: false, soldOut: false, bgGradient: "linear-gradient(135deg,#001a08,#003d18)", dateObj: new Date("2026-03-14") },
];

const CATEGORIES = [
  { label: "Music", value: "music" },
  { label: "Tech", value: "tech" },
  { label: "Comedy", value: "comedy" },
  { label: "Sports", value: "sports" },
  { label: "Food", value: "food" },
  { label: "Workshop", value: "workshop" },
  { label: "Art", value: "art" },
  { label: "Wellness", value: "wellness" },
];

const CITIES = ["Nashik", "Pune", "Nagpur", "Aurangabad", "Mumbai"];

const DATE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "This Weekend", value: "weekend" },
  { label: "This Month", value: "month" },
];

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Under ₹500", value: "under500" },
  { label: "₹500 – ₹1,500", value: "500-1500" },
  { label: "Above ₹1,500", value: "above1500" },
];

// ─── Helpers ──────────────────────────────────────────
function categoryTagClass(cat: string) {
  const map: Record<string, string> = {
    music: "th-tag-music",
    tech: "th-tag-tech",
    comedy: "th-tag-comedy",
    sports: "th-tag-sports",
    food: "th-tag-food",
    workshop: "th-tag-tech",
    art: "th-tag-music",
    wellness: "th-tag-sports",
  };
  return map[cat] ?? "th-tag-music";
}

function PriceDisplay({ price }: { price: number | null }) {
  if (price === null)
    return <span className="th-font-display text-xl" style={{ color: "var(--th-success)" }}>FREE</span>;
  return <span className="th-font-display text-xl" style={{ color: "var(--th-amber)" }}>₹{price.toLocaleString("en-IN")}</span>;
}

function AvailabilityDot({ event }: { event: Event }) {
  if (event.soldOut)
    return <span className="absolute top-3 right-3 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--th-error)", boxShadow: "0 0 8px var(--th-error)" }} />;
  if (event.almostFull)
    return <span className="absolute top-3 right-3 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--th-amber)", boxShadow: "0 0 8px var(--th-amber)" }} />;
  return <span className="absolute top-3 right-3 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--th-success)", boxShadow: "0 0 8px var(--th-success)" }} />;
}

// ─── Event Card (List Style) ──────────────────────────
function EventListCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex overflow-hidden rounded-xl transition-all duration-200"
      style={{
        background: "var(--th-card)",
        border: "1px solid var(--th-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--th-amber)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--th-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex w-28 shrink-0 items-center justify-center text-4xl sm:w-32"
        style={{ background: event.bgGradient }}
      >
        {event.emoji}
        <AvailabilityDot event={event} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={categoryTagClass(event.category)}>{event.category}</span>
            {event.soldOut && (
              <span className="th-badge-error text-[9px]">Sold Out</span>
            )}
            {event.almostFull && !event.soldOut && (
              <span className="th-badge-amber text-[9px]">Almost Full</span>
            )}
          </div>
          <h3
            className="th-font-display mb-1 text-lg leading-tight tracking-wide"
            style={{ color: "var(--th-text)" }}
          >
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: "var(--th-muted-2)" }}>
            <span>📅 {event.date} · {event.time}</span>
            <span>📍 {event.venue}, {event.city}</span>
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-between border-t pt-3"
          style={{ borderColor: "var(--th-border)" }}
        >
          <PriceDisplay price={event.price} />
          {!event.soldOut && (
            <span className="text-[10px] font-semibold" style={{ color: event.almostFull ? "var(--th-amber)" : "var(--th-muted)" }}>
              {event.almostFull ? `Only ${event.seats} left!` : `${event.seats.toLocaleString()} seats`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Filter Checkbox ──────────────────────────────────
function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="flex cursor-pointer items-center gap-3 py-[6px] text-[13px] transition-colors duration-150"
      style={{ color: checked ? "var(--th-amber)" : "var(--th-muted-2)" }}
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px]"
        style={{
          border: `1px solid ${checked ? "var(--th-amber)" : "var(--th-border-2)"}`,
          background: checked ? "var(--th-amber)" : "var(--th-surface)",
          color: "#000",
        }}
      >
        {checked ? "✓" : ""}
      </span>
      {label}
    </label>
  );
}

// ─── Active Filter Pill ───────────────────────────────
function ActivePill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="flex items-center gap-2 rounded px-3 py-1 text-[11px] font-semibold"
      style={{
        background: "var(--th-amber-dim)",
        border: "1px solid rgba(245,166,35,0.25)",
        color: "var(--th-amber)",
      }}
    >
      {label}
      <button
        onClick={onRemove}
        className="opacity-60 transition-opacity hover:opacity-100"
        style={{ color: "var(--th-amber)" }}
      >
        ✕
      </button>
    </span>
  );
}

// ─── Main Events Content ──────────────────────────────
function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL params
  const urlCategory = searchParams.get("category") ?? "";
  const urlCity = searchParams.get("city") ?? "";
  const urlDate = searchParams.get("date") ?? "";
  const urlPrice = searchParams.get("price") ?? "";
  const urlQ = searchParams.get("q") ?? "";

  // Filter state
  const [search, setSearch] = useState(urlQ);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : []
  );
  const [selectedCities, setSelectedCities] = useState<string[]>(
    urlCity ? [urlCity] : []
  );
  const [selectedDates, setSelectedDates] = useState<string[]>(
    urlDate ? [urlDate] : []
  );
  const [selectedPrices, setSelectedPrices] = useState<string[]>(
    urlPrice ? [urlPrice] : []
  );
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Toggle helper
  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  // Filtered + sorted events
  const filteredEvents = useMemo(() => {
    let result = [...ALL_EVENTS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((e) => selectedCategories.includes(e.category));
    }

    // City
    if (selectedCities.length > 0) {
      result = result.filter((e) => selectedCities.includes(e.city));
    }

    // Price
    if (selectedPrices.length > 0) {
      result = result.filter((e) => {
        return selectedPrices.some((p) => {
          if (p === "free") return e.price === null;
          if (p === "under500") return e.price !== null && e.price < 500;
          if (p === "500-1500") return e.price !== null && e.price >= 500 && e.price <= 1500;
          if (p === "above1500") return e.price !== null && e.price > 1500;
          return true;
        });
      });
    }

    // Date
    if (selectedDates.length > 0) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      result = result.filter((e) => {
        return selectedDates.some((d) => {
          const eventDate = new Date(e.dateObj.getFullYear(), e.dateObj.getMonth(), e.dateObj.getDate());
          if (d === "today") return eventDate.getTime() === today.getTime();
          if (d === "weekend") {
            const day = eventDate.getDay();
            return day === 0 || day === 6;
          }
          if (d === "month") {
            return eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear();
          }
          return true;
        });
      });
    }

    // Sort
    if (sortBy === "date") result.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
    if (sortBy === "price-asc") result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === "price-desc") result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sortBy === "popularity") result.sort((a, b) => b.seats - a.seats);

    return result;
  }, [search, selectedCategories, selectedCities, selectedDates, selectedPrices, sortBy]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedCities([]);
    setSelectedDates([]);
    setSelectedPrices([]);
    setSearch("");
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedCities.length > 0 ||
    selectedDates.length > 0 ||
    selectedPrices.length > 0 ||
    search.trim() !== "";

  // Sidebar filter panel (reused for desktop + mobile)
  const FilterPanel = () => (
    <div className="flex flex-col gap-6">

      {/* Clear All */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-md py-2 text-[11px] font-bold uppercase tracking-[2px] transition-all duration-200"
          style={{
            border: "1px solid var(--th-border-2)",
            color: "var(--th-error)",
            background: "rgba(233,69,96,0.06)",
          }}
        >
          Clear All Filters
        </button>
      )}

      {/* Category */}
      <div>
        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          Category
        </div>
        {CATEGORIES.map((cat) => (
          <FilterCheckbox
            key={cat.value}
            label={cat.label}
            checked={selectedCategories.includes(cat.value)}
            onChange={() => toggle(selectedCategories, cat.value, setSelectedCategories)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="th-divider" />

      {/* City */}
      <div>
        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          City
        </div>
        {CITIES.map((city) => (
          <FilterCheckbox
            key={city}
            label={city}
            checked={selectedCities.includes(city)}
            onChange={() => toggle(selectedCities, city, setSelectedCities)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="th-divider" />

      {/* Date */}
      <div>
        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          Date
        </div>
        {DATE_OPTIONS.map((opt) => (
          <FilterCheckbox
            key={opt.value}
            label={opt.label}
            checked={selectedDates.includes(opt.value)}
            onChange={() => toggle(selectedDates, opt.value, setSelectedDates)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="th-divider" />

      {/* Price */}
      <div>
        <div
          className="mb-3 text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: "var(--th-muted)" }}
        >
          Price
        </div>
        {PRICE_OPTIONS.map((opt) => (
          <FilterCheckbox
            key={opt.value}
            label={opt.label}
            checked={selectedPrices.includes(opt.value)}
            onChange={() => toggle(selectedPrices, opt.value, setSelectedPrices)}
          />
        ))}
      </div>

    </div>
  );

  return (
    <main style={{ backgroundColor: "var(--th-bg)", minHeight: "100vh" }}>

      {/* ── Page Header ── */}
      <div
        className="border-b px-6 py-8 md:px-12"
        style={{ borderColor: "var(--th-border)" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px]"
            style={{ color: "var(--th-muted)" }}
          >
            <Link href="/" style={{ color: "var(--th-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--th-amber)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--th-muted)")}
            >
              Home
            </Link>
            <span>/</span>
            <span style={{ color: "var(--th-amber)" }}>Events</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1
              className="th-font-display text-5xl tracking-wide md:text-6xl"
              style={{ color: "var(--th-text)" }}
            >
              ALL EVENTS
            </h1>

            {/* Search bar */}
            <div className="flex gap-2 sm:w-80">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="th-input flex-1 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12">

        {/* ── Active Filters Row ── */}
        {hasFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-[2px]"
              style={{ color: "var(--th-muted)" }}
            >
              Active:
            </span>
            {search && (
              <ActivePill label={`"${search}"`} onRemove={() => setSearch("")} />
            )}
            {selectedCategories.map((c) => (
              <ActivePill key={c} label={c} onRemove={() => toggle(selectedCategories, c, setSelectedCategories)} />
            ))}
            {selectedCities.map((c) => (
              <ActivePill key={c} label={c} onRemove={() => toggle(selectedCities, c, setSelectedCities)} />
            ))}
            {selectedDates.map((d) => (
              <ActivePill key={d} label={DATE_OPTIONS.find((o) => o.value === d)?.label ?? d} onRemove={() => toggle(selectedDates, d, setSelectedDates)} />
            ))}
            {selectedPrices.map((p) => (
              <ActivePill key={p} label={PRICE_OPTIONS.find((o) => o.value === p)?.label ?? p} onRemove={() => toggle(selectedPrices, p, setSelectedPrices)} />
            ))}
          </div>
        )}

        <div className="flex gap-8">

          {/* ── Sidebar (Desktop) ── */}
          <aside
            className="hidden w-56 shrink-0 lg:block"
          >
            <div
              className="sticky top-24 rounded-2xl p-5"
              style={{
                background: "var(--th-surface-2)",
                border: "1px solid var(--th-border)",
              }}
            >
              <div
                className="th-font-display mb-5 border-b pb-3 text-sm tracking-[3px]"
                style={{
                  color: "var(--th-muted-2)",
                  borderColor: "var(--th-border)",
                }}
              >
                FILTERS
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <div
                className="text-[13px] font-medium"
                style={{ color: "var(--th-muted-2)" }}
              >
                <span className="th-font-display text-2xl" style={{ color: "var(--th-text)" }}>
                  {filteredEvents.length}
                </span>{" "}
                events found
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[1px] lg:hidden"
                  style={{
                    border: "1px solid var(--th-border-2)",
                    color: "var(--th-muted-2)",
                    background: "var(--th-surface-2)",
                  }}
                >
                  ⚙ Filters
                  {hasFilters && (
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: "var(--th-amber)", color: "#000" }}
                    >
                      {selectedCategories.length + selectedCities.length + selectedDates.length + selectedPrices.length}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-md px-3 py-2 text-[12px] font-semibold outline-none"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border-2)",
                    color: "var(--th-muted-2)",
                    cursor: "pointer",
                  }}
                >
                  <option value="date" style={{ background: "var(--th-surface)" }}>Sort: Nearest Date</option>
                  <option value="price-asc" style={{ background: "var(--th-surface)" }}>Sort: Price ↑</option>
                  <option value="price-desc" style={{ background: "var(--th-surface)" }}>Sort: Price ↓</option>
                  <option value="popularity" style={{ background: "var(--th-surface)" }}>Sort: Popularity</option>
                </select>
              </div>
            </div>

            {/* Events list */}
            {filteredEvents.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredEvents.map((event) => (
                  <EventListCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              // Empty State
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
                style={{
                  background: "var(--th-surface-2)",
                  border: "1px solid var(--th-border)",
                }}
              >
                <div className="mb-4 text-6xl opacity-30">🎟️</div>
                <h3
                  className="th-font-display mb-2 text-2xl tracking-wide"
                  style={{ color: "var(--th-text)" }}
                >
                  NO EVENTS FOUND
                </h3>
                <p
                  className="mb-6 max-w-xs text-[13px]"
                  style={{ color: "var(--th-muted-2)" }}
                >
                  Try adjusting your filters or search for something else.
                </p>
                <button
                  onClick={clearAll}
                  className="th-btn-primary px-6 py-2 text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredEvents.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-[13px] font-semibold transition-all duration-150"
                    style={{
                      background: page === 1 ? "var(--th-amber)" : "var(--th-surface-2)",
                      border: `1px solid ${page === 1 ? "var(--th-amber)" : "var(--th-border-2)"}`,
                      color: page === 1 ? "#000" : "var(--th-muted-2)",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="flex h-9 items-center justify-center rounded-md px-3 text-[13px] font-semibold"
                  style={{
                    background: "var(--th-surface-2)",
                    border: "1px solid var(--th-border-2)",
                    color: "var(--th-muted-2)",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {mobileFiltersOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl p-6 lg:hidden"
            style={{
              background: "var(--th-surface)",
              border: "1px solid var(--th-border-2)",
            }}
          >
            {/* Drag handle */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full" style={{ background: "var(--th-border-2)" }} />

            <div className="mb-5 flex items-center justify-between">
              <h3
                className="th-font-display text-xl tracking-[2px]"
                style={{ color: "var(--th-text)" }}
              >
                FILTERS
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-[20px]"
                style={{ color: "var(--th-muted-2)" }}
              >
                ✕
              </button>
            </div>

            <FilterPanel />

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="th-btn-primary mt-6 w-full py-3 text-sm"
            >
              Show {filteredEvents.length} Events
            </button>
          </div>
        </>
      )}

    </main>
  );
}

// ─── Page Export (wrapped in Suspense for useSearchParams) ──
export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ background: "var(--th-bg)" }}
        >
          <div
            className="th-font-display text-2xl tracking-[4px]"
            style={{ color: "var(--th-amber)" }}
          >
            LOADING...
          </div>
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}