import { atom, atomFamily, selector } from 'recoil';

// お気に入りの本IDの配列を保持
export const FavoritesBookState = atom({
  key: 'FavoritesBookState',
  default: [],
});

// 特定のIDに基づいて個々の本の詳細情報を保持
export const FavoritesListAtom = atomFamily({
  key: 'FavoritesListAtom',
  default: null,
});

// FavoritesBookStateとFavoritesListAtomから派生した詳細情報を保持
export const FavoritesSelector = selector({
  key: 'FavoritesSelector',
  get: ({ get }) => {
    const lists = get(FavoritesBookState);
    const detailedLists = lists.map(id => get(FavoritesListAtom(id))).filter(item => item !== null);
    return {
      count: lists.length, // お気に入りの件数
      details: detailedLists, // お気に入り本の詳細情報
    };
  },
  set: ({ set, reset }, { type, id, newItem }) => {
    switch (type) {
      case 'add':
        set(FavoritesListAtom(newItem.id), newItem);
        set(FavoritesBookState, lists => [...lists, newItem.id]);
        break;
      case 'done':
        set(FavoritesListAtom(id), book => ({ ...book, isDone: true }));
        break;
      case 'remove':
        reset(FavoritesListAtom(id));
        set(FavoritesBookState, lists => lists.filter(e => e !== id));
        break;
      default:
        throw new Error('Type is invalid.');
    }
  },
});
