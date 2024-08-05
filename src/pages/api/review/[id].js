import { removeReview } from '../../lib/actions';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            await removeReview(req.body.id);  // id を直接渡す
            res.status(200).json({ message: 'Review removed successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove review' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
