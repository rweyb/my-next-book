import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@context/AuthContext';

//ホームページコンポーネント
export default function HomePage() {
  // ルーターを使用してページ遷移を管理
  const router = useRouter();
  // 認証コンテキストからユーザー情報を取得
  const { user } = useAuth();

  //ユーザーがログインしていない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user]);
}

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl text-indigo-800 font-bold my-2">
        ホームページへようこそ！</h1>
    </div>
  );
}