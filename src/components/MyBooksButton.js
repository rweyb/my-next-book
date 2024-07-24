import { FaBook } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { OwnedBooksState } from "@state/OwnedBooksState";

 const MyBooksButton = () => {
    // OwnedBooksState からタイトルを取得
    const [title, setTitle] =useRecoilState(OwnedBooksState);
    // ボタンの状態を管理するための状態変数
  const [myBook, setMyBook] = useState(false);

  // ボタンがクリックされたときの処理
  const handleClick = () => {
    // 本棚ページへのナビゲーション（例としてコンソールにメッセージを表示）
    console.log(`Navigating to the bookshelf page for ${title}`);
    // ボタンの状態をトグル
    setMyBook(!myBook);
  };


return (
    <button onClick={handleClick}>
      <FaBook color={isFavorite ? 'yellow' : 'grey'} />
    </button>
  );
}
  export default MyBooksButton();