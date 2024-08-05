import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { OwnedBooksState } from '@state/OwnedBooksState';
import { fetchOwnedBooks } from './api/ownedBooksApi';

const Bookshelf = () => {
  // Recoil の状態とセット関数を取得
  const [ownedBooks, setOwnedBooks] = useRecoilValue(OwnedBooksState);

useEffect(() => {
  const loadOwnedBooks = async () => {
    // ユーザー ID を取得する方法に応じて変更
    const userId = 'current-user-id';
    // API を呼び出して持っている本のデータを取得
    const books = await fetchOwnedBooks(userId);
    // 取得した本のデータを Recoil の状態に保存
    setOwnedBooks(books);
  };
  // コンポーネントがマウントされた時に本のデータをロード
  loadOwnedBooks();
},[setOwnedBooks]);


return (
  <div>
    <h1>本棚</h1>
    <ul>
      {ownedBooks.map(book => (
        <li key={book.id}>
          <h2>{book.title}</h2>
          <p>著者: {book.author}</p>
          <p>出版社: {book.publisher}</p>
          {/* ここでその他の書籍情報を表示 */}
        </li>
      ))}
    </ul>
  </div>
);
};

export default Bookshelf;