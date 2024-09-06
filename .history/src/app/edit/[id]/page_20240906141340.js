"use client";

import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
<<<<<<< HEAD
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
=======
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

>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  if (!book) {
    return <p>Book not found.</p>; // 書籍が見つからない場合のメッセージ
  }

  //「YYYY-MM-DD」形式の日付を生成
<<<<<<< HEAD
  const readDate = review?.read ? new Date(review.read) : new Date();
  const read = readDate.toLocaleDateString("sv-SE");
=======
  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
<<<<<<< HEAD
      <FormEdit src={{ id: params.id, read, memo: review?.memo, book }} />
      <ReturnTopButton />
    </div>
  );
}
=======

      {/*編集フォームを生成 */}
      <FormEdit src={{ id: book.id, read, memo: review?.memo }} />
    </div>
  );
}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
