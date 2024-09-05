"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@state/signInUserState";
import Image from 'next/image';

// おすすめの本を表示するコンポーネント
export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]); // おすすめの本の状態を管理
  const signInUser = useRecoilValue(signInUserState); // Recoilからサインインユーザーの情報を取得

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!signInUser?.uid) return; // ユーザーIDがない場合は何もしない

      try {
        // APIリクエストを送信しておすすめの本を取得
        const response = await fetch('/api/recommendations');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // レスポンスデータをJSONとして解析
        setRecommendations(data); // 取得したデータを状態にセット
      } catch (error) {
        console.error("おすすめの本の取得に失敗しました:", error); // エラーログ
      }
    };

    fetchRecommendations(); // おすすめの本を取得する関数を呼び出し
  }, [signInUser?.uid]); // ユーザーIDが変更されるたびに再実行

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">おすすめの本</h1>
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
                width={100} 
                height={150} // 適切な高さを設定
                className="object-cover" // 画像が枠に収まるように調整
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}