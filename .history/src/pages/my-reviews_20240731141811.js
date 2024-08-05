// src/pages/my-reviews.js
"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import ReviewsList from "@/components/ReviewsList";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  // Recoilの状態からサインインユーザーの情報を取得
  const signInUser = useRecoilValue(signInUserState);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (signInUser?.uid) {
          // サインインユーザーのIDをクエリパラメータとしてAPIに送信
          const response = await fetch(`/api/review?userId=${signInUser.uid}`);
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("User is not signed in");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 非同期関数を即時実行する
    fetchData();
  }, [signInUser?.uid]); // ユーザーIDが変わった場合にも再フェッチするようにする

  return (
    <div>
      <h1>レビュー一覧</h1>
      {signInUser?.uid ? ( // サインインしているユーザーがいる場合
        reviews.length === 0 ? ( // レビューがない場合の表示
          <p>現在、レビューはありません。</p>
        ) : (
          // レビューがある場合の表示
          <ReviewsList reviews={reviews} />
        )
      ) : (
        // サインインしていない場合
        <p>サインインしてください。</p>
      )}
    </div>
  );
}
