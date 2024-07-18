'use client';

import { useState, useEffect } from 'react';
import LinkedBookDetails from '@/components/LInkedBookDetails';
import PaginationComponent from '@/components/PaginationComponent';
import { getBooksByKeyword } from '@lib/getter';

// ルートパラメーターparamsを取得
export default async function BookResult({ params }) {
    const keyword = params.keyword; // URLからキーワードを取得
    const [books, setBooks] = useState([]); // 書籍データを格納する状態
    const [page, setPage] = useState(1); // 現在のページ番号を格納する状態
    const booksPerPage = 10; // 1ページあたりの書籍数

    useEffect(() => {
        // キーワードに基づいて書籍データを取得する非同期関数
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getBooksByKeyword(keyword); // 書籍データを取得
                setBooks(fetchedBooks); // 書籍データを状態にセット
            } catch (error) {
                console.error("Error fetching books:", error); // エラーログをコンソールに出力
            }
        };

        fetchBooks(); // 書籍データを取得する関数を呼び出し
    }, [keyword]); // キーワードが変更されるたびに実行

    // ページ変更時に呼び出される関数
    const handleChange = (event, value) => {
        setPage(value); // 現在のページ番号を更新
    };

    // 現在のページに表示する書籍データを計算
    const paginatedBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);

    return (
        <div>
            {books.length === 0 ? (
                <p>書籍情報の取得に失敗しました。もう一度お試しください。</p> // 書籍データがない場合のメッセージ
            ) : (
                <>
                    {/* 現在のページに表示する書籍データをリスト表示 */}
                    {paginatedBooks.map((b, i) => (
                        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
                    ))}
                    {/* ページネーションコンポーネント */}
                    <PaginationComponent
                        page={page} // 現在のページ番号
                        count={Math.ceil(books.length / booksPerPage)} // 総ページ数
                        onChange={handleChange} // ページ変更時に呼び出される関数
                    />
                </>
            )}
        </div>
    );
}