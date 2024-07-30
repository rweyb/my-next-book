import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ReviewForm = ({ userId }) => {
    // フォームの入力値を管理するための状態
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: 0,
        publisher: '',
        published: '',
        image: '',
        memo: ''
    });
    // ルーターオブジェクトを使ってリダイレクト処理を行う
    const router = useRouter();

    // 入力値が変更されたときに状態を更新
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // フォームが送信されたときの処理
    const handleSubmit = async (e) => {
        e.preventDefault(); // デフォルトのフォーム送信動作を防ぐ

        try {
            // APIエンドポイントにPOSTリクエストを送信
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, userId }) // フォームデータとユーザーIDを送信
            });

            // レスポンスが成功した場合
            if (response.ok) {
                alert('レビューが追加されました！');
                router.push('/reviews'); // レビュー一覧ページにリダイレクト
            } else {
                alert('レビューの追加に失敗しました');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('レビューの追加にエラーが発生しました');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="タイトル" onChange={handleChange} required />
            <input type="text" name="author" placeholder="著者" onChange={handleChange} required />
            <input type="number" name="price" placeholder="価格" onChange={handleChange} required />
            <input type="text" name="publisher" placeholder="出版社" onChange={handleChange} required />
            <input type="date" name="published" placeholder="発行日" onChange={handleChange} required />
            <input type="text" name="image" placeholder="画像URL" onChange={handleChange} />
            <textarea name="memo" placeholder="メモ" onChange={handleChange} />
            <button type="submit">レビューを登録</button>
        </form>
    );
};

export default ReviewForm;
