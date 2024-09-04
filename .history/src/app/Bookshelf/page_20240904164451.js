"use client";

import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";
import MyBooksButton from "@/components/MyBooksButton";
import ReturnTopButton from "@/components/ReturnTopButton";
import Image from "next/image";
import { favoritesState } from "@/state/favoritesState"; // お気に入りの状態管理も追加

const BookshelfPage = () => {
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState); // 所有する本の状態管理
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの取得
  const [books, setBooks] = useState([]); // 書籍情報の状態管理
  const [favorites, setFavorites] = useRecoilState(favoritesState); // お気に入りの状態管理
  const [error, setError] = useState(null); // エラーメッセージの状態管理

  useEffect(() => {
    const fetchOwnedBooks = async () => {
      if (!signInUser?.uid) {
        setError("ユーザーがサインインしていません。");
        return;
      }

      try {
        const query = new URLSearchParams({ userId: signInUser.uid }).toString();
        const response = await fetch(`/api/bookshelf?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch owned books");
        }
        const data = await response.json();
        setBooks(data || []);
        setOwnedBooks(data || []); // ここで Recoil の状態も更新
      } catch (error) {
        console.error("Error fetching owned books:", error);
        setError("本棚の取得中にエラーが発生しました。");
      }
    };

    fetchOwnedBooks();
  }, [signInUser, setOwnedBooks]); // `signInUser` または `setOwnedBooks` が変更されると再実行

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!signInUser?.uid) return;

      try {
        const response = await fetch(`/api/favorites?userId=${signInUser.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const favoritesData = await response.json();
        if (Array.isArray(favoritesData)) {
          setFavorites(favoritesData.map(fav => fav.bookId)); // お気に入りのIDをセット
        } else {
          console.error("Unexpected data format:", favoritesData);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [signInUser, setFavorites]); // `signInUser` または `setFavorites` が変更されると再実行

  const handleOwnedChange = async (bookId, isOwned) => {
    try {
      if (isOwned) {
        // 所有する本を追加する処理
        await fetch("/api/bookshelf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: signInUser.uid, bookId }),
        });
      } else {
        // 所有する本を削除する処理
        await fetch("/api/bookshelf", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: signInUser.uid, bookId }),
        });
      }

      // 状態を再取得して更新
      const dataResponse = await fetch(`/api/bookshelf?userId=${signInUser.uid}`);
      const data = await dataResponse.json();
      setBooks(data || []);
      setOwnedBooks(data || []); // Recoil の状態も更新
    } catch (error) {
      console.error("Error updating owned books:", error);
      setError("本棚の更新中にエラーが発生しました。");
    }
  };

  if (!signInUser || !signInUser.uid) {
    return (
      <div>ログインしていないため、本棚ページを表示できません。</div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">自分の本棚</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book.id} className="flex items-center space-x-4 border-b pb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={book.image || "/default_image_url.jpg"}
                    alt={book.title || "書籍画像"}
                    width={120}
                    height={160}
                    layout="intrinsic"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{book.title || "タイトルがありません"}</h2>
                  <p>著者: {book.author || "著者情報がありません"}</p>
                  <p>価格: {book.price || "価格情報がありません"}</p>
                  <p>出版社: {book.publisher || "出版社情報がありません"}</p>
                  <p>
                    出版日:{" "}
                    {book.published
                      ? new Date(book.published).toLocaleDateString()
                      : "出版日がありません"}
                  </p>
                </div>
                <MyBooksButton
                  bookId={book.id}
                  isOwned={ownedBooks.some(b => b.id === book.id)} // 所有状態を判断
                  onChange={handleOwnedChange} // 状態変更ハンドラーを追加
                />
              </li>
            ))
          ) : (
            <p>本棚に本がありません。</p>
          )}
        </ul>
      )}
      <ReturnTopButton />
    </div>
  );
};

export default BookshelfPage;
