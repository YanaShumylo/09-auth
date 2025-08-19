import { fetchNoteById } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: NoteDetailsProps): Promise<Metadata> => {
  const { id } = await params
  const data = await fetchNoteById(id)
  return {
    title: data.title.slice(0, 10),
    description: data.content.slice(0, 15),
    openGraph: {
      title: data.title.slice(0, 10),
      description: data.content.slice(0, 15),
      url: `https://notehub-public.goit.study/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'article',
    },
  }
}


export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })
 
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}




