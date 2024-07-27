import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.setItem("isLoggedIn", "false");
    setSignInUser({ uid: "" });
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} className="no-underline text-black">
      ログアウト
    </Button>
  );
}
