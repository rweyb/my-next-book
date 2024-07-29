import { FaBook } from "react-icons/fa6";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { OwnedBooksState } from "@state/OwnedBooksState";

const MyBooksButton = () => {
  // OwnedBooksState からタイトルを取得
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const [myBook, setMyBook] = useState(false);

  // ボタンがクリックされたときの処理
  const handleClick = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ

    const bookId = "exampleBookId"; // ここで実際の本のIDを使用
    if (myBook) {
      const newOwnedBooks = ownedBooks.filter(id => id !== bookId);
      setOwnedBooks(newOwnedBooks);
      console.log('本棚から削除:', newOwnedBooks);
    } else {
      const newOwnedBooks = [...ownedBooks, bookId];
      setOwnedBooks(newOwnedBooks);
      console.log('本棚に追加:', newOwnedBooks);
    }
    setMyBook(!myBook);
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaBook color={myBook ? 'yellow' : 'grey'} />
    </button>
  );
};

export default MyBooksButton;
