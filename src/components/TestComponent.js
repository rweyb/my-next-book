import React from 'react';
import { useRecoilValue } from 'recoil';
import { FavoritesListAtom } from '../state/FavoritesListAtom';

const TestComponent = ({ bookId }) => {
  const bookDetails = useRecoilValue(FavoritesListAtom(bookId));
  console.log('Book details:', bookDetails);

  return (
    <div>
      <h2>{bookDetails?.title}</h2>
    </div>
  );
};

export default TestComponent;
