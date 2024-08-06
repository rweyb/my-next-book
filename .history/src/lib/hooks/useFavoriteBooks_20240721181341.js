import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FavoritesBookState } from '@state/FavoritesBookState';
import { FavoritesListAtom } from '@state/FavoritesListAtom';

// カスタムフック: useFavoriteBooks
// 引数として書籍データを受け取り、お気に入りの本の詳細情報を返す
const useFavoriteBooks = (books) => {
    // Recoilの状態からお気に入りの本のIDを取得
    const favoriteBookIds = useRecoilValue(FavoritesBookState);
    // お気に入りの本の詳細情報を保持するための状態を定義
    const [favoriteBooks, setFavoriteBooks] = useState([]);
  
    // お気に入りの本の詳細情報を取得するための副作用を定義
    useEffect(() => {
      // 非同期関数を使用して本の詳細情報を取得
      const fetchFavoriteBooks = async () => {
        // Promise.allを使用して、非同期に本の詳細情報を取得
        const booksDetails = await Promise.all(
          favoriteBookIds.map(async (id) => {
            // RecoilのatomFamilyを使って本の詳細情報を取得
            const bookDetails = books.find(book => book.id === id);
            return bookDetails;
          })
        );
        // nullでない本のみをフィルタリングして状態に設定
        setFavoriteBooks(booksDetails.filter(book => book !== null));
      };
  
      // 非同期関数を呼び出して本の詳細情報を取得
      fetchFavoriteBooks();
    }, [favoriteBookIds, books]); // favoriteBookIdsとbooksが変更されたときに副作用を再実行
  
    // お気に入りの本の詳細情報を返す
    return favoriteBooks;
  };
  
  export default useFavoriteBooks;