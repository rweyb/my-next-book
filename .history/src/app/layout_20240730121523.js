"use client";

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
          <Header />
            {children} {/* クライアントコンポーネントを使用 */}
        </RecoilRoot>
      </body>
    </html>
  );
}