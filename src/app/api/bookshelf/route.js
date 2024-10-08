import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

function isValidId(id) {
  // 文字列であり、空でないことを確認
  return typeof id === 'string' && id.trim().length > 0;
}

//所有している本を追加する
export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const {
      userId,
      bookId,
      title = "Unknown Title",
      author = "Unknown Author",
      price = 0,
      publisher = "Unknown Publisher",
      published = new Date().toISOString(),
      image = "default_image_url",
    } = data;

    // 必須フィールドのチェック
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

    // 既存の所有本を確認
    const existingOwnedBook = await prisma.ownedBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingOwnedBook) {
      return NextResponse.json(
        { error: "この書籍は既に存在します。" },
        { status: 400 }
      );
    }

    // 所有する本を追加
    const ownedBook = await prisma.ownedBook.create({
      data: {
        userId,
        bookId,
        title,
        author,
        price: parseInt(price, 10),
        publisher,
        published: new Date(published),
        image,
      },
    });
    console.log("ownedBook added:", ownedBook);

    return NextResponse.json({ message: "書籍が追加されました。" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 所有する本を取得する
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

    // ユーザーの所有する本を取得（全フィールドを取得する）
    //const ownedBooks = await prisma.ownedBook.findMany({
      //where: { userId },
    //});
    // ユーザーのすべてのお気に入りを取得
    const ownedBooks = await prisma.ownedBook.findMany({
      where: { userId },
      select: {
        bookId: true,
        title: true,
        author: true,
        price: true,
        publisher: true,
        published: true,
        image: true,
      },
    });

    console.log("Fetched ownedBooks:", ownedBooks);

    // 所有する本の詳細情報を返す（必要に応じてフィールドを選択）
    return NextResponse.json(ownedBooks);
  } catch (error) {
    console.error("API Error in GET:", error.message, error.stack);
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
    console.log("Received data for DELETE:", data);
    const { userId, bookId } = data;

    // 必須フィールドのチェック
    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "ユーザーIDまたは書籍IDが指定されていません。" },
        { status: 400 } 
      );
    }

    // 所有する本を削除
    const deletedOwnedBook = await prisma.ownedBook.deleteMany({
      where: {
        userId,
        bookId,
      },
    });

    if (deletedOwnedBook.count === 0) {
      return NextResponse.json(
        { error: "この書籍は存在しません。" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "書籍が削除されました。" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}