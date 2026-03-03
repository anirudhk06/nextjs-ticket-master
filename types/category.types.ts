import { Pagination } from './pagination.types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
}

export interface CategoryResponse {
  pagination: Pagination;
  result: Category[];
}
