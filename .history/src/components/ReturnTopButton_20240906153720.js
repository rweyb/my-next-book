import { useRouter } from "next/navigation";

const ReturnTopButton = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/"); // ルートページに遷移
  };

  return (
    <button
    onClick={goToHome}
    className="
      fixed bottom-5 right-5
      bg-blue-600 text-white
      rounded-full p-3
      shadow-lg
      hover:bg-blue-500
      transition-transform transform
      hover:scale-110
      focus:outline-none
    "
  >
    TOP
  </button>  
  );
};

export default ReturnTopButton;