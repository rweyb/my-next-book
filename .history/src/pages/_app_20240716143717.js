import { AuthProvider } from '@/context/AuthContext'; // 認証コンテキストプロバイダーをインポート
import '@/styles/globals.css'; // グローバルCSSをインポート

// MyAppコンポーネント
function MyApp({ Component, pageProps }) {
    return (
    <AuthProvider> {/* 認証コンテキストプロバイダーでラップ */}
      <Component {...pageProps} /> {/* 現在のページコンポーネントを表示 */}
    </AuthProvider>
);
}

export default MyApp; // MyAppコンポーネントをエクスポート