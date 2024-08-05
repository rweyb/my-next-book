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
    </button>
  );
};

export default FavoriteButton;