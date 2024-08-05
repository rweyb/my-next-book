'use client';

import { useRouter } from 'next/navigation';
import { addReview, removeReview } from '@/lib/actions';
import { useAuth } from '@/context/AuthContext';

export default function FormEdit({ src: { id, read, memo } }) {
    const { user } = useAuth();
    const router = useRouter();

    // フォームのサブミットハンドラー
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('userId', user?.uid); // ユーザーIDを追加

        try {
            await addReview(formData); // レビュー追加
            console.log('Review added successfully');
            // レビュー追加後のリダイレクト
            router.push('/');
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    };

    // 削除ボタンのクリックハンドラー
    const handleDelete = async () => {
        try {
            // 削除リクエストを送信
            const response = await fetch(`/api/review/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Review removed successfully');
                // 削除後のリダイレクト
                router.push('/');
            } else {
                console.error('Failed to remove review:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to remove review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={id} />
            <div className="mb-3">
                <label className="font-bold" htmlFor="read">読了日 :</label>
                <input
                    type="date"
                    id="read"
                    name="read"
                    className="block bg-gray-100 border-2 border-gray-600 rounded focus:bg-white focus:outline-none focus:border-red-500"
                    defaultValue={read}
                />
            </div>
            <div className="mb-3">
                <label className="font-bold" htmlFor="memo">感想 :</label>
                <textarea
                    id="memo"
                    name="memo"
                    rows="3"
                    className="block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-red-500"
                    defaultValue={memo}
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500"
            >
                登録
            </button>
            <button
                type="button"
                className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500"
                onClick={handleDelete}
            >
                削除
            </button>
        </form>
    );
}
