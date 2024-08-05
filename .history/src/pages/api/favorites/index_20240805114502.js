import { getSession } from 'next-auth/react'; // 認証が必要な場合
import prisma from '@lib/prisma';

export default async function handler(req, res) {
  // POSTリクエストを処理
  if (req.method === 'POST') {
    const { bookId } = req.body;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // お気に入りをデータベースに追加
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          bookId,
        },
      });

      res.status(200).json({ message: 'Favorite added' });
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // POST以外のメソッドはサポートしていない
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
