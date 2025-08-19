"use client";
import Link from "next/link";
import css from "./SidebarNotes.module.css";

const FIXED_TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes () {
    
    return (
     <ul className={css.menuList}>
            {FIXED_TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
             <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
            </Link>
             </li>
            ))}
    </ul>
    );
};