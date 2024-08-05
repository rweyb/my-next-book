'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { signInUserState } from '@/lib/getter';

export default function FormEdit({ src: { id, read, memo } }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const user = useRecoilValue(signInUserState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('userId', user?.uid);

        try {
            await fetch(`/api/review/${id}`, {
                method: 'POST',
                body: formData,
            });
            console.log('Review added successfully');
            router.push('/');  // リダイレクト
        } catch (error) {
            console.error('Failed to add review:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setIsDeleting(true);

        try {
            await fetch(`/api/review/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            console.log('Review removed successfully');
            router.push('/');  // リダイレクト
        } catch (error) {
            console.error('Failed to remove review:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={id} />
            <div className="mb-3">
                <label className="font-bold" htmlFor="read">読了日 :</label>
                <input type="date" id="read" name="read" 
                    className="block bg-gray-100 border-2 border-gray-600 rounded focus:bg-white
                    focus:outline-none focus:border-red-500"
                    defaultValue={read} />
            </div>

            <div className="mb-3">
                <label className="font-bold" htmlFor="memo">感想 :</label>
                <textarea id="memo" name="memo" rows="3"
                    className="block bg-gray-100 border-2 border-gray-600 w-full rounded
                    focus:bg-white focus:outline-none focus:border-red-500"
                    defaultValue={memo}></textarea>
            </div>

            <button type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500">
                登録
            </button>

            <button type="button"
                className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500"
                onClick={handleDelete}
                disabled={isDeleting}>
                削除
            </button>
        </form>
    );
}
