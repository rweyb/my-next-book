import { getSession } from 'next-auth/react'; // 認証が必要な場合
import { prisma } from '../../lib/prisma'; // Prismaの設定ファイルへのパス

export default async function handler(req, res) {
  const { id } = req.query;

  // DELETEリクエストを処理
  if (req.method === 'DELETE') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // お気に入りをデータベースから削除
      await prisma.favorite.deleteMany({
        where: {
          userId: session.user.id,
          bookId: id,
        },
      });

      res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // DELETE以外のメソッドはサポートしていない
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}