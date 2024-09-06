"use client";

import React, { useState, useEffect } from "react";
import LinkedBookDetails from "./LinkedBookDetails";
import { useRecoilValue } from 'recoil';
import { signInUserState } from "@state/signInUserState";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ReviewsList({ reviews }) {
    console.log(reviews); // ここでデータを確認
    
    // サインインユーザーの取得
    const signInUser = useRecoilValue(signInUserState);
    // レビューの状態を管理
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    // フィルタリング状態 ('all', 'mine', 'others')
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState("");

    useEffect(() => {
        setFilteredReviews(reviews);
    }, [reviews]);

    useEffect(() => {
        if (!signInUser?.uid) {
            setError("ユーザーがサインインしていません");
            return;
        }

        async function fetchReviews() {
            let url = '/api/reviews';
            const params = new URLSearchParams();

            params.append('userId', signInUser.uid);

            if (filter === 'mine') {
                // params.append('userId', signInUser.uid); // 重複を削除
            } else if (filter === 'others') {
                params.append('filter', 'others');
            }

            try {
                const fullUrl = `${url}?${params.toString()}`;
                console.log('Fetching data from:', fullUrl); // デバッグ用
                const response = await fetch(fullUrl);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setFilteredReviews(data); // フィルタリングされたレビューの状態を更新
                } else {
                    console.error('Invalid data format:', data);
                    setError("データ形式が無効です");
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error); // エラーハンドリング
                setError("レビューの取得に失敗しました");
            }
        }
        fetchReviews(); // レビューのフェッチ
    }, [filter, signInUser?.uid]); // フィルタリング状態またはユーザーIDが変わった場合に実行

    // フィルタリングの変更ハンドラ
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            {/* マテリアルUIのSelectを使ったフィルタリング */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <FormControl size="small">
                    <InputLabel id="filter-select-label">Filter</InputLabel>
                    <Select
                        labelId="filter-select-label"
                        id="filter-select"
                        value={filter}
                        label="Filter"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">全て</MenuItem>
                        <MenuItem value="mine">自分の投稿</MenuItem>
                        <MenuItem value="others">他の人の投稿</MenuItem>
                    </Select>
                </FormControl>
            </Box>

             {/* エラーメッセージとレビューの表示 */}
             {error && <p>{error}</p>}
             {filteredReviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                // レビューのリストを表示
                filteredReviews.map((review, index) => (
                    <LinkedBookDetails book={review} index={index + 1} key={review.id} />
                ))
            )}
        </div>
    );
}