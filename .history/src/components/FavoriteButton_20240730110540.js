import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { FavoritesBookState } from '@/state/FavoritesBookState';


const FavoriteButton = ({ bookId }) => {
  const [favorites, setFavorites] = useRecoilState(FavoritesBookState);
  const isFavorite = favorites.includes(bookId);

console.log('Current favorites:', favorites);
  const handleClick = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ

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
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaHeart color={isFavorite ? 'red' : 'grey'} />
    </button>
  );
};

export default FavoriteButton;