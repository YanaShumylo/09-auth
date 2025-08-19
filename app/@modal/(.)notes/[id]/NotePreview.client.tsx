'use client';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import css from "../../../../components/NotePreview/NotePreview.module.css";

type Props = {
  id: string;
 };

export default function NotePreview({ id }: Props) {
const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.loading}>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.error}>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>Close</button>
      <div className={css.container}>
                <div className={css.item}>
        <div className={css.header}>
            <h2 className={css.header}> Title: {note.title}</h2>
                    </div>
        <p className={css.content}><span>Id:</span> {note.id}</p>
        <p className={css.content}><span>Content:</span> {note.content}</p>
        <p className={css.tag}><span>Tag:</span> {note.tag || '—'}</p>
        <p className={css.date}><span>Created at:</span> {new Date(note.createdAt).toLocaleString()}</p>
        </div>
        </div>
    </Modal>
  );
}