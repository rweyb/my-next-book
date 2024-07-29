import { getAllReviews } from '@lib/getter';
import ReviewsList from '@/components/ReviewsList';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
    try {
        const reviews = await getAllReviews(); // すべてのレビューを取得
        console.log(reviews); // デバッグ用にレビューをコンソールに出力

        return (
            <div>
                <h1>レビュー一覧</h1>
                {reviews.length === 0 ? ( // レビューがない場合の表示
                    <p>現在、レビューはありません。</p>
                ) : ( // レビューがある場合の表示
                    <ReviewsList reviews={reviews} />
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching reviews:", error); // エラーハンドリング
        return <p>レビューの取得中にエラーが発生しました。</p>; // エラー発生時の表示
    }
}