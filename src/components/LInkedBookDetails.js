import Link from "next/link";
import BookDetails from "./BookDetails";
import FavoriteButton from "./FavoriteButton";

export default function LinkedBookDetails({ index, book }) {
    //BookDetailsコンポーネントにリンクを付与
    return (
        <div className="relative hover:bg-green-50 p-4 border-b">
        <Link href={`/edit/${book.id}`}>
            <div>
                <BookDetails index={index} book={book} />
            </div>
        </Link>
        <div className="absolute bottom-2 right-2">
                <FavoriteButton bookId={book.id} /> {/* FavoriteButtonを右下に配置 */}
            </div>
        </div>
    );
}