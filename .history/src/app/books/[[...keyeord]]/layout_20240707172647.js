'use client';

import { useRouter } from "next/navigation";
import { useRef } from "react";

//「book/keyword」配下に適用されるレイアウト
export default function BooksLayout({ children }) {
    const router = useRouter();
    const textKeyword = useRef(null);

//[検索]ボタンクリック時に「book/keyword」へリダイレクト
    const handleSearch = () => {
        router.push(`/books/${textKeyword.current.value}`);
    };

    
}