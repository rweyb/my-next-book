"use client";

import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { recommendationsState } from "@/state/recommendationsState";
import ReturnTopButton from "@/components/ReturnTopButton";
import Image from 'next/image';

// おすすめの本を表示するコンポーネント
export default function Recommendations() {
  const [recommendations, setRecommendations] = useRecoilState(recommendationsState); 
  const signInUser = useRecoilValue(signInUserState); 
  const [error, setError] = useState(null);
  
  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!signInUser?.uid) return; // ユーザーIDがない場合は何もしない

      try {
        const response = await fetch('/api/recommendations');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error("おすすめの本の取得に失敗しました:", error);
        setError("おすすめの本の取得に失敗しました。"); // エラー状態にセット
      }
    };

    fetchRecommendations(); // おすすめの本を取得する関数を呼び出し
  }, [signInUser?.uid, setRecommendations]); // ユーザーIDが変更されるたびに再実行

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6">おすすめの本</h1>
      {error && <p className="text-red-500">{error}</p>} {/* エラーメッセージを表示 */}
      <ul>
        {recommendations.map((book) => (
          <li key={book.id} className="mb-4">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p>{book.author}</p>
            <p>価格: ¥{book.price}</p>
            <p>出版社: {book.publisher}</p>
            <p>出版日: {new Date(book.published).toLocaleDateString()}</p>
            {book.image && (
              <Image 
                src={book.image} 
                alt={book.title} 
                width={120} 
                height={160} // 適切な高さを設定
                className="object-cover" // 画像が枠に収まるように調整
              />
            )}
          </li>
        ))}
      </ul>
      <ReturnTopButton />
    </div>
  );
}