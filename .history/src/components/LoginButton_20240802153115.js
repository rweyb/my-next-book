import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { useRouter } from "next/navigation";

export default function LoginButton({ setOpenLoginModal }) {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
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
