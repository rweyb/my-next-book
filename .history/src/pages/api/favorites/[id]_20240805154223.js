import admin from 'firebase-admin'; // Firebase Admin SDKのインポート
import prisma from '@lib/prisma'; // Prismaクライアントのインポート

// Firebase Admin SDK の初期化
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  const { id } = req.query; // クエリパラメータからIDを取得

  // DELETEリクエストを処理
  if (req.method === 'DELETE') {
    const token = req.headers.authorization?.split('Bearer ')[1]; // リクエストヘッダーからトークンを取得

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // IDトークンを検証
      const userId = decodedToken.uid; // ユーザーIDをトークンから取得

      // お気に入りをデータベースから削除
      await prisma.favorite.deleteMany({
        where: {
          userId, // ユーザーIDを取得
          bookId: id, // クエリパラメータから取得したID
        },
      });

      // 成功時のレスポンス
      res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
