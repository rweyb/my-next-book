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
    
    
    return (
    <>
        {reviews.map((review, index) => (
        <LinkedBookDetails book={review} index={index + 1} key={review.id} />
        ))}
    </>
    );
}