import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { FavoritesBookState } from '@/state/FavoritesBookState';


const FavoriteButton = ({ bookId, onAddFavorite, onRemoveFavorite }) => {
  const [favorites, setFavorites] = useRecoilState(FavoritesBookState);
  const isFavorite = favorites.includes(bookId);

  const handleClick = () => {
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== bookId);
      setFavorites(newFavorites);
      console.log('お気に入りから削除:', newFavorites);
      onRemoveFavorite(bookId);
    } else {
      const newFavorites = [...favorites, bookId];
      setFavorites(newFavorites);
      console.log('お気に入りに追加:', newFavorites);
      onAddFavorite(bookId);
    }
  };

  return (
    <button onClick={handleClick}>
      <FaHeart color={isFavorite ? 'red' : 'grey'} />
    </button>
  );
};

export default FavoriteButton;