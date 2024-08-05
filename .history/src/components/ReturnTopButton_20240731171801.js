import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const ReturnTopButton = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = debounce(scrollWindow, 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollWindow = () => {
    const top = 100; // ボタンを表示させたい位置
    const scroll = window.scrollY;
    setIsButtonActive(top <= scroll);
  };

  const normalStyle = {
    opacity: 0,
    transition: '0.5s',
    pointerEvents: 'none',
  };
  const activeStyle = {
    opacity: 1,
    transition: '0.5s',
  };
  const style = isButtonActive ? activeStyle : normalStyle;

  return (
    <button style={style} onClick={returnTop}>
      ボタン
    </button>
  );
};

export default ReturnTopButton;
