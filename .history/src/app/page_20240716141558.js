import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@context/AuthContext';


export default function Home() {
  return (
    <div>
      <h1 className="text-4xl text-indigo-800 font-bold my-2">
        ホームページへようこそ！</h1>
    </div>
  );
}