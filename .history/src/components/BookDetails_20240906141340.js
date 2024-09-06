import Image from 'next/image';

export default function BookDetails({ index, book }) {
    return (
<<<<<<< HEAD
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
                    <li>{index && index + '.'}</li>
                    <li>{book.title} ({book.price}円)</li>
=======
        <div className="flex w-full mb-4">
            <div>
                {/*書影を表示 */}
                <Image
                    src={book.image}
                    alt={book.title}
                    width={140}
                    height={180}
                    style={{ width: 'auto', height: 'auto' }}
                    priority={true}
                />
            </div>
            <div>
                {/*書籍情報をリスト表示(index属性が指定されたら連番も表示)*/}
                <ul className="list-none text-black ml-4">
                    <li>{index && index + '.'}</li>
                    <li>{book.title}({book.price}円)</li>
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
                    <li>{book.author}</li>
                    <li>{book.publisher}刊</li>
                    <li>{book.published}発売</li>
                </ul>
            </div>
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
