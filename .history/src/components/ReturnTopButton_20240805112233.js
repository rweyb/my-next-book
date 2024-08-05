import { useRouter } from 'next/router';

const ReturnTopButton = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/'); // ルートページに遷移
  };

  return (
    <button
      onClick={goToHome}
      className="
        fixed bottom-5 right-5
        bg-gray-800 text-white
        rounded-full p-3
        shadow-lg
        hover:bg-gray-600
        transition-transform transform
        hover:scale-110
        focus:outline-none
      "
    >
      ↑
    </button>
  );
};

export default ReturnTopButton;
