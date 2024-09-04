import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

function isValidId(id) {
  // 文字列であり、空でないことを確認
  return typeof id === 'string' && id.trim().length > 0;
}

/// お気に入りを追加する
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

    // 既存のお気に入りを確認
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "このお気に入りは既に存在します。" },
        { status: 400 }
      );
    }

    // お気に入りを追加
    const favorite = await prisma.favorite.create({
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
    console.log("Favorite added:", favorite);

    return NextResponse.json({ message: "お気に入りが追加されました。" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// お気に入り一覧を取得する
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

    // ユーザーのすべてのお気に入りを取得
    const favorites = await prisma.favorite.findMany({
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
    
    return NextResponse.json(favorites); // 書籍情報も返す場合は、必要な情報を含める
  } catch (error) {
    console.error("API Error:", error.message); // エラーメッセージの詳細を出力
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } 
    );
  }
}

// お気に入りを削除する
export async function DELETE(req) {
  try {
    const data = await req.json();
    const { userId, bookId } = data;

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "ユーザーIDまたは書籍IDが指定されていません。" },
        { status: 400 } // Bad Request
      );
    }

    if (!isValidId(userId) || !isValidId(bookId)) {
      return NextResponse.json(
        { error: "無効なIDの形式です。" },
        { status: 400 }
      );
    }

    
    const deleteResult = await prisma.favorite.deleteMany({
      where: { userId, bookId },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json(
        { error: "お気に入りが見つからないか、削除できませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "お気に入りが削除されました。" });
  } catch (error) {
    console.error("API Error in DELETE:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}