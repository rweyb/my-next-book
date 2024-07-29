import { RecoilRoot } from 'recoil';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  );
}

export default MyApp;
