import prisma from "@lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    // おすすめの書籍を取得
    const recommendedBooks = await prisma.book.findMany({
      where: { recommended: true }, // `recommended` フィールドが存在することを前提にしたクエリ
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
