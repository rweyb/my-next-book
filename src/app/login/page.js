import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const { login } = useAuth();

    const onSubmit = data => {
    console.log(data);
    login();
    router.push('/'); // ログイン後にホームページにリダイレクト
    };

return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                ユーザー名
                </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ユーザー名"
                {...register('username', { required: true })}
            />
            {errors.username && <p className="text-red-500 text-xs italic">ユーザー名を入力してください。</p>}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                パスワード
                </label>
            <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                {...register('password', { required: true })}
            />
            {errors.password && <p className="text-red-500 text-xs italic">パスワードを入力してください。</p>}
            </div>

            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                サインイン
                </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            パスワードを忘れましたか？
            </a>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
        ©2020 Acme Corp. All rights reserved.
        </p>
    </div>
    );
}
