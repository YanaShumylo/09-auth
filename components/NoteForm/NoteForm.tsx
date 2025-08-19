"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createNote } from "../../lib/api";
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
// import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useNoteStore } from '@/lib/store/noteStore';

//   interface FormValues {
//   title: string;
//   content: string;
//   tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
// }

// interface NoteFormProps {
//   onClose: () => void;
// }

// const NoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Too short!")
//     .max(50, "Title is too long!")
//     .required("Required field"),
//   content: Yup.string().max(500, "Content is too long!"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work" , "Personal" , "Meeting" , "Shopping"])
//     .required("Required field"),
// }
// );

// const initialValues: FormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fieldId = useId();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [formData, setFormData] = useState(draft);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(draft);
  }, [draft]);
  
    const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: () => {
      alert("Failed to create note");
    },
  });

  const validate = () => {
    const newErrors: typeof errors = {};
    if (formData.title.trim().length < 3) newErrors.title = 'Minimum 3 characters';
    if (formData.title.trim().length > 10) newErrors.title = 'Maximum 10 characters';
    if (formData.content.trim().length > 50) newErrors.content = 'Maximum 50 characters';
    if (!['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(formData.tag)) {
      newErrors.tag = 'Invalid tag';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setDraft(updated);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    mutate(formData);
  };

  const handleCancel = () => {
    router.back(); 
  };
  return (
  <form onSubmit={handleSubmit} className={css.form}>
    <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-title`}>Title</label>
      <input
        id={`${fieldId}-title`}
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className={css.input}
      />
      {errors.title && <span className={css.error}>{errors.title}</span>}
    </div>

    <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-content`}>Content</label>
      <textarea
        id={`${fieldId}-content`}
        name="content"
        rows={8}
        value={formData.content}
        onChange={handleChange}
        className={css.textarea}
      />
      {errors.content && <span className={css.error}>{errors.content}</span>}
    </div>

    <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-tag`}>Tag</label>
      <select id={`${fieldId}-tag`} name="tag"
        value={formData.tag}
        onChange={handleChange} className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      {errors.tag && <span className={css.error}>{errors.tag}</span>}
    </div>

    <div className={css.actions}>
      <button type="button" className={css.cancelButton} onClick={handleCancel}>
        Cancel
      </button>
      <button
        type="submit"
        className={css.submitButton}
        disabled={isPending}
      >
        Create note
      </button>
    </div>
  </form>
);
}