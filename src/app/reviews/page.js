import { getAllReviews } from '@lib/getter';
import ReviewsList from '@/components/ReviewsList';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
    const reviews = await getAllReviews();
    console.log(reviews);

    return (
        <div>
            {reviews.length === 0 ? (
                <p>現在、レビューはありません。</p>
            ) : (
                <ReviewsList reviews={reviews} />
            )}
        </div>
    );
}