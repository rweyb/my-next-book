import { useRecoilState } from "recoil";
import { signInUserState } from "@state/signInUserState";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSignInUser(null); // ログアウト後にユーザー状態をリセット
      localStorage.setItem("isLoggedIn", "false"); // ログイン状態をローカルストレージに保存
      alert('ログアウトしました');
      router.push('/'); // ログアウト後にホームページにリダイレクト
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウトに失敗しました');
    }
  };
  return (
    <Button
    onClick={handleLogout}
    className="no-underline text-blue-600"
    aria-controls="logout-button"
    aria-haspopup="true"
  >
    ログアウト
  </Button>
  );
}
