import React from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { useRecoilValue } from 'recoil';
import { FavoritesSelector } from '../selectors/FavoritesSelector';


const FavoritesPage = () => {
  // Recoilからお気に入りのリストを取得
  const favorites = useRecoilValue(FavoritesSelector({}));

  console.log('Favorites from Recoil:', favorites);

  // favorites.detailsが配列であることを確認
  if (!Array.isArray(favorites.details)) {
    console.error('favorites.details is not an array:', favorites.details);
    return <div>お気に入りの情報を読み込めませんでした。</div>;
  }

  return (
    <div>
      <h1>お気に入り</h1>
      <ul>
        {favorites.details.length > 0 ? (
          favorites.details.map((item) => (
            <li key={item.id}>
              {item.title} {/* ここでタイトルを表示 */}
              <FavoriteButton bookId={item.id} /> {/* お気に入りボタン */}
            </li>
          ))
        ) : (
          <p>お気に入りの本がありません。</p>
        )}
      </ul>
    </div>
  );
};

export default FavoritesPage;
