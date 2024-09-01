"use client";

import React from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesState } from "@/state/favoritesState";
import { useEffect } from "react";
import { signInUserState } from "@/state/signInUserState";
import ReturnTopButton from "@/components/ReturnTopButton";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const signInUser = useRecoilValue(signInUserState);
  
  useEffect(() => {
    console.log("Favorites state updated:", favorites);
    if (!Array.isArray(favorites)) {
      console.error("favorites is not an array:", favorites);
    }
  }, [favorites]);

  if (!signInUser || !signInUser.uid) {
    return <div>ログインしていないため、お気に入りページを表示できません。</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">お気に入り</h1>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <li key={item.bookId}>
              {item.title}
              <FavoriteButton
                bookId={item.bookId}
                title={item.title}
                author={item.author}
                price={item.price}
                publisher={item.publisher}
                published={item.published}
                image={item.image}
              />
            </li>
          ))
        ) : (
          <p>お気に入りの本がありません。</p>
        )}
      </ul>
      <ReturnTopButton />
    </div>
  );
  
  return null;
};

export default FavoritesPage;