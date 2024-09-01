import React from "react";
import { FaHeart } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesState } from "@/state/favoritesState";
import { signInUserState } from "@state/signInUserState";

const FavoriteButton = ({ bookId, title = '', author = '', price = 0, publisher = '', published = '', image = '' }) => {
  // Recoilで状態を管理する
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const signInUser = useRecoilValue(signInUserState); // サインインユーザーの状態を取得
  const isFavorite = favorites.includes(bookId); // 現在の本がお気に入りかどうか

  const handleClick = async (event) => {
    event.preventDefault();
    console.log("Button clicked");

    // サインインしていない場合はエラーメッセージを表示
    if (!signInUser || !signInUser.uid) {
      console.error("User must be logged in to favorite a book.");
      return;
    }
    
    try {
      // リクエストボディの構築
      const requestBody = {
        userId: signInUser.uid,
        bookId,
        title,
        author,
        price,
        publisher,
        published: published ? new Date(published).toISOString() : new Date().toISOString(),
        image,
      };

      let response;

      // お気に入りが既に存在する場合、削除リクエストを送信
      if (isFavorite) {
        console.log("Removing favorite:", requestBody); 
        response = await fetch('/api/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: signInUser.uid, bookId }),
          credentials: 'include',
        });
      } else {
        // お気に入りが存在しない場合、新規追加リクエストを送信
        console.log("Adding favorite:", requestBody);
        response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),// 新規追加リクエストのボディ
          credentials: 'include',
        });
      }

      // レスポンスが正常でない場合はエラーをスロー
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // お気に入りリストの状態を更新
      setFavorites(prevFavorites => isFavorite
        ? prevFavorites.filter(id => id !== bookId) // お気に入りから削除
        : [...prevFavorites, bookId] // お気に入りに追加
      );
    } catch (error) {
      // エラーハンドリング
      console.error('APIリクエスト中にエラーが発生しました:', error);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaHeart color={isFavorite ? 'red' : 'grey'} />
      {/* お気に入り状態に応じてハートアイコンの色を変更 */}
    </button>
  );
};

export default FavoriteButton;
