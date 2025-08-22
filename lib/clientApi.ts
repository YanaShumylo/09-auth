'use client';
import type { NewNoteData, Note } from "../types/note";
import { handleApiError } from "./handleApiError";
import { User } from '../types/user';
import { api } from '../lib/api';

interface FetchNotesParams{
   tag?: string;
    page?: number;
    perPage?: number;
    search?: string;
}

interface NotesResponse{
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface FetchNotesApiResponse{
 notes: Note[];
  totalPages: number;
}
 
export interface RegisterRequest {
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

export interface UpdateUserRequest {
  username?: string;
}

export const fetchNotes = async ({
  tag,
  search,
  page = 1,
  perPage = 12
}: FetchNotesParams): Promise<NotesResponse> => {
  const res = await api.get<FetchNotesApiResponse>('/notes', {
    params: {
      tag,
      page,
      perPage,
      ...(search?.trim() ? { search } : {}),
            },
            });
        
  return {
    page,
    perPage,
    data: res.data.notes,
    totalPages: res.data.totalPages,
        };
    };

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    const res = await api.post<{ note: Note }>(
      "/notes",
      noteData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data.note;
  } catch (error) {
    handleApiError(error, "create note");
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
  const response = await api.delete<{ note: Note }>(`/notes/${noteId}`);
  return response.data.note;
}catch (error) {
    handleApiError(error, "delete note");
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
} catch (error) {
    handleApiError(error, "fetch note");
    throw error;
  }
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    handleApiError(error, 'logout');
    throw error;
  }
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};