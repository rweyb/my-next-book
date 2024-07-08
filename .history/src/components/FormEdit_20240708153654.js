'use client';

import { addReview, removeReview } from '@/lib/actions';

export default function FormEdit({ src: { id, read, memo } }) {
    return (
        //サブミット時にaddReviewメソッドを呼び出し
        <form action={addReview}>
            <input type="hidden" name="id" defaultValue={id} />
            <div className="mb-3">
                <label className="font-bold" htmlFor="read">読了日 :</label>
                <input type="date" id="read" name="read"
                className="block bg-gray-100 border-2 border-gray-600 rounded focus:bg-white
                focus:outline-none focus:border-red-500"
                defaultValue={read} />
            </div>
        </form>
    )
}