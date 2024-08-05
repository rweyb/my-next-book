// src/pages/api/add-review.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // リクエストのボディからユーザーIDとレビュー内容を取得
    const { userId, content } = req.body;

    try {
      // Prismaを使用してレビューをデータベースに作成
      const newReview = await prisma.review.create({
        data: {
          userId,         // ユーザーID
          content,        // レビューの内容
          createdAt: new Date(), // 現在の日時を設定
        },
      });
      // 成功した場合、作成したレビューを返す
      res.status(200).json(newReview);
    } catch (error) {
      // エラーが発生した場合、エラーメッセージを返す
      res.status(500).json({ error: 'Failed to create review' });
    } finally {
      // Prisma Clientを切断してリソースを解放
      await prisma.$disconnect();
    }
  } else {
    // POSTメソッド以外は許可しない
    res.status(405).json({ error: 'Method not allowed' });
  }
}
