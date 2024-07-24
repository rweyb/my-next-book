'use client';

import { Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const fnt = Inconsolata({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Reading Recorder
        </h1>
        <Header />
        {children} {/* クライアントコンポーネントを使用 */}
      </body>
    </html>
  );
}
