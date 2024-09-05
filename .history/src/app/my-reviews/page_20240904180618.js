"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import ReviewsList from "@/components/ReviewsList";
import ReturnTopButton from "@/components/ReturnTopButton";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  // Recoilの状態からサインインユーザーの情報を取得
  const signInUser = useRecoilValue(signInUserState);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (signInUser?.uid) {
        try {
          const filter = "all"; // 必要に応じて 'mine' や 'others' に変更
          const response = await fetch(
            `/api/reviews?userId=${signInUser.uid}&filter=${filter}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("データの取得に失敗しました。");
        }
      } else {
        setError("サインインしてください。");
      }
    };

    fetchData();
  }, [signInUser]);

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">レビュー一覧</h1>
      
      {error ? (
        <p>{error}</p>
      ) : signInUser?.uid ? (
        reviews.length === 0 ? (
          <p>現在、レビューはありません。</p>
        ) : (
          <ReviewsList reviews={reviews} />
        )
      ) : (
        <p>サインインしてください。</p>
      )}
      <ReturnTopButton /> {/* トップに戻るボタンを追加 */}
    </div>
  );
}