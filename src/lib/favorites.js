import prisma from "./prisma";

// お気に入りを追加する関数
export async function addFavorite(userId, bookId) {
    return await prisma.favorite.create({
    data: {
        userId: userId,
        bookId: bookId,
    },
    });
}

// ユーザーのお気に入りを取得する関数
export async function getFavoritesByUserId(userId) {
    return await prisma.favorite.findMany({
    where: {
        userId: userId,
    },
    include: {
        book: true,
    },
    });
}