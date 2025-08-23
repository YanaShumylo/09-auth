import NotePreview from './NotePreview.client'
import { fetchNoteByIdServer } from "../../../../lib/api/serverApi";
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}
export default async function NoteModalPage({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  const dehydratedState = dehydrate(queryClient);
  
  return (
     <HydrationBoundary state={dehydratedState}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}

