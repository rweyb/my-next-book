import { useEffect, useState } from 'react';

const ReturnTopButton = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const top = 100;
      const scroll = window.scrollY;
      setIsButtonActive(scroll >= top);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={returnTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        opacity: isButtonActive ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out',
        transform: isButtonActive ? 'translateY(0)' : 'translateY(100px)',
        pointerEvents: isButtonActive ? 'auto' : 'none',
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
