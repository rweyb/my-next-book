import React from 'react';
import { FaHeart } from 'react-icons/fa'; // react-iconsライブラリからFaHeartアイコンをインポート
import { useRecoilState } from 'recoil';
import { FavoritesRecipeState } from './FavoritesRecipeState';


const FavoriteButton = ({ recipeId, onAddFavorite, onRemoveFavorite }) => {

  const [favorites, setFavorites] = useRecoilState(FavoritesRecipeState);
  const isFavorite = favorites.includes(recipeId);

  const handleClick = () => {
    if (isFavorite) {
      // お気に入りから削除
      const newFavorites = favorites.filter(id => id !== recipeId);
      setFavorites(newFavorites);
      console.log('お気に入りから削除:', newFavorites);
      onRemoveFavorite(recipeId);
    } else {
      // お気に入りに追加
      const newFavorites = [...favorites, recipeId];
      setFavorites(newFavorites);
      console.log('お気に入りに追加:', newFavorites);
      onAddFavorite(recipeId);
    }
  };

  return (
    <button onClick={handleClick}>
      <FaHeart color={isFavorite ? 'red' : 'grey'} />
    </button>  
  );
};

export default FavoriteButton;