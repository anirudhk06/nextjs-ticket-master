import { Pagination } from './pagination.types';
import { Event } from './event.types';

export interface EventResponse {
  events: Event[];
  pagination: Pagination;
}
