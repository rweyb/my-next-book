'use client';

import Link from 'next/link';
import { Menu, MenuItem, Button } from '@mui/material';
import { useState } from 'react';

export default function Header({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElBooks, setAnchorElBooks] = useState(null);
  const [anchorElReviews, setAnchorElReviews] = useState(null);
  const [anchorElFavorites, setAnchorElFavorites] = useState(null);
  const [anchorElStats, setAnchorElStats] = useState(null);
  const [anchorElRecommendations, setAnchorElRecommendations] = useState(null);

  const handleClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

  return (
    <>
      <ul className="flex bg-light-gray mb-4 pl-2 justify-end">
        {/* ユーザー認証 */}
        <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Link className="no-underline text-black" href="/login">
            ログイン
          </Link>
        </li>
        <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Link className="no-underline text-black" href="/mypage">
            マイページ
          </Link>
        </li>
        <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Link className="no-underline text-black" href="/logout">
            ログアウト
          </Link>
        </li>

        {/* 書籍管理 */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button aria-controls="books-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElBooks)}>
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
              <Link href="/search">検索</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setAnchorElBooks)}>
              <Link href="/bookshelf">本棚の管理</Link>
            </MenuItem>
          </Menu>
        </li>

        {/* レビュー機能 */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button aria-controls="reviews-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElReviews)}>
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

        {/* お気に入り機能 */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button aria-controls="favorites-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElFavorites)}>
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
              <Link href="/favorites">お気に入り登録</Link>
            </MenuItem>
          </Menu>
        </li>

        {/* 読書統計 */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button aria-controls="stats-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElStats)}>
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

        {/* パーソナライズドおすすめ */}
        <li className="block text-black px-4 py-2 my-1 hover:bg-gray-100 rounded menu-item">
          <Button aria-controls="recommendations-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElRecommendations)}>
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
            <MenuItem onClick={() => handleClose(setAnchorElRecommendations)}>
              <Link href="/ranking">ランキング</Link>
            </MenuItem>
          </Menu>
        </li>
      </ul>

      {/* ページコンポーネントを反映する領域 */}
      <div className="ml-2">
        {children}
      </div>
    </>
  );
}
