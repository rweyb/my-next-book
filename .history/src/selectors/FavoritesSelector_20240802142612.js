import { FavoritesBookState } from '../state/FavoritesBookState';
import { FavoritesListAtom } from '../state/FavoritesListAtom';

// お気に入りの本の詳細情報を取得するセレクター
export const FavoritesSelector = selectorFamily({
  key: 'FavoritesSelector', // セレクターの一意のキー
  get: async ({ get }) => {
    try {
      // お気に入りの本のIDリストを取得
      const favoriteIds = get(FavoritesBookState);
      // 各IDに対して本の詳細情報を非同期で取得
      const favoriteDetails = await Promise.all(favoriteIds.map(id => get(FavoritesListAtom(id))));
      console.log('FavoritesSelector:', favoriteDetails);
      // 取得した詳細情報を返す
      return {
        details: favoriteDetails,
      };
    } catch (error) {
      // エラーハンドリング
      console.error('Error in FavoritesSelector:', error);
      return {
        details: [],
      };
    }
  },
});
