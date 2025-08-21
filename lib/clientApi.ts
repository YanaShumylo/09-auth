'use client';

import { User } from '../types/user';
import { api } from '../app/api/api';

export interface RegisterRequest {
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

export interface CheckSessionRequest {
  success: boolean;
};

export interface UpdateUserRequest {
  username?: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const logout = async (): Promise<void> => {
await api.post('/auth/logout')};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>('/user/me');
  return res.data;
};

