// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Event {
  id: string;
  emoji: string;
  category: string;
  categoryStyle: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number | null; // null = free
  seats: number;
  almostFull: boolean;
  soldOut: boolean;
  bgGradient: string;
}

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────

export const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "🎵 Music", value: "music" },
  { label: "💻 Tech", value: "tech" },
  { label: "😂 Comedy", value: "comedy" },
  { label: "⚽ Sports", value: "sports" },
  { label: "🍕 Food", value: "food" },
  { label: "📚 Workshop", value: "workshop" },
  { label: "🎨 Art", value: "art" },
  { label: "🧘 Wellness", value: "wellness" },
];

// ─────────────────────────────────────────────
// Cities
// ─────────────────────────────────────────────

export const CITIES = [
  "All Cities",
  "Nashik",
  "Pune",
  "Nagpur",
  "Aurangabad",
  "Mumbai",
];

// ─────────────────────────────────────────────
// Featured Event
// ─────────────────────────────────────────────

export const FEATURED_EVENT: Event = {
  id: "1",
  emoji: "🎸",
  category: "Music · Live Concert",
  categoryStyle: "music",
  title: "Arijit Singh Live Tour 2026",
  date: "March 15, 2026",
  time: "7:00 PM",
  venue: "Nashik Grounds",
  city: "Nashik",
  price: 799,
  seats: 4200,
  almostFull: false,
  soldOut: false,
  bgGradient: "linear-gradient(135deg, #1a0022, #3d0050, #1a0800)",
};

// ─────────────────────────────────────────────
// Events Near You
// ─────────────────────────────────────────────

export const NEARBY_EVENTS: Event[] = [
  {
    id: "2",
    emoji: "🎸",
    category: "music",
    categoryStyle: "music",
    title: "Arijit Singh Live Tour 2026",
    date: "Mar 15, 2026",
    time: "7:00 PM",
    venue: "Nashik Grounds",
    city: "Nashik",
    price: 799,
    seats: 4200,
    almostFull: false,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #1a0022, #3d0050)",
  },
  {
    id: "3",
    emoji: "💻",
    category: "tech",
    categoryStyle: "tech",
    title: "DevFest Nashik 2026",
    date: "Feb 22, 2026",
    time: "10:00 AM",
    venue: "Nashik IT Park",
    city: "Nashik",
    price: null,
    seats: 48,
    almostFull: true,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #001a22, #003d50)",
  },
  {
    id: "4",
    emoji: "😂",
    category: "comedy",
    categoryStyle: "comedy",
    title: "Stand Up Night with Zakir Khan",
    date: "Mar 2, 2026",
    time: "8:00 PM",
    venue: "Rajiv Gandhi Bhavan",
    city: "Nashik",
    price: 499,
    seats: 820,
    almostFull: false,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #1a1500, #3d3200)",
  },
];

// ─────────────────────────────────────────────
// Weekend Events
// ─────────────────────────────────────────────

export const WEEKEND_EVENTS: Event[] = [
  {
    id: "5",
    emoji: "🍕",
    category: "food",
    categoryStyle: "food",
    title: "Nashik Street Food Carnival",
    date: "Feb 21–22, 2026",
    time: "12:00 PM",
    venue: "Central Park",
    city: "Nashik",
    price: null,
    seats: 999,
    almostFull: false,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #1a0800, #3d1800)",
  },
  {
    id: "6",
    emoji: "🤖",
    category: "tech",
    categoryStyle: "tech",
    title: "AI & Future of Work Summit",
    date: "Feb 22, 2026",
    time: "9:00 AM",
    venue: "Hotel Panchavati",
    city: "Nashik",
    price: 1199,
    seats: 20,
    almostFull: true,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #001a22, #003d50)",
  },
  {
    id: "7",
    emoji: "🎭",
    category: "art",
    categoryStyle: "art",
    title: "Theatre Fest: One Night Only",
    date: "Feb 23, 2026",
    time: "6:30 PM",
    venue: "Town Hall",
    city: "Nashik",
    price: 299,
    seats: 150,
    almostFull: false,
    soldOut: false,
    bgGradient: "linear-gradient(135deg, #1a0022, #3d0050)",
  },
];