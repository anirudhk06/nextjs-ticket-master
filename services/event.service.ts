import { api } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { EventResponse, NearbyWeekendResponse } from '@/types/response.types';
import { NearestWeekdayEvent } from '@/types/event.types';

export const getEvents = async () => {
  const response = await api.get<EventResponse>(API_ENDPOINTS.EVENTS.LIST);
  return response.data;
};

export const getNearbyWeekendEvents = async () => {
  const response = await api.get<NearbyWeekendResponse>(API_ENDPOINTS.EVENTS.NEARBY_WEEKEND, {
    params: {
      page_size: 3,
    },
  });
  return response.data;
};

export const getFeaturedEvent = async () => {
  const response = await api.get<NearestWeekdayEvent>(API_ENDPOINTS.EVENTS.FEATURED_EVENT);
  return response.data;
};
