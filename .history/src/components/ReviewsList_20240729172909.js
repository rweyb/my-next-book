"use client";

import { useState, useEffect} from "react";
import LinkedBookDetails from "./LinkedBookDetails";

export default function ReviewsList({ reviews }) {

    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        // reviewsが正しく渡されているか確認
        if (reviews && reviews.length > 0) {
            setReviewData(reviews);
        }
    }, [reviews]);

    // reviewsが存在しないか、空の配列である場合
    if (!reviewData || reviewData.length === 0) {
        return <p>No reviews available.</p>;
    }


    return (
    <>
        {reviewData.map((review, index) => (
        <LinkedBookDetails book={review} index={index + 1} key={review.id} />
        ))}
    </>
    );
}