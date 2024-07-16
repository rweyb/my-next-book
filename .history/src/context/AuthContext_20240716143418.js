import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/config';

// 認証コンテキストを作成
const AuthContext = createContext();

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }) {
     // ユーザー状態を管理するためのステート
    const [user, setUser] = useState(null);

    useEffect(() => {
    // Firebaseの認証状態の変更を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
     // クリーンアップ関数を返す
    return () => unsubscribe();
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
