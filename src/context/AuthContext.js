import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

// 認証コンテキストを作成
const AuthContext = createContext();

// 認証プロバイダーコンポーネント
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ユーザー状態を管理するためのステート

  useEffect(() => {
    // Firebaseの認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged user:, user');
      setUser(user); // ユーザー情報をステートに設定
    }, (error) => {
      console.error("Failed to authenticate user:", error); // エラーハンドリング
    });
    return () => unsubscribe(); // クリーンアップ関数を返す
  }, []);

  return (
    // 認証コンテキストプロバイダーを返す
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 認証コンテキストを使用するためのカスタムフック
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;