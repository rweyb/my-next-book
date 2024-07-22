import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
            signOut as firebaseSignOut} from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

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
export const signUpWithEmail =async (args) => {
    //初期結果を設定
    let result = { isSuccess: false, message: ''}
    try {
         // Firebaseの新規ユーザー登録関数を呼び出し
        const user = await createUserWithEmailAndPassword(
            auth,
            args.email,
            args.password
        )

        // サインアップ成功時の処理
        if (user) {
            result = { isSuccess: true, message: '新規登録に成功しました' }
        }
    } catch (error) {
        // エラーハンドリング
        if (error.code === 'auth/email-already-in-use') {
            result = {
            isSuccess: false,
            message: 'メールアドレスが既に使用されています',
            }
        } else {
            result = { isSuccess: false, message: '新規登録に失敗しました' }
        }
        }
        // 結果を返す
        return result
}

// ログアウト処理を行う関数
export const logout = async () => {
    // 初期結果を設定
    let result = { isSuccess: false, message: '' }

    // Firebaseのサインアウト関数を呼び出し
    await  firebaseSignOut(auth)
        .then(() => {
        result = { isSuccess: true, message: 'ログアウトしました' }
        })
        .catch((error) => {
        result = { isSuccess: false, message: error.message }
        })
    // 結果を返す
    return result
}