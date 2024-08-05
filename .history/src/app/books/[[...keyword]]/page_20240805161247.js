'use client'; // クライアントコンポーネントとしてマーク

import { useState, useEffect } from 'react';
import LinkedBookDetails from '@/components/LinkedBookDetails';
import PaginationComponent from '@/components/PaginationComponent';
import { getBooksByKeyword } from '@lib/getter';

// ルートパラメーターparamsを取得
export default function BookResult({ params }) {
    const keyword = params.keyword || ''; // URLからキーワードを取得し、デフォルト値を設定

     // デバッグ用にキーワードをログ出力
     useEffect(() => {
        console.log('Search keyword:', keyword); // 追加してデバッグ
    }, [keyword]);

    const [books, setBooks] = useState([]); // 書籍データを格納する状態
    const [page, setPage] = useState(1); // 現在のページ番号を格納する状態
    const [error, setError] = useState(null); // エラーメッセージを格納する状態
    const booksPerPage = 10; // 1ページあたりの書籍数

    useEffect(() => {
        // キーワードに基づいて書籍データを取得する非同期関数
        const fetchBooks = async () => {
            if (!keyword) {
                // キーワードがない場合の処理
                setError('キーワードが指定されていません。');
                return;
            }
            
            try {
                const fetchedBooks = await getBooksByKeyword(keyword, page, booksPerPage); // 書籍データを取得
                setBooks(fetchedBooks); // 書籍データを状態にセット
                setError(null); // エラーがないことを確認
            } catch (error) {
                console.error("書籍データの取得中にエラーが発生しました:", error); // エラーログをコンソールに出力
                setError('書籍情報の取得に失敗しました。もう一度お試しください。');
            }
        };

        fetchBooks(); // 書籍データを取得する関数を呼び出し
    }, [keyword, page]); // キーワードまたはページが変更されるたびに実行

    // ページ変更時に呼び出される関数
    const handleChange = (event, value) => {
        setPage(value); // 現在のページ番号を更新
    };

    // 現在のページに表示する書籍データを計算
    const paginatedBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);

    return (
        <div>
            {error ? (
                <p>{error}</p> // エラーメッセージがある場合に表示
            ) : (
                <>
                    {/* 現在のページに表示する書籍データをリスト表示 */}
                    {paginatedBooks.length > 0 ? (
                        paginatedBooks.map((b, i) => (
                            <LinkedBookDetails book={b} index={i + 1} key={b.id} />
                        ))
                    ) : (
                        <p>書籍情報が見つかりませんでした。</p> // 書籍データがない場合のメッセージ
                    )}
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
