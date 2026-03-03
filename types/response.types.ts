import { Pagination } from './pagination.types';
import { Event, NearestWeekdayEvent } from './event.types';

export interface EventResponse {
  events: Event[];
  pagination: Pagination;
}

export interface NearbyWeekendResponse {
  nearest: NearestWeekdayEvent[];
  weekend: NearestWeekdayEvent[];
}
