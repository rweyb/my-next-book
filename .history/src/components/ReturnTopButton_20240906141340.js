<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import { useRouter } from 'next/router';
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6

const ReturnTopButton = () => {
  const router = useRouter();

  const goToHome = () => {
<<<<<<< HEAD
    router.push("/"); // ルートページに遷移
=======
    router.push('/'); // ルートページに遷移
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
  };

  return (
    <button
<<<<<<< HEAD
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
=======
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
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
