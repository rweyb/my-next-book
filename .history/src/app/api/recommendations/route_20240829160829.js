/*import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // おすすめの書籍を取得
    const recommendedBooks = await prisma.book.findMany({
      where: { recommended: true },
    });

    return NextResponse.json(recommendedBooks);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
*/