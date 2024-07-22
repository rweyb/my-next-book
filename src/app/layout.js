'use client';

import { Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";

const fnt = Inconsolata({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
      <RecoilRoot>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Reading Recorder
        </h1>
        <Header>{children}</Header> {/* クライアントコンポーネントを使用 */}
        </RecoilRoot>
      </body>
    </html>
  );
}
