import axios from "axios";
import type { NewNoteData, Note } from "../types/note";
import { handleApiError } from "./handleApiError";
import { api } from '../app/api/api';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!myKey) {
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined in .env file");
}
const myApiKey = `Bearer ${myKey}`;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common['Authorization'] = myApiKey;

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

