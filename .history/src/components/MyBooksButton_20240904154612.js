import React from "react";
import { FaBook } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";

const MyBooksButton = ({ bookId }) => {
  // Recoilで状態を管理
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの状態を取得

  // 現在の本が本棚にあるかどうかを確認
  const isOwned = ownedBooks.includes(bookId);
  console.log("ownedBooksのbookId", bookId);

  const handleClick = async (event) => {
    event.preventDefault(); // デフォルトの動作を防ぐ

    if (!signInUser || !signInUser.uid) {
      console.error("ユーザーはログインする必要があります。");
      return;
    }

    try {
      const response = isOwned
        ? await fetch("/api/bookshelf", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: signInUser.uid, bookId }),
            credentials: "include",
          })
        : await fetch("/api/bookshelf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: signInUser.uid, bookId }),
            credentials: "include",
          });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("エラーレスポンス:", errorData.error || "Unknown error");
        throw new Error(
          `HTTPエラー! ステータス: ${response.status}, メッセージ: ${
            errorData.error || "Unknown error"
          }`
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
      <FaBook color={myBook ? 'yellow' : 'grey'} />
      {/* 本棚にあるかどうかに応じてアイコンの色を変更 */}
    </button>
  );
};

export default MyBooksButton;
