import { PrismaClient } from "@prisma/client";

// Prismaクライアントのインスタンスを作成
const prisma = new PrismaClient();

export default async function handler(req, res) {
    // POSTリクエストが送信された場合の処理
    if (req.method === 'POST') {
        try {
            // リクエストボディからレビューの情報を取得
            const { title, author, price, publisher, published, image, memo, userId } = req.body;

            // データベースに新しいレビューを作成
            const review = await prisma.review.create({
                data: {
                    title,
                    author,
                    price,
                    publisher,
                    published,
                    image,
                    memo,
                    userId
                }
            });

            // 成功した場合、作成したレビューを返す
            res.status(200).json(review);
        } catch (error) {
            console.error("Error creating review:", error);
            // エラーが発生した場合、500ステータスコードとエラーメッセージを返す
            res.status(500).json({ error: "Failed to create review" });
        }
    } else {
        // POST以外のメソッドは許可しない
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
