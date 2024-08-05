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

export default function Header({ children }) {
  // メニューのアンカー要素の状態を管理
  const [anchorElBooks, setAnchorElBooks] = useState(null);
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const [openLoginModal, setOpenLoginModal] = useState(false);
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
      <div className="fixed top-0 w-full bg-white z-10 flex bg-light-gray mb-4 pl-2 justify-between items-center">
        <h1 className="text-xl font-bold">本棚アプリ</h1>
        <ul className="flex">
          {signInUser?.uid ? (
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <LogoutButton />
            </li>
          ) : (
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <LoginButton setOpenLoginModal={setOpenLoginModal} />
            </li>
          )}

          <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Button
              aria-controls="books-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e, setAnchorElBooks)}
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
                <Link href="/books">検索</Link>
              </MenuItem>
              <MenuItem onClick={() => handleClose(setAnchorElBooks)}>
                <Link href="/bookshelf">本棚の管理</Link>
              </MenuItem>
            </Menu>
          </li>

          {/* レビューリンク */}
          <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link href="/my-reviews" className="custom-menu-link">レビュー</Link>
          </li>

          {/* お気に入りリンク */}
          <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link href="/favorites" className="custom-menu-link">お気に入り</Link>
          </li>

          {/* 読書統計リンク */}
          <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link href="/reading-history" className="custom-menu-link">読書履歴</Link>
          </li>

          {/* おすすめリンク */}
          <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link href="/recommendations" className="custom-menu-link">おすすめの本</Link>
          </li>
        </ul>
      </div>
      <div className="ml-2">{children}</div>
      {openLoginModal && <LoginForm closeLoginModal={closeLoginModal} />}
    </>
  );
}