"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import css from "../../../../components/NotesPage/NotesPage.module.css";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
// import Modal from "../../../../components/Modal/Modal";
// import NoteForm from "../../../../components/NoteForm/NoteForm";
import{ fetchNotes } from "../../../../lib/api";
import Loader from "../../../../app/loading";
import ErrorMessage from "../../../../components/Error/Error";
import Link from 'next/link';

interface NotesClientProps {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
  tag: string | undefined;
} 

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
 
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const isInitial = currentPage === 1 && search === "";

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ["notes", tag, currentPage, debouncedSearch],
    queryFn: () => fetchNotes({
      tag,
      search: debouncedSearch,
      page: currentPage,
      perPage: 12,
    }),
    placeholderData: (previousData) => previousData,
    initialData: isInitial ? initialData : undefined,
});
  // const handleOpenModal = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);

  const notes = data?.data ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {/* <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button> */}
        <Link href={'/notes/action/create'} className={css.button}>Create note + </Link>
      </header>

      <Toaster position="top-left" />

      {(isLoading || isFetching) && <Loader/>}

      {isError && <ErrorMessage error={error as Error} />}
      
      {!isLoading && !isFetching && notes.length === 0 && (
        <p className={css.empty}>No notes found.</p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
     
      {/* {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )} */}
    </div>
  );
}