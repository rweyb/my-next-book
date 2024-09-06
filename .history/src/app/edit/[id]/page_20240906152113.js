"use client";

import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
import ReturnTopButton from "@/components/ReturnTopButton";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { returnJson } from "./returnJson";

export default function EditPage({ params }) {
  const [book, setBook] = useState(null);
  const [review, setReview] = useState(null);
  const signInUser = useRecoilValue(signInUserState);
  console.log("Current signInUser:", signInUser);

  // 必要なプロパティが存在するか確認
  const userId = signInUser?.uid; // ここでは uid を使用

  useEffect(() => {
    const fetchBooks = async () => {
      if (!params.id || !userId) {
        return;
      }

      try {
        /*google books apiリクエスト制限のためコメントアウト
        // 書籍情報を取得する API 呼び出し
        const bookResponse = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${params.id}`
        );
        console.log(
          "URL:",
          `https://www.googleapis.com/books/v1/volumes/${params.id}`
        );
        console.log("Book response status:", bookResponse.status);
        if (!bookResponse.ok) {
          throw new Error("Failed to fetch book data");
        }
        const bookData = await bookResponse.json();
        */
        const bookData = returnJson;

        let author = "";
        if (bookData.volumeInfo) {
          if (bookData.volumeInfo.author) {
            author = bookData.volumeInfo.author;
          } else if (bookData.volumeInfo.authors) {
            author = bookData.volumeInfo.authors[0];
          }
        }

        setBook({
          image: bookData.volumeInfo.imageLinks.thumbnail,
          title: bookData.volumeInfo.title,
          author: author,
          publisher: bookData.volumeInfo.publisher,
          published: bookData.volumeInfo.publishedDate,
        });

        // レビュー情報を取得する API 呼び出し
        const reviewResponse = await fetch(
          `/api/reviews?userId=${userId}&bookId=${params.id}`
        );
        console.log("Review response status:", reviewResponse.status);
        if (!reviewResponse.ok) {
          throw new Error("Failed to fetch review data");
        }
        const reviewData = await reviewResponse.json();
        console.log("Review data:", reviewData);
        setReview(reviewData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // エラーハンドリングの追加
        setBook(null);
        setReview(null);
      }
    };

    fetchBooks();
  }, [params.id, userId, signInUser]); 

  // `book` が存在する場合にのみ `FormEdit` をレンダリング
  if (!book) {
    return <p>Book not found.</p>; // 書籍が見つからない場合のメッセージ
  }

  //「YYYY-MM-DD」形式の日付を生成
  const readDate = review?.read ? new Date(review.read) : new Date();
  const read = readDate.toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
      <FormEdit src={{ id: params.id, read, memo: review?.memo, book }} />
      <ReturnTopButton />
    </div>
  );
}
