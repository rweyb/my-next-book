import {
    createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,
    signOut} from 'firebase/auth';
import { auth } from '@/lib/config';

//EmailとPasswordでサインインする関数
export const signInWithEmail = async(args) => {
    //初期結果を設定
    let result = { isSuccess: false,message: ''}
    try {
        //Firebaseのサインイン関数を呼び出し
        const user = await signInWithEmailAndPassword(
            auth,
            args.email,
            args.password
        )

        //サインイン成功時の処理
        if (user) {
            result = { isSuccess: true, message: 'ログインに成功しました'}
        }
    } catch (error) {
        //エラーハンドリング
        if (error.code === 'auth/user-not-found') {
            result = { isSuccess: false, message: 'ユーザーが見つかりませんでした'
            }
        } else if (error.code === 'auth/wrong-password') {
            result = { isSuccess: false, message: 'パスワードが間違っています' }
        } else {
            result = { isSuccess: false, message: 'ログインに失敗しました' }
        }
    }
    //結果を返す
    return result
}

// EmailとPasswordでサインアップする関数
