import { api } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { CategoryResponse } from '@/types/category.types';

export const getCategories = async (search?: string): Promise<CategoryResponse> => {
  const response = await api.get(API_ENDPOINTS.CATEGORIES.LIST, { params: { search } });
  return response.data;
};
