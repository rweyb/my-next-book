"use client"; // クライアントコンポーネントとしてマーク

import { useState, useEffect } from "react";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import PaginationComponent from "@/components/PaginationComponent";
import { getBooksByKeyword } from "@lib/getter";
import ReturnTopButton from "@/components/ReturnTopButton";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@/state/signInUserState";
import { favoritesState } from "@/state/favoritesState";

// ルートパラメーターparamsを取得
export default function BookResult({ params }) {
  const keyword = params.keyword || ""; // URLからキーワードを取得し、デフォルト値を設定
  const [books, setBooks] = useState([]); // 書籍データを格納する状態
  const [page, setPage] = useState(1); // 現在のページ番号を格納する状態
  const [error, setError] = useState(null); // エラーメッセージを格納する状態
  const booksPerPage = 10; // 1ページあたりの書籍数

  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの取得
  console.log("signInUser", signInUser); // ここで `signInUser` の値を確認
  const [favorites, setFavorites] = useRecoilValue(favoritesState);

  

  useEffect(() => {
    const fetchBooks = async () => {
      if (!keyword) {
        setError("キーワードが指定されていません。");
        return;
      }

      try {
        const fetchedBooks = await getBooksByKeyword(
          keyword,
          page,
          booksPerPage
        );
        setBooks(fetchedBooks);
        setError(null);
      } catch (error) {
        console.error("書籍データの取得中にエラーが発生しました:", error);
        setError("書籍情報の取得に失敗しました。もう一度お試しください。");
      }
    };
    fetchBooks();
  }, [keyword, page]);

  //追加
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!signInUser || !signInUser.uid) return;

      try {
        const response = await fetch(`/api/favorites?userId=${signInUser.uid}`);
        const favoritesData = await response.json();
        if (response.ok) {
          setFavorites(favoritesData.map(fav => fav.bookId)); // お気に入りのIDをセット
        } else {
          console.error("お気に入りの取得に失敗しました:", favoritesData.error);
        }
      } catch (error) {
        console.error("お気に入りの取得中にエラーが発生しました:", error);
      }
    };

    fetchFavorites();
  }, [signInUser]); // `signInUser` が変更されるたびに実

  // ページ変更時に呼び出される関数
  const handleChange = (event, value) => {
    setPage(value); // 現在のページ番号を更新
  };

  // 現在のページに表示する書籍データを計算
  const paginatedBooks = books.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  console.log("favorites", favorites); // デバッグ: favorites の内容を表示

  return (
    <div>
      {error ? (
        <p>{error}</p> // エラーメッセージがある場合に表示
      ) : (
        <>
          {/* 現在のページに表示する書籍データをリスト表示 */}
          {books.length > 0 ? (
            paginatedBooks.map((b, i) => (
              <LinkedBookDetails 
                book={b}
                index={i + 1} 
                key={b.id} 
                isFavorite={favorites.includes(b.id)} // お気に入り状態を渡す
                />
            ))
          ) : (
            <p>書籍情報が見つかりませんでした。</p>
          )}

          {/* ページネーションコンポーネント */}
          <PaginationComponent
            page={page} // 現在のページ番号
            count={Math.ceil(books.length / booksPerPage)} // 総ページ数
            onChange={handleChange} // ページ変更時に呼び出される関数
          />
          {/* ページの下部に ReturnTopButton を追加 */}
          <ReturnTopButton />
        </>
      )}
    </div>
  );
}