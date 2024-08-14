"use client";

import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
import { getBookById, getReviewById } from "@lib/getter";
import { useState, useEffect } from "react";

export default function EditPage({ params }) {
  const [book, setBook] = useState({});
  const [review, setReview] = useState({});
  // ログイン状態を監視し、ログインしていない場合はモーダルを表示

  useEffect(() => {
    const fetchBooks = async () => {
      if (!params.id) {
        return;
      }

      let book_byid = await getBookById(params.id);
      console.log("book_byid", book_byid);
      let review_byid = {}; //await getReviewById(params.id);
      setBook(book_byid);
      setReview(review_byid);
    };

    fetchBooks();
  }, [params.id]);

  if (!book) {
    return <p>Book not found.</p>; // 書籍が見つからない場合のメッセージ
  }

  //「YYYY-MM-DD」形式の日付を生成
  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />

      {/*編集フォームを生成 */}
      <FormEdit src={{ id: book.id, read, memo: review?.memo }} />
    </div>
  );
}
