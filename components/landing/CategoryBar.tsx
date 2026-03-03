"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category.types";
import { Skeleton } from "../ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function CategoryBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", debouncedSearch],
    queryFn: () => getCategories(debouncedSearch),
  });


  const filterCategories = (query: string) => {
    setSearch(query.trim());
  }

  const categories = data?.result || [];

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
          className="th-input w-full md:w-64"
          value={search}
          onChange={(e) => filterCategories(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton
              key={i}
              className="h-8 w-24 rounded border"
              style={{
                borderColor: "var(--th-border-2)",
              }}
            />
          ))
        ) : (
          categories.map((cat: Category) => (
            <div
              key={cat.id}
              className="rounded px-4 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] transition-all duration-200 cursor-pointer hover:scale-105 hover:bg-th-surface-2"
              style={{
                border: "1px solid var(--th-border-2)",
                backgroundColor: "var(--th-surface-2)",
                color: "var(--th-muted-2)",
              }}
              title={cat.description.slice(0, 100)}
            >
              <span className="mr-0.5">
                {cat.emoji}
              </span>
              {cat.name}
            </div>
          ))
        )}
      </div>

      {!isLoading && categories.length === 0 && (
        <div
          className="mt-4 text-[13px] text-center"
          style={{ color: "var(--th-muted)" }}
        >
          No categories found.
        </div>
      )}
    </section>
  );
}