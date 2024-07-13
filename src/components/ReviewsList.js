"use client";

import LinkedBookDetails from "./LInkedBookDetails";

export default function ReviewsList({ reviews }) {
    // reviewsが存在しないか、空の配列である場合
    if (!reviews || reviews.length === 0) {
        return <p>No reviews available.</p>;
    }


    return (
    <>
        {reviews.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
        ))}
    </>
    );
}