import { useEffect, useState } from 'react';

export default function Home() {
  // おすすめの本のデータを保存するためのステートを定義します。
  const [recommendations, setRecommendations] = useState([]);

  // コンポーネントがマウントされたときにAPIを呼び出してデータを取得します。
  useEffect(() => {
    fetch('/api/recommendations')
      .then(response => response.json())
      .then(data => setRecommendations(data));
  }, []);

  return (
    <div>
      <h1>おすすめの本</h1>
      <ul>
        {recommendations.map(book => (
          // 各本のタイトルをリストアイテムとして表示します。
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
