"use client";

import React, { useState, useEffect } from "react";
import LinkedBookDetails from "./LinkedBookDetails";
import { useRecoilValue } from 'recoil';
import { signInUserState } from "@state/signInUserState";
export default function ReviewsList() {
    //レビュー状態を管理
    const [reviews, setReviews] = useState([]);
    // フィルタリング状態 ('all', 'mine', 'others')
    const [filter, setFilter] = useState('all');
    // サインインユーザーの取得
    const signInUser = useRecoilValue(signInUserState);

    // フィルタリングに基づいてレビューをフェッチ
    useEffect(() => {
        async function fetchReviews() {
            // デフォルトのURL
            let url = '/api/review';
            if (filter === 'mine' && signInUser?.uid) {
                // 自分のレビューを取得
                url = `/api/review?userId=${signInUser.uid}`;
            } else if (filter === 'others') {
                // 他の人のレビューを取得
                url = `/api/review?filter=others&userId=${signInUser.uid}`;
            }
            try {
                const response = await fetch(url);
                const data = await response.json();
                // レビューが配列かどうか確認
                if (Array.isArray(data)) {
                    setReviews(data); // レビューの状態を更新
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error); // エラーハンドリング
            }
        }

        fetchReviews(); // レビューのフェッチ
    }, [filter, signInUser?.uid]); // フィルタリング状態またはユーザーIDが変わった場合に実行

    return (
        <div>
            {/* フィルタリングボタン */}
            <div>
                <button onClick={() => setFilter('all')}>全て</button>
                <button onClick={() => setFilter('mine')}>自分の投稿</button>
                <button onClick={() => setFilter('others')}>他の人の投稿</button>
            </div>
            {/* レビューがない場合のメッセージ */}
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                // レビューのリストを表示
                reviews.map((review, index) => (
                    <LinkedBookDetails book={review} index={index + 1} key={review.id} />
                ))
            )}
        </div>
    );
}