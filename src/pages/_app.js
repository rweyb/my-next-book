import { RecoilRoot } from 'recoil';
import { AuthProvider } from '@/context/AuthContext';
import '../app/globals.css';

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
