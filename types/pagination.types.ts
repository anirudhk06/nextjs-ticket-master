export interface Pagination {
  next: number | null;
  previous: number | null;
  current: number;
  total_page: number;
  count: number;
  results_count: number;
}
