import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const ReturnTopButton = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  // ページのトップにスムーズにスクロールする関数
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // スクロール位置に応じてボタンの表示/非表示を切り替える関数
    const scrollWindow = () => {
      const top = 100; // ボタンを表示させたい位置
      const scroll = window.scrollY;
      setIsButtonActive(top <= scroll);
    };

    // スクロールイベントをデバウンスしてハンドルする関数を定義
    const handleScroll = debounce(scrollWindow, 100);
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数を定義
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ボタンが非表示のときのスタイル
  const normalStyle = {
    opacity: 0,
    transition: '0.5s',
    pointerEvents: 'none',
  };
  const activeStyle = {
    opacity: 1,
    transition: '0.5s',
  };

  // 現在の状態に応じたスタイルを適用
  const style = isButtonActive ? activeStyle : normalStyle;

  return (
    <button style={style} onClick={returnTop}>
      ボタン
    </button>
  );
};

export default ReturnTopButton;
