import { Pagination } from './pagination.types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface CategoryResponse {
  pagination: Pagination;
  result: Category[];
}
