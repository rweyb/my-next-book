"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@/state/signInUserState";
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signInUserState } from "@/state/signInUserState";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src="/images/logo1.png"
          alt="MyAppのロゴ"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      {/*ログインモーダルの表示*/}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginForm closeLoginModal={closeLoginModal} />
      </Modal>
    </div>
  );
}