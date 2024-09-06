/*import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBookById } from "./getter";

// ObjectIdの形式が正しいか確認する関数
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// フォームからの入力値をデータベースに登録
export async function addReview(data) {
  const book = await getBookById(data.get("id"));
  const userId = data.get("userId");

  if (!userId) {
    throw new Error("ユーザーIDが指定されていません。");
  }

  // ユーザーが存在するか確認
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // ユーザーが存在しない場合は作成
  if (!user) {
    await prisma.user.create({
      data: {
        id: userId,
        name: "Default Name",
        email: `${userId}@example.com`,
        password: "defaultpassword",
      },
    });
  }

  const input = {
    title: book.title,
    author: book.author,
    price: Number(book.price),
    publisher: book.publisher,
    published: new Date(book.published).toISOString(), // ISO-8601形式に変換
    image: book.image,
    read: new Date(data.get("read")),
    memo: data.get("memo"),
  };

  console.log("inputデータの確認:", input);
  console.log("idデータの確認:", data.get("id"));

  // 新規データであれば登録、既存データであれば更新
  await prisma.review.upsert({
    where: {
      id: data.get("id"),
    },
    update: {
      ...input,
      user: {
        connect: { id: userId },
      },
    },
    create: {
      ...input,
      id: data.get("id"),
      user: {
        connect: { id: userId },
      },
    },
  });

  // 処理成功の後はトップページにリダイレクト
  redirect("/");
}

// 削除ボタンで指定のレビュー情報を削除
export async function removeReview(id) {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid Review ID format.");
  }

  try {
    await prisma.review.delete({
      where: {
        id: id,
      },
    });
    // 処理成功の後はトップページにリダイレクト
    redirect("/");
  } catch (error) {
    console.error("削除に失敗しました:", error);
    throw error;
  }*/

'use server';

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBookById } from './getter'; 

//フォームからの入力値をデータベースに登録
export async function addReview(data) {
    const book = await getBookById(data.get('id'));
    const  userId = data.get('userId');

    if (!userId) {
        throw new Error("ユーザーIDが指定されていません。");
    }

     // ユーザーが存在するか確認
     const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    // ユーザーが存在しない場合は作成
    if (!user) {
        await prisma.user.create({
            data: { 
                id: userId,
                name: "Default Name",
                email: `${userId}@example.com`,
                password: "defaultpassword"
            }
        });
    }

    const input = {
        title: book.title,
        author: book.author,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
        image: book.image,
        read: new Date(data.get('read')),
        memo: data.get('memo'),
    };

//新規データであれば登録、既存データであれば更新
    await prisma.review.upsert({
        where: {
            id: data.get('id')
        },
        update: {
            ...input,
            user: {
                connect: { id: userId }
            }
        },
        create: {
            ...input,
            id: data.get('id'),
            user: {
                connect: { id: userId }
            }
        }
    });
//処理成功の後はトップページにリダイレクト
    redirect('/');
}

//削除ボタンで指定のレビュー情報を削除
export async function removeReview(id) {
    if (!id) {
        throw new Error("IDが指定されていません。");
    }

    try {
        await prisma.review.delete({
            where: {
                id: id
            }
        });
        // 処理成功の後はトップページにリダイレクト
        redirect('/');
    } catch (error) {
        console.error("削除に失敗しました:", error);
        throw error;
    }
}