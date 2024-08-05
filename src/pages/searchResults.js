'use client'; // このコンポーネントはクライアントサイドで実行されることを示します

import React, { useState } from 'react'; // ReactとuseStateフックをインポート
import { useRecoilValue } from 'recoil'; // RecoilからuseRecoilValueフックをインポート
import { OwnedBooksState } from '../state/OwnedBooksState'; // 自分が持っている本の状態管理をインポート
import { getBooksByKeyword } from '../api/booksApi'; // 書籍検索API関数をインポート
import { TextField, Button } from '@mui/material'; // MUIのコンポーネントをインポート

const SearchResults = () => {
  // 検索クエリの状態を管理するためのuseStateフック
  const [searchQuery, setSearchQuery] = useState('');
  // 検索結果の状態を管理するためのuseStateフック
  const [searchResults, setSearchResults] = useState([]);
  // Recoilの状態から持っている本のデータを取得
  const ownedBooks = useRecoilValue(OwnedBooksState);

  // 検索ボタンがクリックされたときに呼ばれる関数
  const handleSearch = async () => {
    // 検索クエリが空でないことを確認
    if (searchQuery.trim()) {
      try {
        // APIを呼び出して書籍を検索
        const results = await getBooksByKeyword(searchQuery);
        // 取得した書籍情報を検索結果として保存
        setSearchResults(results);
      } catch (error) {
        // エラーログをコンソールに出力
        console.error("書籍情報の取得中にエラーが発生しました:", error);
        // エラーが発生した場合は空の配列をセット
        setSearchResults([]);
      }
    }
  };

  return (
    <div>
      {/* テキストフィールドコンポーネント */}
      <TextField
        label="書籍を検索" // テキストフィールドのラベル
        variant="outlined" // テキストフィールドのバリアント
        value={searchQuery} // テキストフィールドの値
        onChange={(e) => setSearchQuery(e.target.value)} // 入力変更時に検索クエリを更新
      />
      {/* 検索ボタンコンポーネント */}
      <Button onClick={handleSearch} variant="contained" color="primary">
        検索
      </Button>
      {/* 検索結果のリスト */}
      <ul>
        {searchResults.map(book => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>著者: {book.author}</p>
            {/* 自分が持っている本の確認 */}
            {ownedBooks.some(ownedBook => ownedBook.id === book.id) ? (
              <span>✓ 所有</span>
            ) : (
              <span>✗ 所有していない</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
