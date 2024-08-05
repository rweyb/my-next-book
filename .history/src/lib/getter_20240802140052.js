import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替え
export function createBook(book) {
    const authors = book.volumeInfo?.authors;
    const price = book.saleInfo?.listPrice;
    const img = book.volumeInfo?.imageLinks;
    return {
        id: book.id,
        title: book.volumeInfo?.title || 'タイトルなし',
        author: authors ? authors.join(', ') : '著者不明',
        price: price ? price.amount : 0,
        publisher: book.volumeInfo?.publisher || '出版社不明',
        published: book.volumeInfo?.publishedDate || '日付不明',
        image: img?.smallThumbnail || '/vercel.svg',
    };
}

// 引数keywordをキーにGoogle Books APIから書籍を検索
export async function getBooksByKeyword(keyword) {
    if (!keyword) {
        console.error("キーワードが指定されていません。");
        return [];
    }

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&langRestrict=ja&maxResults=20&printType=books`);

        if (res.status === 429) {
            console.error("リクエスト制限に達しました。後で再試行してください。");
            return [];
        }

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        if (!result.items) {
            console.warn("書籍情報が取得できませんでした。");
            return [];
        }

        // 応答内容をオブジェクト配列に詰め替え
        return result.items.map(createBook);

    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

// id値をキーに書籍情報を取得
export async function getBookById(id) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        return createBook(result);
    } catch (error) {
        console.error(`Error fetching book by ID ${id}:`, error);
        return null;
    }
}

// id値をキーにレビュー情報を取得
export async function getReviewById(id) {
    try {
        return await prisma.review.findUnique({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(`Error fetching review by ID ${id}:`, error);
        return null;
    }
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
