"use client";

import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function SectionHeader({ title, href }: Props) {
  return (
    <div className="mb-5 flex items-baseline justify-between px-6 md:px-12">
      <h2
        className="th-font-display text-3xl tracking-wide"
        style={{ color: "var(--th-text)" }}
      >
        {title}
      </h2>

      <Link
        href={href}
        className="text-[11px] font-semibold uppercase tracking-[2px]"
        style={{ color: "var(--th-amber)" }}
      >
        View All →
      </Link>
    </div>
  );
}