import axios from "axios"
import type { Metadata } from "next";
import css from "../../../../components/CreateNote/CreateNote.module.css";
import NoteForm from '../../../../components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: "Create Note – NoteHub",
  description: "Create a new note in NoteHub.",
  openGraph: {
    title: "Create Note – NoteHub",
    description: "Create a new note in NoteHub.",
    url: "https://notehub-public.goit.study/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a note on NoteHub",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm/>
            </div>
        </main>);
}