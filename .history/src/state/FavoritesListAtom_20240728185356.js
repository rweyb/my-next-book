import { atomFamily } from 'recoil';
import prisma from '@lib/prisma';

// 特定のIDに基づいて個々の本の詳細情報を保持
export const FavoritesListAtom = atomFamily({
  key: 'FavoritesListAtom',
  default: async (id) => {
    try {
      // Prismaを使用して本の詳細情報を取得
      const bookDetails = await prisma.book.findUnique({
        where: { id },
      });
      return bookDetails;
    } catch (error) {
      console.error('Error fetching book details:', error);
      return null;
    }
  },
});
