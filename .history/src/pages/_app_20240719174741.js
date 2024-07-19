import { AuthProvider } from '@/context/AuthContext'
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RecoilRoot>
      <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;