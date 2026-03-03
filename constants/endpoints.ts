import { FEATURED_EVENT } from '@/data/mockEvents';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/sign-in',
    REGISTER: '/auth/sign-up',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },

  EVENTS: {
    LIST: '/events',
    NEARBY_WEEKEND: 'api/events/nearest-weekend',
    FEATURED_EVENT: 'api/events/featured',
    DETAIL: (id: string) => `/events/${id}`,
  },
  CATEGORIES: {
    LIST: 'api/categories',
  },
};
