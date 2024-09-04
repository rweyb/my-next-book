import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

function isValidId(id) {
  // 文字列であり、空でないことを確認
  return typeof id === 'string' && id.trim().length > 0;
}

// ユーザーの所有する本一覧を取得
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId || !isValidId(userId)) {
      return NextResponse.json(
        { error: "ユーザーIDが指定されていないか、無効な形式です。" },
        { status: 400 }
      );
    }

    // ユーザーの所有する本を取得
    const ownedBooks = await prisma.ownedBook.findMany({
      where: { userId },
      include: { book: true }, // 所有している本の詳細情報も取得する
    });

    return NextResponse.json(ownedBooks.map(owned => owned.book));
  } catch (error) {
    console.error("API Error in GET:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ユーザーの所有する本を追加
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const { userId, bookId } = data;

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "ユーザーIDまたは書籍IDが指定されていません。" },
        { status: 400 }
      );
    }

    // ユーザーIDと書籍IDが有効か確認
    if (!isValidId(userId) || !isValidId(bookId)) {
      return NextResponse.json(
        { error: "無効なユーザーIDまたは書籍IDです。" },
        { status: 400 }
      );
    }

    // 既存の所有情報を確認
    const existingOwnership = await prisma.ownedBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingOwnership) {
      return NextResponse.json(
        { error: "この本はすでに本棚にあります。" },
        { status: 400 }
      );
    }

    // 所有情報を追加
    await prisma.ownedBook.create({
      data: {
        userId,
        bookId,
      },
    });

    return NextResponse.json({ message: "書籍が本棚に追加されました。" });
  } catch (error) {
    console.error("API Error in POST:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ユーザーの所有する本を削除
export async function DELETE(req) {
  try {
    const data = await req.json();
    const { userId, bookId } = data;

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "ユーザーIDまたは書籍IDが指定されていません。" },
        { status: 400 }
      );
    }

    if (!isValidId(userId) || !isValidId(bookId)) {
      return NextResponse.json(
        { error: "無効なIDの形式です。" },
        { status: 400 }
      );
    }

    const deleteResult = await prisma.ownedBook.deleteMany({
      where: { userId, bookId },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json(
        { error: "本棚にある書籍が見つからないか、削除できませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "書籍が本棚から削除されました。" });
  } catch (error) {
    console.error("API Error in DELETE:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
