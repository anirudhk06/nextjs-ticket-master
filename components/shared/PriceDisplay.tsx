"use client";

interface Props {
  price: number | null | undefined;
  className?: string;
}

export default function PriceDisplay({ price, className = "" }: Props) {
  if (price === null || price === undefined) {
    return (
      <span
        className={`th-font-display text-lg ${className}`}
        style={{ color: "var(--th-success)" }}
      >
        FREE
      </span>
    );
  }

  return (
    <span
      className={`th-font-display text-lg ${className}`}
      style={{ color: "var(--th-amber)" }}
    >
      ₹{price.toLocaleString("en-IN")}
    </span>
  );
}