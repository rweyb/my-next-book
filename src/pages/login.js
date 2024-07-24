import LoginForm from '@/components/LoginForm';
import { useState } from 'react';

export default function LoginPage() {

  //モーダルの開閉状態を管理するための状態を定義
  const [ isModalOpen, setIsModalOpen] = useState(true);

  //モーダルを閉じるための関数
  const closeLoginModal = () => {
    //モーダルの開閉状態をfalseに設定
    setIsModalOpen(false);
  };

    return (
        <div>
           {/* モーダルが開いている場合にLoginFormコンポーネントを表示 */}
          {isModalOpen && <LoginForm closeLoginModal={closeLoginModal} />}
        </div>
      );
}