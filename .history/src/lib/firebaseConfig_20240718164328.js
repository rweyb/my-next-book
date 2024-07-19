import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTnzC0GTR3HA7BQr9Ykar0ZyJdd4_qLkQ",
  authDomain: "reading-6fc0e.firebaseapp.com",
  projectId: "reading-6fc0e",
  storageBucket: "reading-6fc0e.appspot.com",
  messagingSenderId: "278937799140",
  appId: "1:278937799140:web:dfa2f2014d3d221e371ff1"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);