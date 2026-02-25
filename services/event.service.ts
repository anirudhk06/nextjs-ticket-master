import { api } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/constants/endpoints';

export const getEvents = async () => {
  const response = await api.get(API_ENDPOINTS.EVENTS.LIST);
  return response.data;
};

export const getNearbyEvents = async () => {
  const response = await api.get(API_ENDPOINTS.EVENTS.NEARBY);
  return response.data;
};

export const getWeekendEvents = async () => {
  const response = await api.get(API_ENDPOINTS.EVENTS.WEEKEND);
  return response.data;
};
