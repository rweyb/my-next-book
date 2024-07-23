'use client';

import Link from 'next/link';
import { Menu, MenuItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { signInUserState } from '@state/signInUserState';

export default function Header({ children }) {
  // メニューのアンカー要素の状態を管理
  const [anchorElMypage, setAnchorElMypage] = useState(null);
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);

  // コンポーネントのマウント時にログイン状態をチェック
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      // ログイン状態がtrueの場合、Recoilの状態を更新
      setSignInUser({ uid: 'dummy-uid' });
    }
  }, [setSignInUser]);

  // ログアウト処理
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setSignInUser({ uid: '' });
    window.location.href = '/login'; // ログアウト後にログインページにリダイレクト
  };

  // メニューを開くためのハンドラー
  const handleClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  // メニューを閉じるためのハンドラー
  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

  return (
    <>
      <ul className="flex bg-light-gray mb-4 pl-2 justify-end">
        {signInUser.uid ? (
          <>
            {/* ログインしている場合に表示されるメニュー項目 */}
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Button aria-controls="mypage-menu" aria-haspopup="true" onClick={(e) => handleClick(e, setAnchorElMypage)}>
                マイページ
              </Button>
              <Menu
                id="mypage-menu"
                anchorEl={anchorElMypage}
                keepMounted
                open={Boolean(anchorElMypage)}
                onClose={() => handleClose(setAnchorElMypage)}
              >
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/mypage/profile">プロフィール</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/mypage/settings">設定</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/books">検索</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/bookshelf">本棚の管理</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/my-reviews">レビュー投稿</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/other-reviews">レビュー閲覧</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/favorites">お気に入り</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/reading-history">読書履歴</Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose(setAnchorElMypage)}>
                  <Link href="/recommendations">おすすめの本</Link>
                </MenuItem>
              </Menu>
            </li>
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Button onClick={handleLogout} className="no-underline text-black">
                ログアウト
              </Button>
            </li>
          </>
        ) : (
          // ログインしていない場合に表示されるメニュー項目
          <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
            <Link className="no-underline text-black" href="/login">
              ログイン
            </Link>
          </li>
        )}
      </ul>

      {/* ページコンポーネントを反映する領域 */}
      <div className="ml-2">
        {children}
      </div>
    </>
  );
}
