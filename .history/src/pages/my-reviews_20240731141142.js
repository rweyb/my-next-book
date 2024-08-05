"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { getAllReviews } from "@lib/getter";
import ReviewsList from "@/components/ReviewsList";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  // Recoil の状態からサインインユーザーの情報を取得
  const signInUser = useRecoilValue(signInUserState);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // ここで getAllReviews の内容を取得して、setReviews　で reviews にセットする
    // さらに、ここでは my-reviews なので、自分の投稿のみ取得できるようにする
    const fetchData = async () => {
      try {
        const rev = await getAllReviews();
        setReviews(rev);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 非同期関数を即時実行する
    fetchData();
  }, []);

  try {
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
  } catch (error) {
    console.error("Error fetching reviews:", error); // エラーハンドリング
    return <p>レビューの取得中にエラーが発生しました。</p>; // エラー発生時の表示
  }
}