import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/apis/auth';

// 認証コンテキストを作成
const AuthContext = createContext();

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // ユーザー状態を管理するためのステート

    useEffect(() => {
        // Firebaseの認証状態の変更を監視
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user); // ユーザー情報をステートに設定
    });
    return () => unsubscribe(); // クリーンアップ関数を返す
}, []);

    return (
        // 認証コンテキストプロバイダーを返す
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

// 認証コンテキストを使用するためのカスタムフック
export function useAuth() {
    return useContext(AuthContext);
}