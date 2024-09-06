"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";
import MyBooksButton from "@/components/MyBooksButton";
import ReturnTopButton from "@/components/ReturnTopButton";
import Image from "next/image";

const BookshelfPage = () => {
  const ownedBooks = useRecoilValue(OwnedBooksState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの取得
  const [books, setBooks] = useState([]); // 書籍情報の状態管理
  const [error, setError] = useState(null); // エラーメッセージの状態管理

  useEffect(() => {
    const fetchOwnedBooks = async () => {
      if (!signInUser?.uid) {
        setError("ユーザーがサインインしていません。");
        return;
      }

      if (ownedBooks.length === 0) {
        setBooks([]); // お気に入りが空の場合、書籍リストも空にする
        return;
      }

      try {
        const query = new URLSearchParams({ userId: signInUser.uid }).toString();
        const response = await fetch(`/api/bookshelf?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch owned books");
        }
        const data = await response.json();
        console.log("Fetched books data:", data);
        setBooks(data || []);
      } catch (error) {
        console.error("Error fetching owned books:", error);
        setError("本棚の取得中にエラーが発生しました。");
      }
    };

    fetchOwnedBooks();
    console.log("Current ownedBooks in BookshelfPage:", ownedBooks);
  }, [ownedBooks, signInUser]); // `signInUser` または `setOwnedBooks` が変更されると再実行

  
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="relative border p-4 rounded-lg shadow-md flex flex-col items-center">
                <Image
                  src={book.image || "/images/default_image.jpg"}
                  alt={book.title || "書籍画像"}
                  width={120}
                  height={160}
                  layout="intrinsic"
                  className="object-cover rounded-lg"
                />
                <div className="mt-4 text-center">
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
                  bookObj={book}
                  onChange={handleOwnedChange}
                  
                />
              </div>
            ))
          ) : (
            <p>本棚に本がありません。</p>
          )}
        </div>
      )}
      <ReturnTopButton />
    </div>
  );
};

export default BookshelfPage;