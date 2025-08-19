'use client';

import css from "./Error.module.css";

type Props = { error: Error; };

export default function ErrorMessage ({ error }: Props)  {
  return (<p className={css.text}>Could not fetch notes. {error.message}</p>);
}
