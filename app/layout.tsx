import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "An application designed to manage personal notes",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub — An application designed to manage personal notes",
    url: "https://notehub-public.goit.study",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
            <Header/>
            <main>
            {children}
            {modal}
            </main>
            <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};
