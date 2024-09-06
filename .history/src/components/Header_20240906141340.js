"use client";

import Link from "next/link";
import { Menu, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signInUserState } from "@state/signInUserState";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { favoritesState } from "@/state/favoritesState";
import { OwnedBooksState } from "@/state/OwnedBooksState";
import { recommendationsState } from "@/state/recommendationsState";
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
import "./Header.css";

export default function Header({ children }) {
  // メニューのアンカー要素の状態を管理
  const [anchorElBooks, setAnchorElBooks] = useState(null);
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const [openLoginModal, setOpenLoginModal] = useState(false);
<<<<<<< HEAD
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [ownedBooks, setOwnedBooks] = useRecoilState(OwnedBooksState);
  const [recommendations, setRecommendations] = useRecoilState(recommendationsState);
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  const router = useRouter();

  // メニューを開くためのハンドラー
  const handleClick = (event, setAnchor) => {
    if (event && event.currentTarget) {
      setAnchor(event.currentTarget);
    } else {
      console.error("Event or currentTarget is null or undefined");
    }
  };

  // メニューを閉じるためのハンドラー
  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

  const closeLoginModal = () => {
    setOpenLoginModal(false);
  };

  // コンポーネントのマウント時にログイン状態をチェック
  useEffect(() => {
<<<<<<< HEAD
    const loginCheck = async () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        setSignInUser({ uid: "dummy-uid" });
        const userId = "dummy-uid";

        try {
          // Fetch favorites
          const favoritesResponse = await fetch(`/api/favorites?userId=${userId}`);
          if (!favoritesResponse.ok) {
            throw new Error("Failed to fetch favorites");
          }
          const favoritesData = await favoritesResponse.json();
          setFavorites(favoritesData.map(d => d.bookId));

          // Fetch owned books
          const ownedBooksResponse = await fetch(`/api/bookshelf?userId=${userId}`);
          console.log("ownedBooksData:", ownedBooksData);
          if (!ownedBooksResponse.ok) {
            throw new Error("Failed to fetch owned books");
          }
          const ownedBooksData = await ownedBooksResponse.json();
          console.log("Fetched ownedBooksData:", ownedBooksData);
         // ownedBooksDataに期待される詳細情報 (uid, bookId, title, src など) を含めてセット
         if (Array.isArray(ownedBooksData)) {
          setOwnedBooks(
            ownedBooksData.map(book => ({
              uid: userId,
              bookId: book.bookId,
              title: book.title,
              src: book.image || "/images/default_image.jpg",
            }))
          );
        } else {
          console.error("Unexpected data format for ownedBooksData:", ownedBooksData);
        }
          // ownedBooksDataが期待される形式で返ってきているか確認し、bookIdを正しくマッピング
        if (Array.isArray(ownedBooksData)) {
        const mappedBookIds = ownedBooksData.map(b => b.bookId); // bookIdをマッピング
        console.log("Mapping ownedBooksData to bookId:", mappedBookIds); // デバッグ用ログ
        setOwnedBooks(mappedBookIds); // 正しいbookIdをセット
        } else {
        console.error("Unexpected data format for ownedBooksData:", ownedBooksData);
        }
          // Fetch recommendations
          const recommendationsResponse = await fetch(`/api/recommendations`);
          if (!recommendationsResponse.ok) {
            throw new Error("Failed to fetch recommendations");
          }
          const recommendationsData = await recommendationsResponse.json();
          setRecommendations(recommendationsData);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setSignInUser(null);
      }
    };
    loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 return (
    <>
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
        <h1 className="text-2xl font-bold text-left ml-4">本棚アプリ</h1>
        <ul className="flex space-x-4">
=======
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      //ログイン状態がtrueの場合、Recoilの状態を更新
      setSignInUser({ uid: "dummy-uid" });
    } else {
      // ログイン状態がfalseの場合、Recoilの状態をクリア
      setSignInUser(null);
    }
    console.log("Logged in:", loggedIn);
    console.log("signInUser state:", signInUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">本棚アプリ</h1>
        <ul className="flex">
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
          {signInUser?.uid ? (
            <li className="header-menu-item">
              <LogoutButton />
            </li>
          ) : (
            <li className="header-menu-item">
              <LoginButton setOpenLoginModal={setOpenLoginModal} />
            </li>
          )}

          <li className="header-menu-item">
            <Button
<<<<<<< HEAD
              component={Link}
              href="/books"
              className="custom-menu-button"
            >
              検索
            </Button>
          </li>

          <li className="header-menu-item">
            <Button
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
              aria-controls="books-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e, setAnchorElBooks)}
              className="custom-menu-button"
            >
              書籍管理
            </Button>
            <Menu
              id="books-menu"
              anchorEl={anchorElBooks}
              keepMounted
              open={Boolean(anchorElBooks)}
              onClose={() => handleClose(setAnchorElBooks)}
            >
              <MenuItem onClick={() => handleClose(setAnchorElBooks)}>
<<<<<<< HEAD
                <Link href="/my-favorites" className="custom-menu-link">
                  お気に入り
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose(setAnchorElBooks)}>
                <Link href="/bookshelf" className="custom-menu-link">
                  本棚
                </Link>
=======
                <Link href="/books" className="custom-menu-link">検索</Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose(setAnchorElBooks)}>
                <Link href="/bookshelf" className="custom-menu-link">本棚の管理</Link>
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
              </MenuItem>
            </Menu>
          </li>

          <li className="header-menu-item">
            <Button
              component={Link}
              href="/my-reviews"
              className="custom-menu-button"
            >
              レビュー
            </Button>
          </li>

          <li className="header-menu-item">
            <Button
              component={Link}
<<<<<<< HEAD
              href="/my-recommendations"
=======
              href="/favorites"
              className="custom-menu-button"
              onClick={() => console.log('Favorites button clicked')}
            >
              お気に入り
            </Button>
          </li>

          <li className="header-menu-item">
            <Button
              component={Link}
              href="/reading-history"
              className="custom-menu-button"
            >
              読書履歴
            </Button>
          </li>

          <li className="header-menu-item">
            <Button
              component={Link}
              href="/recommendations"
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
              className="custom-menu-button"
            >
              おすすめの本
            </Button>
          </li>
        </ul>
      </div>
      <div className="ml-2">{children}</div>
      {openLoginModal && <LoginForm closeLoginModal={closeLoginModal} />}
    </>
  );
}