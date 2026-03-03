export interface Event {
  id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  venue_address: string;
  price: number | null;
  bg_color: string;
  capacity: number | null;
  category: {
    id: string;
    name: string;
    emoji: string;
  };
}

export interface NearestWeekdayEvent {
  id: string;
  name: string;
  description: string;
  venue_name: string;
  bg_color: string;
  start_at: string;
  category__name: string;
  category__emoji: string;
  starting_from: number;
  total_quantity: number | null;
}
