'use server';

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBookById } from "./getter";

//フォームからの入力値をデータベースに登録
export async function addReview(data) {
    const book = await getBookById(data.get('id'));
    const input = {
        title: book.title,
        author: book.author,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
        image: book.image,
        read: new Date(data.get('read')),
        memo: data.get('memo'),
        userId: data.get('userId')
    };

//新規データであれば登録、既存データであれば更新
    await prisma.review.upsert({
        update: input,
        create: Object.assign({}, input, { id: data.get('id') }),
        where: {
            id: data.get('id')
        }
    });
//処理成功の後はトップページにリダイレクト
    redirect('/');
}

//削除ボタンで指定のレビュー情報を削除
    export async function removeReview(data) {
        await prisma.review.delete({
            where: {
                id: data.get('id')
            }
        });
    //処理成功の後はトップページにリダイレクト
        redirect('/');
}