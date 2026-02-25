"use client";

interface Props {
  type: string;
}

export default function CategoryTag({ type }: Props) {
  const classMap: Record<string, string> = {
    music: "th-tag-music",
    tech: "th-tag-tech",
    comedy: "th-tag-comedy",
    sports: "th-tag-sports",
    food: "th-tag-food",
    art: "th-tag-music",
    workshop: "th-tag-tech",
    wellness: "th-tag-sports",
  };

  return (
    <span
      className={`absolute top-3 left-3 ${
        classMap[type] ?? "th-tag-music"
      }`}
    >
      {type}
    </span>
  );
}