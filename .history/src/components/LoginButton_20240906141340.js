import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { useRouter } from "next/navigation";

export default function LoginButton({ setOpenLoginModal }) {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
<<<<<<< HEAD
    setSignInUser({ loggedIn: true }); // ステートを更新
=======
>>>>>>> 8a0072d6459980df93b335947cdda449ef067eb6
    setOpenLoginModal(true);
  };

  return (
    <Button onClick={handleLogin} 
    className="custom-menu-button"
    aria-controls="logout-button"
    aria-haspopup="true"
    >
      ログイン
    </Button>
  );
}
