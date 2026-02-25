const ACCESS = 'access_token';
const REFRESH = 'refresh_token';

export const getAccessToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(ACCESS) : null;

export const getRefreshToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(REFRESH) : null;

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS, access);
  localStorage.setItem(REFRESH, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
};
