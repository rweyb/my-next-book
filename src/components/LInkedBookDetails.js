import Link from "next/link";
import BookDetails from "./BookDetails";
import FavoriteButton from "./FavoriteButton";
import MyBooksButton from "./MyBooksButton";

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
            <Link href={'/favorites'}>
                <FavoriteButton bookId={book.id} /> {/* FavoriteButtonを右下に配置 */}
            </Link>
                
            <Link href={'/bookshelf'}>
                    <MyBooksButton /> {/* MyBooksButtonを右下に配置 */}
            </Link>
            </div>
        </div>
    );
}