'use client'

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpWithEmail } from '@/lib/firebase/apis/auth';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { signInUserState } from '@/state/signInUserState'; // Firebase設定ファイルからauthをインポート
import { auth } from "@/lib/firebaseConfig";
import { useRecoilState } from 'recoil';
import Modal from './Modal';
import styles from './LoginForm.module.css';

// サインアップ画面
export default function SignUpScreen({ closeLoginModal = () => {} }) {

  const router = useRouter();
  const { handleSubmit, register, getValues, formState: { errors, isSubmitting } } = useForm();
  const [password, setPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [signInUser, setSignInUser] = useRecoilState(signInUserState); // Recoilの状態を使用

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Form data:", data); // フォームデータをログ出力
      const result  = await signUpWithEmail({
        auth,
        email: data.email,
        password: data.password,
      });

      if (result ) {
        alert('サインアップ成功: ' + result .message); // サインアップ成功時の通知
        //ユーザー情報を更新
        setSignInUser({ uid: result .user.uid });//ユーザー情報を更新
        localStorage.setItem("isLoggedIn", "true"); // ログイン状態をローカルストレージに保存
        router.push('/'); // サインアップ成功後ホームページににリダイレクト
      } else {
        alert('サインアップ失敗: ' + result .message); // サインアップ失敗時の通知
      }
    } catch (error) {
      console.error("Error during sign up:", error); // エラーログを詳細に
      alert('サインアップに失敗しました'); // サインアップ処理中のエラー時の通知
    }
      closeLoginModal(); // モーダルを閉じる処理
  });

  const passwordClick = () => setPassword(!password); // パスワード表示/非表示の切り替え
  const confirmClick = () => setConfirm(!confirm); // パスワード確認表示/非表示の切り替え

  return (
    <Modal isOpen={true} onClose={closeLoginModal}>
      <div className={`${styles.panel} ${styles.fadeIn} h-screen flex p-4 flex-col items-center justify-center`}>
        <form onSubmit={onSubmit} className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-700">新規登録</h2>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: '必須項目です',
                maxLength: {
                  value: 50,
                  message: '50文字以内で入力してください',
                },
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/,
                  message: 'メールアドレスの形式が違います',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
            <div className="relative">
              <input
                id="password"
                type={password ? 'text' : 'password'}
                {...register('password', {
                  required: '必須項目です',
                  minLength: {
                    value: 8,
                    message: '8文字以上で入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                    message: '半角英数字かつ少なくとも1つの大文字を含めてください',
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
              <button
                type="button"
                onClick={passwordClick}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
              >
                {password ? <FaEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">パスワード確認</label>
            <div className="relative">
              <input
                id="confirm"
                type={confirm ? 'text' : 'password'}
                {...register('confirm', {
                  required: '必須項目です',
                  minLength: {
                    value: 8,
                    message: '8文字以上で入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                    message: '半角英数字かつ少なくとも1つの大文字を含めてください',
                  },
                  validate: (value) => value === getValues('password') || 'パスワードが一致しません',
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
              <button
                type="button"
                onClick={confirmClick}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
              >
                {confirm ? <FaEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirm && <p className="text-sm text-red-600">{errors.confirm.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-600"
            disabled={isSubmitting}
          >
            新規登録
          </button>

          <NextLink href="/login">
            <span className="block w-full px-4 py-2 mt-4 text-center text-black bg-white border border-gray-300 rounded hover:bg-gray-100">
              ログインはこちらから
            </span>
          </NextLink>
        </form>
      </div>
    </Modal>
  );
}