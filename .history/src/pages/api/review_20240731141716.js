import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // クエリパラメータからユーザーIDを取得
    const { userId } = req.query;

    try {
      // ユーザーIDが指定されている場合、特定のユーザーのレビューを取得
      const reviews = userId
        ? await prisma.review.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
          })
        : await prisma.review.findMany({
            orderBy: { createdAt: 'desc' },
          });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}