<<<<<<< HEAD
import React, { useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { signInUserState } from "@/state/signInUserState";

const MyBooksButton = ({ bookId, bookObj = {} }) => {
  console.log("Received bookId:", bookId); 
  // Recoilで状態を管理
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの状態を取得

 // useEffect を使って bookId の状態を監視
 useEffect(() => {
  if (bookId === undefined) {
    console.error("MyBooksButton に渡された bookId が undefined です");
  } else {
    console.log("MyBooksButton に渡された bookId:", bookId);
  }
}, [bookId]); // bookId が変更されたときに実行される


  if (!bookObj) { // bookObj が undefined または null の場合、エラーメッセージを表示
    console.error("bookObj is undefined or null");
    return null;
  }

  // 現在の本が本棚にあるかどうかを確認
  const isOwned = ownedBooks.includes(bookId);
  console.log("Checking bookId:", bookId, "in ownedBooks:", ownedBooks);
  console.log("Is owned:", isOwned);

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
        `HTTP error! status: ${response.status}, message: ${
            errorData.error || "Unknown error"}`
        );
      }

     // 本棚リストの状態を更新
     setOwnedBooks((prevOwnedBooks) => {
      const updatedBooks = isOwned
        ? prevOwnedBooks.filter(id => id !== bookId) // ID のみでフィルタリング
        : [...prevOwnedBooks, bookId]; // 新しい本の ID を追加

      console.log("Updated owned books:", updatedBooks); // 状態更新後のデバッグ
      return updatedBooks;
    });
  } catch (error) {
    console.error("APIリクエスト中にエラーが発生しました:", error);
  }
};

  return (
    <button type="button" 
            onClick={handleClick}
            
            >
      <FaBook color={isOwned ? 'yellow' : 'grey'} />
      {/* 本棚にあるかどうかに応じてアイコンの色を変更 */}
=======
import { FaBook } from "react-icons/fa6";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { OwnedBooksState } from "@state/OwnedBooksState";

const MyBooksButton = () => {
  // OwnedBooksState からタイトルを取得
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const [myBook, setMyBook] = useState(false);

  // ボタンがクリックされたときの処理
  const handleClick = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ

    const bookId = "exampleBookId"; // ここで実際の本のIDを使用
    if (myBook) {
      const newOwnedBooks = ownedBooks.filter(id => id !== bookId);
      setOwnedBooks(newOwnedBooks);
      console.log('本棚から削除:', newOwnedBooks);
    } else {
      const newOwnedBooks = [...ownedBooks, bookId];
      setOwnedBooks(newOwnedBooks);
      console.log('本棚に追加:', newOwnedBooks);
    }
    setMyBook(!myBook);
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaBook color={myBook ? 'yellow' : 'grey'} />
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    </button>
  );
};

export default MyBooksButton;
