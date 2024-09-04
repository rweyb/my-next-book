import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

function isValidId(id) {
  // IDが文字列であり、空でないか確認
  const objectIdPattern = /^[0-9a-fA-F]{24}$/; // MongoDBのObjectId形式
  const bookIdPattern = /^[A-Za-z0-9]{12}$/;   // 任意の書籍ID形式（例: UUID）
  return typeof id === 'string' && (objectIdPattern.test(id) || bookIdPattern.test(id));
}

// ユーザーの所有する本一覧を取得
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId || !isValidId(userId)) {
      return NextResponse.json(
        { error: "無効なユーザーIDが指定されています。" },
        { status: 400 } // Bad Request
      );
    }

    // ユーザーの所有する本を取得
    const ownedBooks = await prisma.ownedBook.findMany({
      where: { userId },
      // include: { book: true }, // bookリレーションがないため削除
    });

    // 所有する本の詳細情報を返す（必要に応じてフィールドを選択）
    return NextResponse.json(ownedBooks);
  } catch (error) {
    console.error("API Error in GET:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

// ユーザーの所有する本を追加
export async function POST(req) {
  try {
    const data = await req.json();
    const { userId, bookId } = data;

    if (!userId || !bookId || !isValidId(userId) || !isValidId(bookId)) {
      return NextResponse.json(
        { error: "無効なユーザーIDまたは書籍IDが指定されています。" },
        { status: 400 } // Bad Request
      );
    }

    // ユーザーがすでにこの本を所有しているか確認
    const existingEntry = await prisma.ownedBook.findUnique({
      where: { userId_bookId: { userId, bookId } }
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "この本はすでに本棚にあります。" },
        { status: 400 } // Bad Request
      );
    }

    await prisma.ownedBook.create({
      data: { userId, bookId },
    });

    return NextResponse.json({ message: "書籍が追加されました。" });
  } catch (error) {
    console.error("API Error in POST:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

// ユーザーの所有する本を削除
export async function DELETE(req) {
  try {
    const data = await req.json();
    const { userId, bookId } = data;

    if (!userId || !bookId || !isValidId(userId) || !isValidId(bookId)) {
      return NextResponse.json(
        { error: "無効なユーザーIDまたは書籍IDが指定されています。" },
        { status: 400 } // Bad Request
      );
    }

    const deleteResult = await prisma.ownedBook.deleteMany({
      where: { userId, bookId },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json(
        { error: "所有する本が見つからないか、削除できませんでした。" },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json({ message: "書籍が削除されました。" });
  } catch (error) {
    console.error("API Error in DELETE:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
