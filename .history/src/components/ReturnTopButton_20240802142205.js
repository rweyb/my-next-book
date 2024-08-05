import { useEffect, useState } from 'react';

const ReturnTopButton = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={returnTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        opacity: 1, // 常に表示
        transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out',
        transform: 'translateY(0)', // 常に表示
        pointerEvents: 'auto', // 常にクリック可能
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      ↑
    </button>
  );
};

export default ReturnTopButton;
