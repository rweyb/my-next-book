"use client"; // クライアントコンポーネントとしてマーク

import { useState, useEffect } from "react";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import PaginationComponent from "@/components/PaginationComponent";
import { getBooksByKeyword } from "@lib/getter";
<<<<<<< HEAD
import ReturnTopButton from "@/components/ReturnTopButton";
import { useRecoilValue, useRecoilState } from "recoil";
import { signInUserState } from "@/state/signInUserState";
import { favoritesState } from "@/state/favoritesState";
import { OwnedBooksState } from "@/state/OwnedBooksState";
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6

// ルートパラメーターparamsを取得
export default function BookResult({ params }) {
  const keyword = params.keyword || ""; // URLからキーワードを取得し、デフォルト値を設定
  const [books, setBooks] = useState([]); // 書籍データを格納する状態
  const [page, setPage] = useState(1); // 現在のページ番号を格納する状態
  const [error, setError] = useState(null); // エラーメッセージを格納する状態
  const booksPerPage = 10; // 1ページあたりの書籍数

<<<<<<< HEAD
  const signInUser = useRecoilValue(signInUserState); 
  console.log("signInUser", signInUser); 
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);

=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  useEffect(() => {
    const fetchBooks = async () => {
      if (!keyword) {
        setError("キーワードが指定されていません。");
        return;
      }

<<<<<<< HEAD
      try {
        const fetchedBooks = await getBooksByKeyword(
          keyword,
          page,
          booksPerPage
        );
=======
      // keywordを文字列に変換
      const searchKeyword = String(keyword);

      try {
        const fetchedBooks = await getBooksByKeyword(
          searchKeyword,
          page,
          booksPerPage
        ); // 書籍データを取得
        console.log("Fetched Books:", fetchedBooks); // 追加
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
        setBooks(fetchedBooks);
        setError(null);
      } catch (error) {
        console.error("書籍データの取得中にエラーが発生しました:", error);
        setError("書籍情報の取得に失敗しました。もう一度お試しください。");
      }
    };
<<<<<<< HEAD
    fetchBooks();
  }, [keyword, page]);

  //追加
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!signInUser || !signInUser.uid) return;
  
      try {
        const response = await fetch(`/api/favorites?userId=${signInUser.uid}`);
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          return;
        }
        
        const favoritesData = await response.json();
        if (Array.isArray(favoritesData)) {
          setFavorites(favoritesData.map(fav => fav.bookId)); // お気に入りのIDをセット
        } else {
          console.error("Unexpected data format:", favoritesData);
        }
      } catch (error) {
        console.error("お気に入りの取得中にエラーが発生しました:", error);
      }
    };
  
    fetchFavorites();
  }, [signInUser, setFavorites]);

  useEffect(() => {
    const fetchOwnedBooks = async () => {
      if (!signInUser || !signInUser.uid) return;
  
      try {
        const response = await fetch(`/api/bookshelf?userId=${signInUser.uid}`);
        console.log('Response status:', response.status); // ステータスコードのログ
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          return;
        }
  
        const ownedBooksData = await response.json();
        console.log('Fetched ownedBooksData:', ownedBooksData);
  
        if (Array.isArray(ownedBooksData)) {
          console.log('Owned books before mapping:', ownedBooksData);
          const mappedBookIds = ownedBooksData.map(book => book.bookId); // bookIdをマッピング
          console.log('Mapped bookIds:', mappedBookIds); // デバッグ用ログ
          setOwnedBooks(mappedBookIds); // 所有する本のIDをセット
        } else {
          console.error("Unexpected data format:", ownedBooksData);
        }
      } catch (error) {
        console.error("本棚の取得中にエラーが発生しました:", error);
      }
    };
    fetchOwnedBooks();
  }, [signInUser, setOwnedBooks]);
  
=======

    fetchBooks();
  }, [keyword, page]);

>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  // ページ変更時に呼び出される関数
  const handleChange = (event, value) => {
    setPage(value); // 現在のページ番号を更新
  };

  // 現在のページに表示する書籍データを計算
  const paginatedBooks = books.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

<<<<<<< HEAD
  console.log("favorites", favorites); 
  console.log("ownedBooks", ownedBooks); 

=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  return (
    <div>
      {error ? (
        <p>{error}</p> // エラーメッセージがある場合に表示
      ) : (
        <>
          {/* 現在のページに表示する書籍データをリスト表示 */}
          {books.length > 0 ? (
            paginatedBooks.map((b, i) => (
<<<<<<< HEAD
              <LinkedBookDetails 
                book={b}
                index={i + 1} 
                key={b.id} 
                isFavorite={favorites.includes(b.id)} // お気に入り状態を渡す
                isOwned={ownedBooks.includes(b.id)} // 所有本の状態を渡す
                />
=======
              <LinkedBookDetails book={b} index={i + 1} key={b.id} />
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
            ))
          ) : (
            <p>書籍情報が見つかりませんでした。</p>
          )}

          {/* ページネーションコンポーネント */}
          <PaginationComponent
            page={page} // 現在のページ番号
            count={Math.ceil(books.length / booksPerPage)} // 総ページ数
<<<<<<< HEAD
            onChange={handleChange} 
          />
          {/* ページの下部に ReturnTopButton を追加 */}
          <ReturnTopButton />
=======
            onChange={handleChange} // ページ変更時に呼び出される関数
          />
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
        </>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
