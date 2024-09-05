import React from "react";
import { FaBook } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";

const MyBooksButton = ({ bookId, bookObj = {} }) => {
  // Recoilで状態を管理
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの状態を取得

  if (!bookObj) { // bookObj が undefined または null の場合、エラーメッセージを表示
    console.error("bookObj is undefined or null");
    return null;
  }

  // 現在の本が本棚にあるかどうかを確認
  const isOwned = ownedBooks.some(book => book.id === bookId);
  console.log("ownedBooksのbookId", bookId);

  // `bookObj.published` が有効な日付であるかをチェック
  const publishedDate = new Date(bookObj.published);
  const publishedISO = publishedDate instanceof Date && !isNaN(publishedDate.getTime())
    ? publishedDate.toISOString()
    : 'N/A'; // 無効な日付の場合はデフォルト値を設定

  const handleClick = async (event) => {
    event.preventDefault(); // デフォルトの動作を防ぐ
    if (!signInUser || !signInUser.uid) {
      console.error("ユーザーはログインする必要があります。");
      return;
    }

    // リクエストボディの作成
    const requestBody = {
      userId: signInUser.uid,
      bookId,
      title: bookObj.title,
      author: bookObj.author,
      price: bookObj.price,
      publisher: bookObj.publisher,
      published: publishedISO,
      image: bookObj.image,
    };

    try {
      const response = isOwned
        ? await fetch("/api/bookshelf", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: signInUser.uid, bookId }),
          })
        : await fetch("/api/bookshelf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("エラーレスポンス:", errorData.error || "Unknown error");
        throw new Error(
          `HTTPエラー! ステータス: ${response.status}, メッセージ: ${
            errorData.error || "Unknown error"}`
        );
      }

      // 本棚リストの状態を更新
      setOwnedBooks((prevOwnedBooks) =>
        isOwned
          ? prevOwnedBooks.filter((id) => id !== bookId)
          : [...prevOwnedBooks, bookId]
      );
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaBook color={isOwned ? 'yellow' : 'grey'} />
      {/* 本棚にあるかどうかに応じてアイコンの色を変更 */}
    </button>
  );
};

export default MyBooksButton;
