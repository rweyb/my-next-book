import { PrismaClient } from "@prisma/client";
<<<<<<< HEAD
import { returnJsonSearch } from "./returnJsonSearch";
=======

>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
const prisma = new PrismaClient();

// API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替え
export function createBook(book) {
  const authors = book.volumeInfo?.authors;
  const price = book.saleInfo?.listPrice;
  const img = book.volumeInfo?.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo?.title || "タイトルなし",
    author: authors ? authors.join(", ") : "著者不明",
    price: price ? price.amount : 0,
    publisher: book.volumeInfo?.publisher || "出版社不明",
    published: book.volumeInfo?.publishedDate || "日付不明",
    image: img?.smallThumbnail || "/vercel.svg", // デフォルト画像のパス
  };
}

<<<<<<< HEAD
=======
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // 環境変数からAPIキーを取得

// エクスポネンシャルバックオフを使ってリクエストを再試行する関数
const fetchWithBackoff = async (url, apiget, retries = 3, delay = 1000) => {
  try {
    let fullUrl = "";
    if (apiget) {
      fullUrl += `${url}&key=${API_KEY}`; // APIキーをURLに追加
    } else {
      fullUrl = url;
    }
    const res = await fetch(fullUrl);

    if (res.status === 429) {
      // レート制限エラーの場合
      if (retries > 0) {
        console.warn("リクエスト制限に達しました。再試行します。");
        await new Promise((resolve) => setTimeout(resolve, delay)); // 指定した遅延後に再試行
        return fetchWithBackoff(url, apiget, retries - 1, delay * 2);
      } else {
        throw new Error("リクエスト制限に達しました。再試行回数を超えました。");
      }
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json(); // レスポンスをJSON形式で返す
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// id値をキーに書籍情報を取得
export async function getBookById(id) {
  try {
    const result = await fetchWithBackoff(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
      false
    );
    console.log("API Response:", result); // レスポンスの構造を確認
    return createBook(result);
  } catch (error) {
    console.error(`Error fetching book by ID ${id}:`, error);
    return null;
  }
}

>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
// 引数keywordをキーにGoogle Books APIから書籍を検索
export async function getBooksByKeyword(keyword, page = 1, booksPerPage = 10) {
  if (!keyword) {
    console.error("キーワードが指定されていません。");
    return [];
  }

<<<<<<< HEAD
  try {
    const startIndex = (page - 1) * booksPerPage;
    /*リクエスト制限に達した
    const result = await fetchWithBackoff(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        keyword
      )}&langRestrict=ja&maxResults=${booksPerPage}&startIndex=${startIndex}&printType=books`,
      true
    );
    */
    const result = returnJsonSearch;
=======
  // keywordを文字列に変換
  const searchKeyword = String(keyword);

  try {
    const startIndex = (page - 1) * booksPerPage;
    const result = await fetchWithBackoff(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchKeyword
      )}&langRestrict=ja&maxResults=${booksPerPage}&startIndex=${startIndex}&printType=books`,
      true
    );

    console.log("API Response:", result);
    console.log("Items:", result.items);

>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    if (!result.items) {
      console.warn("書籍情報が取得できませんでした。");
      return [];
    }
<<<<<<< HEAD
=======
    // 応答内容をオブジェクト配列に詰め替え
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    return result.items.map(createBook);
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// id値をキーにレビュー情報を取得
export async function getReviewById(id) {
  try {
    return await prisma.review.findUnique({
<<<<<<< HEAD
      where: { id: id },
=======
      where: {
        id: id,
      },
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    });
  } catch (error) {
    console.error(`Error fetching review by ID ${id}:`, error);
    return null;
  }
}

// 全てのレビューを取得
export async function getAllReviews() {
  try {
<<<<<<< HEAD
    return await prisma.review.findMany({
      orderBy: { read: "desc" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// エクスポネンシャルバックオフを使ってリクエストを再試行する関数
const fetchWithBackoff = async (url, apiget, retries = 3, delay = 1000) => {
  try {
    // APIキーをURLに追加
    const fullUrl = apiget
      ? `${url}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      : url;

    // リクエストするURLをログ出力
    console.log("Fetching URL:", fullUrl);

    const res = await fetch(fullUrl);

    if (res.status === 429 && retries > 0) {
      // レート制限エラーの場合
      console.warn("リクエスト制限に達しました。再試行します。");
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithBackoff(url, apiget, retries - 1, delay * 2);
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // レスポンスデータをログ出力
    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
=======
    // 読了日(read)降順で取得
    const reviews = await prisma.review.findMany({
      orderBy: {
        read: "desc",
      },
    });

    if (reviews.length === 0) {
      console.log("現在、レビューはありません。");
    }

    return reviews;
  } catch (error) {
    console.error("レビューの取得中にエラーが発生しました:", error);
    return [];
  }
}
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
