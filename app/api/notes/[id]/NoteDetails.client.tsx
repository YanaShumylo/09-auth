"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from "../../../components/NoteDetails/NoteDetails.module.css";

const NoteDetailsClient = () => {
	const params = useParams();
	const router = useRouter();
  const id = params?.id?.toString();

const { data: note, isLoading, error } = useQuery({
queryKey: ["note", id],
queryFn: () => fetchNoteById(id!),
	refetchOnMount: false,
	enabled: !!id,
});
const handleGoBack = () => {
    const isSure = confirm("Are you sure you want to go back?");
    if (isSure) {
      router.back();
    }
};
	
if (isLoading) return <p>Loading, please wait...</p>;

if (error || !note) return <p>Something went wrong.</p>;

const formattedDate = note.updatedAt
? `Updated at: ${note.updatedAt}`
: `Created at: ${note.createdAt}`;

return (
	<div className={css.container}>
		<button onClick={handleGoBack} className={css.backButton}>
        ⬅ Back
      </button>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{formattedDate}</p>
	</div>
        </div>
);
};

export default NoteDetailsClient;

