"use client";

interface Props {
  price: number | null;
  className?: string;
}

export default function PriceDisplay({ price, className = "" }: Props) {
  if (price === null) {
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