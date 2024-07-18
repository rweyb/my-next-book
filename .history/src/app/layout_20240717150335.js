import Link from 'next/link';
import { Inconsolata } from "next/font/google";
import "./globals.css";

const fnt = Inconsolata({ subsets: ["latin"] });

export const metadata = {
  title: "Reading Recorder",
  description: "自分が読んだ書籍の記録を残すためのアプリ",
};

export default function RootLayout({ children }) {
  //console.log(fnt);

  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Reading Recorder</h1>

          {/*共通メニュー*/}
          <ul className="flex bg-light-gray mb-4 pl-2 justify-end">

            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
              <Link className="no-underline text-black" href="/">
                Home</Link></li>

            <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
              <Link className="no-underline text-black" href="/books">
                Search</Link></li>

            <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
              <Link className="no-underline text-black" href="/reviews">
                Reviews</Link></li>

            <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
              <a className="no-underline text-black"
                href="https://wings.msn.to/" target="_blank">Support</a></li>
          </ul>

          {/*ページコンポーネントを反映する領域*/}
          <div className="ml-2">
            {children}
          </div>
      </body>
    </html>
  );
}
