import BookDetails from "@/components/BookDetails";
import FormEdit from '@/components/FormEdit';
import { getBooksById, getReviewById } from "@lib/getter";

export default async function EditPage({ params }) {
    const book = await getBooksById(params.id);
    const review = await getReviewById(params.id);

    //「YYYY-MM-DD」形式の日付を生成
    const read = (review?.read || new Date()).toLocaleDateString('sv-SE');

    return (
        <div id="form">
            <BookDetails book={book} />
            <hr />

            {/*編集フォームを生成 */}
            <FormEdit src={{ id: book.id, read, memo: review?.memo}} />
        </div>
    );
}