// src/api/ownedBooksApi.js
import { prisma } from '@lib/prismaClient'; // Prisma Client をインポート

// ユーザーが持っている本のデータをデータベースから取得する非同期関数
export async function fetchOwnedBooks(userId) {
  try {
    // Prisma を使って、指定されたユーザー ID に関連する本のデータを取得
    const ownedBooks = await prisma.book.findMany({
      where: {
        ownerId: userId  // ユーザー ID に基づいてフィルタリング
      }
    });
    return ownedBooks;  // 取得した本のデータを返す
  } catch (error) {
    console.error('Error fetching owned books:', error);  // エラーが発生した場合にログに出力
    return [];  // エラー発生時には空の配列を返す
  }
}
