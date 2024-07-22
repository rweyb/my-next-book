import { atom } from 'recoil';

// お気に入りの本IDの配列を保持
export const FavoritesBookState = atom({
  key: 'FavoritesBookState',
  default: [],
});

