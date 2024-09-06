import Image from 'next/image';

export default function BookDetails({ index, book }) {
    return (
        <div className="flex w-full max-w-md mx-auto mb-4">
            <div className="flex-shrink-0">
                {/* 書影を表示 */}
                {book.image ? (
                    <Image
                        src={book.image}
                        alt={`書籍「${book.title}」のカバー画像`}
                        width={140}
                        height={180}
                        style={{ width: 'auto', height: 'auto' }}
                        priority={true}
                    />
                ) : (
                    <div>画像がありません</div> // 画像がない場合のフォールバック
                )}
            </div>
            <div className="ml-4 flex flex-col justify-center">
                {/* 書籍情報をリスト表示(index属性が指定されたら連番も表示) */}
                <ul className="list-none text-black">
                    <li>{index !== undefined ? index + '.' : ''}</li>
                    <li>{book.title} ({book.price}円)</li>
                    <li>{book.author}</li>
                    <li>{book.publisher}刊</li>
                    <li>{book.published}発売</li>
                </ul>
            </div>
        </div>
    );
}
