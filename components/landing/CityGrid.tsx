"use client";
import Link from "next/link";
import { useState } from "react";

const cities = [
  "Nashik",
  "Pune",
  "Nagpur",
  "Aurangabad",
  "Kolhapur",
  "Mumbai",
];

export default function CityGrid() {
  const [query, setQuery] = useState("");

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="mb-14 px-6 md:px-12">
      {/* Header + Search */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2
          className="th-font-display text-3xl tracking-wide"
          style={{ color: "var(--th-text)" }}
        >
          Browse by City
        </h2>

        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="th-input w-full md:w-64"
        />
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {filteredCities.map((city) => (
          <Link
            key={city}
            href={`/events?city=${city}`}
            className="flex flex-col items-center gap-2 rounded-xl py-4 text-center transition-all duration-200"
            style={{
              background: "var(--th-surface-2)",
              border: "1px solid var(--th-border)",
            }}
          >
            <span className="text-2xl">🏙️</span>

            <span
              className="text-[12px] font-semibold uppercase tracking-[1px]"
              style={{ color: "var(--th-muted-2)" }}
            >
              {city}
            </span>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCities.length === 0 && (
        <div
          className="mt-6 text-center text-[13px]"
          style={{ color: "var(--th-muted)" }}
        >
          No cities found.
        </div>
      )}
    </section>
  );
}