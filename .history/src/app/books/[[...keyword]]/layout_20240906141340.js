'use client';

import { useRouter } from "next/navigation";
import { useRef } from "react";

//「book/keyword」配下に適用されるレイアウト
export default function BooksLayout({ children }) {
    const router = useRouter();
    const textKeyword = useRef(null);

//[検索]ボタンクリック時に「book/keyword」へリダイレクト
const handleSearch = () => {
    const keyword = textKeyword.current.value.trim();
    if (keyword) {
        router.push(`/books/${encodeURIComponent(keyword)}`);
    }
};

    return (
        <>
        <div className="header-space" />
<<<<<<< HEAD
        <div className="flex justify-center py-4 px-4">
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
        <form className="mt-2 mb-4">
            <input type="text" ref={textKeyword}
                className="bg-gray-100 text-black border border-gray-600 rounded mr-2 px-2
                py-2 focus:bg-white focus:outline-none focus:border-red-500 ml-4" />

            <button type="button" onClick={handleSearch}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500">
                    検索</button>
        </form>
<<<<<<< HEAD
        </div>
        <hr />
            <div className="max-w-screen-lg mx-auto px-4 py-2"> {/* コンテナを中央に配置 */}
                {children}
            </div>
=======
        <hr />
        {children}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
        </>
    );
}