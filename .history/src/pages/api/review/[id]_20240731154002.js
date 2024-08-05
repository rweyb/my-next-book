import { removeReview } from '../../lib/actions';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            // `id` を `req.query` から取得
            const { id } = req.query;

            // 削除処理を実行
            await removeReview(id);

            // 成功した場合のレスポンス
            res.status(200).json({ message: 'Review removed successfully' });
        } catch (error) {
            // エラーが発生した場合のレスポンス
            res.status(500).json({ error: 'Failed to remove review' });
        }
    } else {
        // 許可されていないメソッドのレスポンス
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
