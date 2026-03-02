import { api } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { EventResponse } from '@/types/response.types';

export const getEvents = async () => {
  const response = await api.get<EventResponse>(API_ENDPOINTS.EVENTS.LIST);
  return response.data;
};

export const getNearbyEvents = async () => {
  const response = await api.get<EventResponse>(API_ENDPOINTS.EVENTS.NEARBY, {
    params: {
      page_size: 3,
    },
  });
  return response.data;
};

export const getWeekendEvents = async () => {
  const response = await api.get<EventResponse>(API_ENDPOINTS.EVENTS.WEEKEND, {
    params: {
      page_size: 3,
    },
  });
  return response.data;
};
