
import LinkedBookDetails from '@/components/LInkedBookDetails';
import { getBooksByKeyword } from '@lib/getter';

// ルートパラメーターparamsを取得
export default async function BookResult({ params }) {
    const keyword = params.keyword;

    //与えられたキーワードで書籍情報を検索
    try {
        const books = await getBooksByKeyword(keyword);

        return (
            <>
            {/* 取得した書籍をリスト表示 */}
            {books.map((b, i) => (
                <LinkedBookDetails book={b} index={i + 1} key={b.id} />
            ))}
            </>
        );
    } catch (error) {
        console.error("Error fetching books:", error);
        return <p>書籍情報の取得に失敗しました。もう一度お試しください。</p>;
    }
}