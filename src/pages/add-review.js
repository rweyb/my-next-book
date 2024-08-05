// src/pages/add-review.js
import React, { useState } from "react";

export default function AddReviewPage() {
  const [content, setContent] = useState(""); // レビュー内容の状態
  const [userId, setUserId] = useState("dummy-user-id"); // 実際のユーザーIDに置き換える必要がある

  // フォームの送信処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページのリロードを防ぐ

    try {
      // APIエンドポイントにPOSTリクエストを送信
      const response = await fetch("/api/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content }),
      });
      
      // レスポンスをJSON形式で取得
      const data = await response.json();
      console.log("Review added:", data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review here..."
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}
