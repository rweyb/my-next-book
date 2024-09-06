"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@/state/signInUserState";
import Image from "next/image";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import styles from "@/components/Home.module.css";


//ホームページコンポーネント
export default function HomePage() {
  // ルーターを使用してページ遷移を管理
  const router = useRouter();
  //Recoilからログイン状態を取得
  const signInUser = useRecoilValue(signInUserState);
  //モーダルの開閉状態を管理
  const [ isLoginModalOpen, setIsLoginModalOpen] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
    // スクロールを無効にする
    document.body.style.overflow = 'hidden';

    return () => {
      // コンポーネントがアンマウントされたときにスクロールを元に戻す
      document.body.style.overflow = 'auto';
    };
  }, []);
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
 
  // ログイン状態を監視し、ログインしていない場合はモーダルを表示
  useEffect(() => {
    if (!signInUser) {
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
    }
  }, [signInUser]);

  //モーダルを閉じる処理
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    // モーダルを閉じた後にホームページにリダイレクト
    router.push("/");
  }

  // ログイン状態を確認中の表示
  if (!signInUser && !isLoginModalOpen) {
    return <p>Loading...</p>;
  }

  //ユーザーがログインしている場合のホームページの内容
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src="/images/logo1.png"
<<<<<<< HEAD
          alt="MyAppのロゴ"
          fill
          style={{ objectFit: 'cover' }}
          priority
=======
          alt="Logo"
          fill
          style={{ objectFit: 'cover' }}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
        />
      </div>
      {/*ログインモーダルの表示*/}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginForm closeLoginModal={closeLoginModal} />
      </Modal>
    </div>
  );
}