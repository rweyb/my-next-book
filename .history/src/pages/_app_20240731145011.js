import { RecoilRoot , useRecoilState} from 'recoil';
import { useEffect } from 'react';
import { signInUserState } from '@state/signInUserState';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  );
}

function AppContent(props) {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);

  useEffect(() => {
    // ローカルストレージからサインインユーザー情報を取得
    const storedUser = localStorage.getItem('signInUser');
    if (storedUser) {
      setSignInUser(JSON.parse(storedUser));
    }
  }, [setSignInUser]);

  return <Component {...props} />;
}

export default MyApp;
