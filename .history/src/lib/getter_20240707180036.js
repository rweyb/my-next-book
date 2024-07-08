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

export async function getAllReviews() {
    //読了日(read)降順で取得
    return await prisma.reviews.findMany({
        orderBy: {
            read: 'desc'
        }
    });
}