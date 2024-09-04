"use client";

import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";
import MyBooksButton from "@/components/MyBooksButton";
import ReturnTopButton from "@/components/ReturnTopButton";
import Image from "next/image";

const BookshelfPage = () => {
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState); // 所有する本の状態管理
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの取得
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
        setOwnedBooks(data || []);
      } catch (error) {
        console.error("Error fetching owned books:", error);
        setError("本棚の取得中にエラーが発生しました。");
      }
    };

    fetchOwnedBooks();
  }, [signInUser, setOwnedBooks]); // `signInUser` または `setOwnedBooks` が変更されると再実行

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
          {ownedBooks.length > 0 ? (
            ownedBooks.map((book) => (
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
                <MyBooksButton bookId={book.id} />
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
