import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prismaクライアントのインスタンス

export default async function handler(req, res) {
  if (req.method === 'GET') { // GETリクエストの処理
    try {
      const { userId, filter } = req.query; // クエリパラメーターからフィルタ条件を取得

      if (filter === 'others') { // 他の人のレビューを取得
        if (!userId) {
          res.status(400).json({ error: 'User ID is required for filtering others\' reviews' });
          return;
        }
        const reviews = await prisma.review.findMany({
          where: { NOT: { userId } }, // 自分以外のレビューを取得
          orderBy: { read: 'desc' },
        });
        res.status(200).json(reviews); // 成功時にレビューを返す
      } else { // 自分のレビューを取得
        if (!userId) {
          res.status(400).json({ error: 'User ID is required' });
          return;
        }
        const reviews = await prisma.review.findMany({
          where: { userId }, // 自分のレビューを取得
          orderBy: { read: 'desc' },
        });
        res.status(200).json(reviews); // 成功時にレビューを返す
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' }); // エラーハンドリング
    } finally {
      await prisma.$disconnect(); // Prismaクライアントの切断
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); // 許可されていないメソッドのリクエスト
  }
}
