"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/mockEvents";

export default function CategoryBar() {
  const [query, setQuery] = useState("");

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="px-6 pb-6 md:px-12">
      {/* Header + Search */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2
          className="th-font-display text-2xl tracking-wide"
          style={{ color: "var(--th-text)" }}
        >
          Browse by Category
        </h2>

        <input
          type="text"
          placeholder="Search category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="th-input w-full md:w-64"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {filteredCategories.map((cat) => (
          <div
            key={cat.value}
            className="rounded px-4 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] transition-all duration-200"
            style={{
              border: "1px solid var(--th-border-2)",
              backgroundColor: "var(--th-surface-2)",
              color: "var(--th-muted-2)",
            }}
          >
            {cat.label}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div
          className="mt-4 text-[13px]"
          style={{ color: "var(--th-muted)" }}
        >
          No categories found.
        </div>
      )}
    </section>
  );
}