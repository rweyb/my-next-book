import { atom } from 'recoil';

// お気に入りの状態を管理
export const favoritesState = atom({
  key: 'favoritesState',
  default: [], // デフォルト値は空の配列
});