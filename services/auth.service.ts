import { api } from '@/lib/api/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { AuthResponse } from '@/types/auth.types';
import { LoginFormData, RefreshFormData, RegisterFormData } from '@/schemas/auth.schema';

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

export const registerUser = async (data: RegisterFormData): Promise<AuthResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

export const refreshToken = async (data: RefreshFormData): Promise<AuthResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, data);
  return response.data;
};

export const getUser = async (): Promise<AuthResponse> => {
  const response = await api.get(API_ENDPOINTS.AUTH.ME);
  return response.data;
};
