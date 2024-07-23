import { FaBook } from "react-icons/fa6";

export default function MyBooksButton() {
    const [favorites, setFavorites] = useRecoilState(FavoritesBookState);
}

return (
    <button onClick={handleClick}>
      <FaBook color={isFavorite ? 'red' : 'grey'} />
    </button>
  );