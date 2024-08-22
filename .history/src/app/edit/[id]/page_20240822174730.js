"use client";

import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
import { useState, useEffect } from "react";

export default function EditPage({ params }) {
  const [book, setBook] = useState(null);
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!params.id) return;

      try {
        // 書籍情報を取得する API 呼び出し
        const bookResponse = await fetch(`/api/books/${params.id}`);
        if (!bookResponse.ok) {
          throw new Error("Failed to fetch book data");
        }
        const bookData = await bookResponse.json();
        setBook(bookData);

        // レビュー情報を取得する API 呼び出し
        const reviewResponse = await fetch(`/api/reviews?userId=${params.id}`);
        if (!reviewResponse.ok) {
          throw new Error("Failed to fetch review data");
        }
        const reviewData = await reviewResponse.json();
        setReview(reviewData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // エラーハンドリングの追加
        setBook(null);
        setReview(null);
      }
    };

    fetchBooks();
  }, [params.id]);

 

  //「YYYY-MM-DD」形式の日付を生成
  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
      <FormEdit src={{ id: book.id, read, memo: review?.memo }} />
    </div>
  );
}
