import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { OwnedBooksState } from '@state/OwnedBooksState';
import { fetchOwnedBooks } from './api/ownedBooksApi';

const Bookshelf = () => {
  // Recoil の状態とセット関数を取得
  const [ownedBooks, setOwnedBooks] = useRecoilValue(OwnedBooksState);
  return (
    <div>
      <h1>本棚</h1>
      {/* 他のコンテンツ */}
    </div>
  );
};

export default Bookshelf;