
import css from "../../../../components/NotesPage/NotesPage.module.css";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from 'next';

interface NoteDetailsProps {
  params:Promise< { slug?: string[] }>;
}

export const generateMetadata = async ({ params }: NoteDetailsProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0].toLowerCase() === "all" ? undefined : slug?.[0];
  const initialData = await fetchNotes({
    tag,
    search: "",
    page: 1,
    perPage: 1,
  });

  const firstNote = initialData.data?.[0];
  const tagName = tag ?? "all";
  const title = `Title: ${tagName}`;
  const description = firstNote ? `Content: ${firstNote.content.slice(0, 30)}` : `Tag:${tagName}`;
  return {
    title,
    description,
  openGraph: {
      title,
      description,
      url: `https://notehub-public.goit.study/notes/filter/${tag ?? "all"}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
  }
}

export default async function NotesPage({ params }: NoteDetailsProps) {
  const { slug } = await params;
  const tag = slug?.[0].toLowerCase() === "all" ? undefined : slug?.[0];

  const initialData = await fetchNotes({
    tag,
    search: "",
    page: 1,
    perPage: 12,
  });
  return (
    <main className={css.appWrapper}>
      <NotesClient initialData={initialData} tag={tag}/>
    </main>
  );
}
