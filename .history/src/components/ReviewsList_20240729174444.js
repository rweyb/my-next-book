"use client";

import React from "react";
import LinkedBookDetails from "./LinkedBookDetails";

export default function ReviewsList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews available.</p>;
    }

    return (
    <>
        {reviews.map((review, index) => (
        <LinkedBookDetails book={review} index={index + 1} key={review.id} />
        ))}
    </>
    );
}