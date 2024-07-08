import prisma from "./prisma";

//API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替え
export function createBook(book) {
    const authors = book.volumeInfo.authors;
    const price = book.saleInfo.listPrice;
    const img = book.volumeInfo.imageLinks;
    return {
        id: book.id,
        title: book.volumeInfo.title,
        author: authors ? authors.join(',') : '',
        price: price ? price.amount : 0,
        publisher: book.volumeInfo.publisher,
        published: book.volumeInfo.publishedDate,
        image: img ? img.smallThumbnail : '/vercel.svg',
    };
}

//引数keywordをキーにGoogle Books APIから書籍を検索
export async function getBooksByKeyword(keyword) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}
        &langRestrict=ja&maxResults=20&printType=books`);
        const result = await res.json();
        const books = [];

        //応答内容をオブジェクト配列に詰め替え
        for (const b of result.items) {
            books.push(createBook(b));
        }
        return books;
}

//id値をキーに書籍情報を取得
export async function getBookById(id) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const result = await res.json();
    return createBook(result);
}

//id値をキーにレビュー情報を取得
export async function getReviewById(id) {
    return await prisma.reviews.findUnique({
        where: {
            id: id
        }
    });
}

export async function getAllReviews() {
    //読了日(read)降順で取得
    return await prisma.reviews.findMany({
        orderBy: {
            read: 'desc'
        }
    });
}