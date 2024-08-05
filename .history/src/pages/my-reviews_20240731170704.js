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
    console.log("signInUser inside useEffect:", signInUser); // デバッグ用ログ

    const fetchData = async () => {
      if (signInUser?.uid) {
        try {
          // サインインしているユーザーIDを使ってレビューを取得
          const response = await fetch(`/api/review?userId=${signInUser.uid}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("User is not signed in");
      }
    };

    fetchData();
  }, [signInUser]);

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
