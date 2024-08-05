import { getSession } from 'next-auth/react'; // NextAuthのセッション管理フック
import prisma from '@lib/prisma'; // Prismaクライアントのインポート

export default async function handler(req, res) {
  const { id } = req.query; // クエリパラメータからIDを取得

  // DELETEリクエストを処理
  if (req.method === 'DELETE') {
    const session = await getSession({ req }); // セッション情報を取得

    console.log('Session:', session); // デバッグ用にセッション情報をログ

    // セッションが存在しない場合は401 Unauthorizedを返す
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // お気に入りをデータベースから削除
      await prisma.favorite.deleteMany({
        where: {
          userId: session.user.id, // ユーザーIDをセッションから取得
          bookId: id, // クエリパラメータから取得したID
        },
      });

      // 成功時のレスポンス
      res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
      // エラーが発生した場合のレスポンス
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // DELETE以外のメソッドはサポートしていない
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
