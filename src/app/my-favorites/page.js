"use client";

import React, { useEffect, useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesState } from "@/state/favoritesState";
import { signInUserState } from "@/state/signInUserState";
import ReturnTopButton from "@/components/ReturnTopButton";
import Image from "next/image";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState); 
  const signInUser = useRecoilValue(signInUserState); 
  const [books, setBooks] = useState([]); // 書籍情報の状態管理
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      if (!signInUser?.uid) {
        setError("ユーザーがサインインしていません。");
        return;
      }
      
      if (favorites.length === 0) {
        setBooks([]); // お気に入りが空の場合、書籍リストも空にする
        return;
      }

      try {
        // APIからお気に入りの書籍情報を取得
        const query = new URLSearchParams({ userId: signInUser.uid,}).toString();
        const response = await fetch(`/api/favorites?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();
        console.log("API response data:", data); 
        setBooks(data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("お気に入りの取得中にエラーが発生しました。");
      }
    };
    fetchBooks();
  }, [favorites, signInUser]); // `favorites` または `signInUser` が変更されると再実行

  const handleFavoriteChange = async (bookId, isFavorite) => {
    try {
      if (isFavorite) {
        // お気に入りに追加する処理
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: signInUser.uid, bookId }),
        });
      } else {
        // お気に入りから削除する処理
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: signInUser.uid, bookId }),
        });
      }

      // 状態を再取得して更新
      const dataResponse = await fetch(`/api/favorites?userId=${signInUser.uid}`);
      const data = await dataResponse.json();
      setBooks(data || []);
    } catch (error) {
      console.error("Error updating favorite:", error);
      setError("お気に入りの更新中にエラーが発生しました。");
    }
  };

  if (!signInUser || !signInUser.uid) {
    return (
      <div>ログインしていないため、お気に入りページを表示できません。</div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
  <h1 className="text-3xl font-bold mb-6">お気に入り</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid layout */}
    {books.length > 0 ? (
      books.map((book) => (
        <div key={book.bookId} className="relative border p-4 rounded-lg shadow-md flex flex-col items-center">
          <Image
            src={book.image || "/default_image_url.jpg"}
            alt={book.title || "書籍画像"}
            width={120}
            height={160}
            layout="intrinsic"
            className="object-cover rounded-lg" 
          />
          <div className="mt-4 text-left w-full flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">{book.title || "タイトルがありません"}</h2>
            <p className="mb-1">著者: {book.author || "著者情報がありません"}</p>
            <p className="mb-1">価格: {book.price || "価格情報がありません"}</p>
            <p className="mb-1">出版社: {book.publisher || "出版社情報がありません"}</p>
            <p>
              出版日:{" "}
              {book.published
                ? new Date(book.published).toLocaleDateString()
                : "出版日がありません"}
            </p>
          </div>
          <FavoriteButton
            bookId={book.bookId}
            bookObj={book}
            onChange={handleFavoriteChange}
            className="absolute bottom-4 right-4" // ハートアイコンを右下に配置
          />
        </div>
      ))
    ) : (
      <p>お気に入りの本がありません。</p>
    )}
  </div>
  <ReturnTopButton />
</div>

  );
};

export default FavoritesPage;