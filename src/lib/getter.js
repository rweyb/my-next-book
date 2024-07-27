import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// 引数keywordをキーにGoogle Books APIから書籍を検索
export async function getBooksByKeyword(keyword) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        const books = [];

        // 応答内容をオブジェクト配列に詰め替え
        for (const b of result.items) {
            books.push(createBook(b));
        }
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

// id値をキーに書籍情報を取得
export async function getBookById(id) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const result = await res.json();
    return createBook(result);
}

// id値をキーにレビュー情報を取得
export async function getReviewById(id) {
    return await prisma.review.findUnique({
        where: {
            id: id
        }
    });
}

// 全てのレビューを取得
export async function getAllReviews() {
    try {
        // 読了日(read)降順で取得
        const reviews = await prisma.review.findMany({
            orderBy: {
                read: 'desc'
            }
        });
        if (reviews.length === 0) {
            console.log("現在、レビューはありません。");
        }
        return reviews;
    } catch (error) {
        console.error("レビューの取得中にエラーが発生しました:", error);
        return [];
    }
}