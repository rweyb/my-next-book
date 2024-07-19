'use client'

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmail } from '@/lib/firebase/apis/auth';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from '@/context/AuthContext';

// サインイン画面
export default function SignInScreen() {
  const router = useRouter(); // ルーターを使用するためのフック

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
  // パスワード表示/非表示の状態を管理
  const [show, setShow] = useState(false);
  // AuthContextからsetUserを取得
  const { setUser } = useContext(AuthContext);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // サインイン処理を実行し、結果を取得
      const res = await signInWithEmail({
        email: data.email,
        password: data.password,
      });

      if (res.isSuccess) {
        alert('サインイン成功: ' + res.message); // サインイン成功時の通知
        setAuthState({ isLoggedIn: true, user: res.user }); // ログイン状態を更新

        router.push('/'); // ログイン成功後にホームページリダイレクト
      } else {
        alert('サインイン失敗: ' + res.message); // サインイン失敗時の通知
      }
    } catch (error) {
      alert('サインインに失敗しました'); // サインイン処理中のエラー時の通知
    }
  });

  const handleClick = () => setShow(!show); // パスワード表示/非表示の切り替え

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">ログイン</h2>
        <form onSubmit={onSubmit} className="space-y-6">
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
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
            <div className="relative">
              <input
                id="password"
                type={show ? 'text' : 'password'}
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
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
              <button
                type="button"
                onClick={handleClick}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
              >
                {show ? <FaEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-600"
            disabled={isSubmitting}
          >
            ログイン
          </button>

          <NextLink href="/signup">
            <span className="block w-full px-4 py-2 mt-4 text-center text-black bg-white border border-gray-300 rounded hover:bg-gray-100">
              新規登録はこちらから
            </span>
          </NextLink>
        </form>
      </div>
    </div>
  );
}
