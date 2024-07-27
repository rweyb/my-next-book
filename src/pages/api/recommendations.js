import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンスを作成
const prisma = new PrismaClient();

// APIルートのハンドラ関数を定義
export default async function handler(req, res) {
    //ユーザーIDを取得
    const userId = req.query.userId;

  try {
    // ユーザーの好みを取得
    const userPreferences = await prisma.userPreferences.findUnique({
      where: { userId: userId }
    });
    
    //ユーザー好みに基づいて本を推薦
    const recommendations = await prisma.book.findMany({
        where: {
            OR: [
                { genre: { in: userPreferences.genres }},
                { author: { in: userPreferences.authors }}
            ]
        }
    });

    // 取得したデータをJSON形式でクライアントに返す
    res.status(200).json(recommendations);
  } catch (error) {
    // エラーハンドリング
    res.status(500).json({ error: '推薦された本の取得に失敗しました' });
  } finally {
    // PrismaClientの接続を切断
    await prisma.$disconnect();
  }
}