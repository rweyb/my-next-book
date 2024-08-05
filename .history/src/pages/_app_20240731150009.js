import { RecoilRoot , useRecoilState} from 'recoil';
import { useEffect } from 'react';
import { signInUserState } from '@state/signInUserState';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <RecoilRoot>
        <AppContent Component={Component} pageProps={pageProps} />
      </RecoilRoot>
  );
}
function AppContent({ Component, pageProps }) {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);

  useEffect(() => {
    // ローカルストレージからサインインユーザー情報を取得
    const storedUser = localStorage.getItem('signInUser');
    if (storedUser) {
      setSignInUser(JSON.parse(storedUser));
    } else {
      console.log("No user found in local storage");
    }
  }, [setSignInUser]);

  console.log("Current signInUser state:", signInUser);

  return <Component {...pageProps} />;
}

export default MyApp;