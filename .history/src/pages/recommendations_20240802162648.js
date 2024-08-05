import { useEffect, useState } from 'react';

// おすすめの本を表示するコンポーネント
export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]); // おすすめの本の状態を管理
  const [userId, setUserId] = useState(''); // ユーザーIDを状態として管理

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return; // ユーザーIDがない場合は何もしない

      try {
        // APIリクエストを送信しておすすめの本を取得
        const response = await fetch(`/api/recommendations?userId=${userId}`);
        const data = await response.json(); // レスポンスデータをJSONとして解析
        setRecommendations(data); // 取得したデータを状態にセット
      } catch (error) {
        console.error('おすすめの本の取得に失敗しました:', error); // エラーログ
      }
    };

    fetchRecommendations(); // おすすめの本を取得する関数を呼び出し
  }, [userId]); // ユーザーIDが変更されるたびに再実行

  return (
    <div>
      <h1>おすすめの本</h1>
      <ul>
        {recommendations.map(book => (
          <li key={book.id}>{book.title}</li> // おすすめの本のタイトルをリスト表示
        ))}
      </ul>
    </div>
  );
}
