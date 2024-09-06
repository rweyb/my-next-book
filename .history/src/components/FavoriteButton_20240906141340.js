<<<<<<< HEAD
import React from "react";
import { FaHeart } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesState } from "@/state/favoritesState";
import { signInUserState } from "@/state/signInUserState";

const FavoriteButton = ({ bookId, bookObj = {} }) => {
  // Recoilで状態を管理
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの状態を取得

  if (!bookObj) { // bookObj が undefined または null の場合、エラーメッセージを表示
    console.error("bookObj is undefined or null");
    return null;
  }

  const isFavorite = favorites.includes(bookId); // 現在の本がお気に入りかどうかを確認
  console.log("favoritesのbook", bookObj);

   // `bookObj.published` が有効な日付であるかをチェック
   const publishedDate = new Date(bookObj.published);
   const publishedISO = publishedDate instanceof Date && !isNaN(publishedDate.getTime())
     ? publishedDate.toISOString()
     : 'N/A'; // 無効な日付の場合はデフォルト値を設定

  const handleClick = async (event) => {
    event.preventDefault(); // デフォルトの動作を防ぐ
    if (!signInUser || !signInUser.uid) {
      console.error("User must be logged in to favorite a book.");
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
      const response = isFavorite
        ? await fetch("/api/favorites", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: signInUser.uid, bookId }),
            credentials: "include",
          })
        : await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
            credentials: "include",
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
            console.error("Error response:", errorData.error || "Unknown error");
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${
                errorData.error || "Unknown error"
              }`
            );
          }

      // お気に入りリストの状態を更新
      setFavorites((prevFavorites) =>
        isFavorite
          ? prevFavorites.filter((id) => id !== bookId)
          : [...prevFavorites, bookId]
      );
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
    }
  };

  return (
    <button type="button"
            onClick={handleClick}
            >
      <FaHeart color={isFavorite ? "red" : "grey"} />
      {/* お気に入り状態に応じてハートアイコンの色を変更 */}
=======
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { FavoritesBookState } from '@/state/FavoritesBookState';


const FavoriteButton = ({ bookId }) => {
  const [favorites, setFavorites] = useRecoilState(FavoritesBookState);
  const isFavorite = favorites.includes(bookId);

console.log('Current favorites:', favorites);

const handleClick = async (event) => {
  event.preventDefault();

  try {
    let response;

    if (isFavorite) {
      // お気に入りから削除するAPIリクエスト
      response = await fetch(`/api/favorites/${bookId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } else {
      // お気に入りに追加するAPIリクエスト
      response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
        credentials: 'include',
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    setFavorites(prevFavorites => {
      if (isFavorite) {
        const newFavorites = prevFavorites.filter(id => id !== bookId);
        console.log('お気に入りから削除:', newFavorites);
        return newFavorites;
      } else {
        const newFavorites = [...prevFavorites, bookId];
        console.log('お気に入りに追加:', newFavorites);
        return newFavorites;
      }
    });
  } catch (error) {
    console.error('APIリクエスト中にエラーが発生しました:', error);
  }
};



  return (
    <button type="button" onClick={handleClick}>
      <FaHeart color={isFavorite ? 'red' : 'grey'} />
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    </button>
  );
};

export default FavoriteButton;