import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

function isValidId(id) {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  const bookIdPattern = /^[A-Za-z0-9]{12}$/; // 12文字のアルファベットと数字
  console.log("Checking ID:", id);
  console.log("ObjectId match:", objectIdPattern.test(id));
  console.log("BookId match:", bookIdPattern.test(id));
  return objectIdPattern.test(id) || bookIdPattern.test(id);
}



export async function POST(req) {
  try {
    // リクエストボディからデータを取得
    const data = await req.json();
    console.log("Received data:", data);

    const userId = data.userId;

    // ユーザーIDが指定されていない場合のエラーハンドリング
    if (!userId) {
      return NextResponse.json(
        { error: "ユーザーIDが指定されていません。" },
        { status: 400 }
      );
    }

    // レビューの入力データを構築
    const input = {
      title: data.title,
      author: data.author,
      price: 0,
      publisher: data.publisher,
      published: new Date(data.published).toISOString(),
      image: data.imagesrc,
      read: new Date(data.read),
      memo: data.memo,
      bookId: data.id,
    };

    // ユーザーの存在確認、存在しない場合は新規作成
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      await prisma.user.create({
        data: {
          id: userId,
          name: "Default Name",
          email: `${userId}@example.com`,
          password: "defaultpassword",
        },
      });
    }

    // レビューを追加または更新
    await prisma.review.upsert({
      where: { id: data.id || "" }, // 新規作成の場合は空文字列を使用
      update: {
        ...input,
        user: { connect: { id: userId } },
      },
      create: {
        ...input,
        id: data.id,
        user: { connect: { id: userId } },
      },
    });

    // 成功メッセージを返す
    return NextResponse.json({ message: "レビューが正常に保存されました。" });
  } catch (error) {
    console.error("API Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const bookId = url.searchParams.get("bookId");
    const reviewId = url.searchParams.get("reviewId");
    const filter = url.searchParams.get("filter") || "all"; // 'all' がデフォルト

    // reviewId が指定されている場合、特定のレビューを取得
    if (reviewId) {
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
      });
      if (!review) {
        return NextResponse.json(
          { error: "指定されたレビューが見つかりません。" },
          { status: 404 }
        );
      }
      return NextResponse.json([review]); // 単一のレビューを配列に格納して返す
    }

    // userId が指定されていない場合のエラーハンドリング
    if (!userId) {
      return NextResponse.json(
        { error: "ユーザーIDが指定されていません。" },
        { status: 400 }
      );
    }

    let reviews;

    // bookId が指定されている場合、特定の書籍に関連するレビューを取得
    if (bookId) {
      reviews = await prisma.review.findMany({
        where: {
          userId: userId,
          bookId: bookId,
        },
      });
    } else if (filter === "mine") {
      // 自分のレビューを取得
      reviews = await prisma.review.findMany({
        where: { userId: userId },
      });
    } else if (filter === "others") {
      // 他のユーザーのレビューを取得
      reviews = await prisma.review.findMany({
        where: {
          userId: { not: userId },
        },
      });
    } else {
      // すべてのレビューを取得
      reviews = await prisma.review.findMany({
      });
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("API Error in GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // リクエストボディからデータを取得
    const data = await req.json();
    console.log("Received data:", data);
    const userId = data.userId;
    const reviewId = data.id;

    // ユーザーIDまたはレビューIDが指定されていない場合のエラーハンドリング
    if (!userId || !reviewId) {
      return NextResponse.json(
        { error: "ユーザーIDまたはレビューIDが指定されていません。" },
        { status: 400 }
      );
    }

    // IDのフォーマットを検証（追加）
    console.log("Review ID format check:", reviewId, isValidId(reviewId));
    if (!isValidId(reviewId)) {
      return NextResponse.json(
        { error: "無効なレビューIDの形式です。" },
        { status: 400 }
      );
    }

   // 指定されたレビューを削除
   const deleteResult = await prisma.review.deleteMany({
    where: { id: reviewId, userId: userId },
  });

    if (deleteResult.count === 0) {
      return NextResponse.json(
        { error: "レビューが見つからないか、削除できませんでした。" },
        { status: 404 }
      );
    }

    // 成功メッセージを返す
    return NextResponse.json({ message: "レビューが削除されました。" });
  } catch (error) {
    console.error("API Error in DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}