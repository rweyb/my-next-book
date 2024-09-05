import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // おすすめの書籍を取得
    const recommendedBooks = await prisma.book.findMany({
      where: { recommended: true }, // ここで「recommended」フィールドを使っておすすめの書籍を取得
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