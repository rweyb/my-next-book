import { getSession } from 'next-auth/react'; // NextAuthのセッション管理フック
import prisma from '@lib/prisma'; // Prismaクライアントのインポート

export default async function handler(req, res) {
  // POSTリクエストを処理
  if (req.method === 'POST') {
    const { bookId } = req.body; // リクエストボディからbookIdを取得
    const session = await getSession({ req }); // セッション情報を取得

    console.log('Session:', session); // デバッグ用にセッション情報をログ

    // セッションが存在しない場合は401 Unauthorizedを返す
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // お気に入りをデータベースに追加
      await prisma.favorite.create({
        data: {
          userId: session.user.id, // ユーザーIDをセッションから取得
          bookId, // リクエストボディから取得したbookId
        },
      });

      // 成功時のレスポンス
      res.status(200).json({ message: 'Favorite added' });
    } catch (error) {
      // エラーが発生した場合のレスポンス
      console.error('Error adding favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // POST以外のメソッドはサポートしていない
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
