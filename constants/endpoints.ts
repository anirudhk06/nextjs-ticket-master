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
    NEARBY: 'api/events?type=nearby',
    WEEKEND: 'api/events?type=weekend',
    DETAIL: (id: string) => `/events/${id}`,
  },
  CATEGORIES: {
    LIST: 'api/categories',
  },
};
