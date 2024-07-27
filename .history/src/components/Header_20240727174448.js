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
  const [anchorElReviews, setAnchorElReviews] = useState(null);
  const [anchorElFavorites, setAnchorElFavorites] = useState(null);
  const [anchorElStats, setAnchorElStats] = useState(null);
  const [anchorElRecommendations, setAnchorElRecommendations] = useState(null);
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const router = useRouter();

  // メニューを開くためのハンドラー
  const handleClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
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
    localStorage.clear();
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      //ログイン状態がtrueの場合、Recoilの状態を更新
      setSignInUser({ uid: "dummy-uid" });
    } else {
      // ログイン状態がfalseの場合、Recoilの状態をクリア
      setSignInUser({ uid: "" });
    }
    console.log("Logged in:", loggedIn);
    console.log("signInUser state:", signInUser);
  }, [setSignInUser]);

  return (
    <>
      <ul className="flex bg-light-gray mb-4 pl-2 justify-end">
        {signInUser.uid ? (
          <>
            {/* ログインしている場合に表示されるメニュー項目 */}
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <LogoutButton />
            </li>
          </>
        ) : (
          // ログインしていない場合に表示されるメニュー項目
          <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <LoginButton setOpenLoginModal={setOpenLoginModal} />
          </li>
        )}


         {/* 書籍管理メニュー */}
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

        {/* レビュー機能メニュー */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded">
          <Button
            aria-controls="reviews-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, setAnchorElReviews)}
          >
            レビュー
          </Button>
          <Menu
            id="reviews-menu"
            anchorEl={anchorElReviews}
            keepMounted
            open={Boolean(anchorElReviews)}
            onClose={() => handleClose(setAnchorElReviews)}
          >
            <MenuItem onClick={() => handleClose(setAnchorElReviews)}>
              <Link href="/my-reviews">レビュー投稿</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setAnchorElReviews)}>
              <Link href="/other-reviews">レビュー閲覧</Link>
            </MenuItem>
          </Menu>
        </li>

        {/* お気に入り機能メニュー */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button
            aria-controls="favorites-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, setAnchorElFavorites)}
          >
            お気に入り
          </Button>
          <Menu
            id="favorites-menu"
            anchorEl={anchorElFavorites}
            keepMounted
            open={Boolean(anchorElFavorites)}
            onClose={() => handleClose(setAnchorElFavorites)}
          >
            <MenuItem onClick={() => handleClose(setAnchorElFavorites)}>
              <Link href="/favorites">お気に入り</Link>
            </MenuItem>
          </Menu>
        </li>

        {/* 読書統計メニュー */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded ">
          <Button
            aria-controls="stats-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, setAnchorElStats)}
          >
            読書統計
          </Button>
          <Menu
            id="stats-menu"
            anchorEl={anchorElStats}
            keepMounted
            open={Boolean(anchorElStats)}
            onClose={() => handleClose(setAnchorElStats)}
          >
            <MenuItem onClick={() => handleClose(setAnchorElStats)}>
              <Link href="/reading-history">読書履歴</Link>
            </MenuItem>
          </Menu>
        </li>

        {/* パーソナライズドおすすめメニュー */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded ">
          <Button
            aria-controls="recommendations-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, setAnchorElRecommendations)}
          >
            おすすめ
          </Button>
          <Menu
            id="recommendations-menu"
            anchorEl={anchorElRecommendations}
            keepMounted
            open={Boolean(anchorElRecommendations)}
            onClose={() => handleClose(setAnchorElRecommendations)}
          >
            <MenuItem onClick={() => handleClose(setAnchorElRecommendations)}>
              <Link href="/recommendations">おすすめの本</Link>
            </MenuItem>
          </Menu>
        </li>
      </ul>

      {/* ページコンポーネントを反映する領域 */}
      <div className="ml-2">{children}</div>
      {openLoginModal && <LoginForm closeLoginModal={closeLoginModal} />}
    </>
  );
}