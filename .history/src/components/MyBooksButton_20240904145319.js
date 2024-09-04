import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";

const MyBooksButton = ({ bookId, bookObj = {} }) => {
  // OwnedBooksState から状態を管理
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const [myBook, setMyBook] = useState(false);

  // ボタンがクリックされたときの処理
  const handleClick = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ

    if (myBook) {
      // 本棚から書籍を削除
      const newOwnedBooks = ownedBooks.filter(id => id !== bookId);
      setOwnedBooks(newOwnedBooks);
      console.log('本棚から削除:', newOwnedBooks);
    } else {
      // 本棚に書籍を追加
      const newOwnedBooks = [...ownedBooks, bookId];
      setOwnedBooks(newOwnedBooks);
      console.log('本棚に追加:', newOwnedBooks);
    }
    setMyBook(!myBook); // ボタンの状態を更新
  };

  // `myBook` ステートが変更された場合に `ownedBooks` と同期
  useEffect(() => {
    setMyBook(ownedBooks.includes(bookId));
  }, [ownedBooks, bookId]); // `ownedBooks` と `bookId` を依存配列に追加

  return (
    <button type="button" onClick={handleClick}>
      <FaBook color={myBook ? 'yellow' : 'grey'} />
      {/* 本棚にあるかどうかに応じてアイコンの色を変更 */}
    </button>
  );
};

export default MyBooksButton;
