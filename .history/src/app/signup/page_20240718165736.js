'use client'

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpWithEmail } from '@/lib/firebase/apis/auth';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

// サインアップ画面
export default function SignUpScreen() {
  const router = useRouter();
  const { handleSubmit, register, getValues, formState: { errors, isSubmitting } } = useForm();
  const [password, setPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を追跡するためのステート

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signUpWithEmail({
        email: data.email,
        password: data.password,
      });

      if (res) {
        alert('サインアップ成功: ' + res.message); // サインアップ成功時の通知
        
        setIsLoggedIn(true); // ログイン状態を更新
        router.push('/'); // サインアップ成功後ホームページににリダイレクト
      } else {
        alert('サインアップ失敗: ' + res.message); // サインアップ失敗時の通知
      }
    } catch (error) {
      alert('サインアップに失敗しました'); // サインアップ処理中のエラー時の通知
    }
  });

  const passwordClick = () => setPassword(!password); // パスワード表示/非表示の切り替え
  const confirmClick = () => setConfirm(!confirm); // パスワード確認表示/非表示の切り替え

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">新規登録</h2>
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
        </form>
        <NextLink href="/signup">
        <span className="block w-full px-4 py-2 mt-4 text-center text-black bg-white border border-gray-300 rounded hover:bg-gray-100">
            ログインはこちらから
          </span>
        </NextLink>
      </div>
    </div>
  );
}
