import React from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { FavoritesBookState } from '../state/FavoritesBookState';
import { FavoritesSelector } from '../selectors/FavoritesSelector';

const FavoritesPage = () => {
  // Recoilの状態更新関数を取得
  const setFavoritesList = useSetRecoilState(FavoritesBookState);
  // Recoilからお気に入りのリストを取得
  const favorites = useRecoilValue(FavoritesSelector);

  console.log('Favorites from Recoil:', favorites);

  // favorites.detailsが配列であることを確認
  if (!Array.isArray(favorites.details)) {
    console.error('favorites.details is not an array:', favorites.details);
    return <div>お気に入りの情報を読み込めませんでした。</div>;
  }

  // お気に入り追加
  const addFavorite = (id) => {
    setFavoritesList((lists) => {
      if (!lists.includes(id)) {
        const updatedLists = [...lists, id];
        console.log('Adding favorite:', updatedLists);
        return updatedLists;
      }
      return lists;
      });
  };

  // お気に入りから削除
  const removeFavorite = (id) => {
    setFavoritesList((lists) => {
        const updatedLists = lists.filter((favId) => favId !== id);
        console.log('Removing favorite:', updatedLists);
        return updatedLists;
      });
  };

  return (
    <div>
      <h1>お気に入り</h1>
      <ul>
        {favorites.details.map((item) => (
          <li key={item.id}>
            {item.title} {/* ここでタイトルを表示 */}
            <FavoriteButton 
              bookId={item.id}
              onAddFavorite={() => addFavorite(item)}
              onRemoveFavorite={() => removeFavorite(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
