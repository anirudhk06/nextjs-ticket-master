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
  };
}
