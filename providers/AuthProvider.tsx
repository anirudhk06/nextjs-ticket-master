"use client"
import { getAccessToken } from '@/lib/api/tokenService';
import { getUser } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = getAccessToken();

  const { user, login, logout } = useAuthStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', token],
    queryFn: () => getUser(),
    enabled: !!token,
  })


  useEffect(() => {
    if (!token) {
      logout();
    } else {
      if (!isLoading && data) {
        login({
          email: data.user.email,
          user_id: data.user.user_id,
        }, token, token)
      }
      if (!isLoading && error) {
        logout();
      }
    }
  }, [data, isLoading, error])

  return <div>{children}</div>;
}
