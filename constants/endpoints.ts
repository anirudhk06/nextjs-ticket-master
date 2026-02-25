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
    NEARBY: '/events?type=nearby',
    WEEKEND: '/events?type=weekend',
    DETAIL: (id: string) => `/events/${id}`,
  },
};
