import { getAllReviews } from '@lib/getter';
import LinkedBookDetails from '@/components/LInkedBookDetails';

//常に最新情報を取得
export const dynamic = 'force-dynamic';
export default async function Home() {

  //全てのレビュー情報を取得
  const reviews = await getAllReviews();
  return (
    <>
    {/*取得したレビュー情報をももとにリストを生成*/}
    {reviews.map((b, i) => (
      <LinkedBookDetails book={b} index={i + 1} key={b.id} />
    ))}
    </>
  );
}