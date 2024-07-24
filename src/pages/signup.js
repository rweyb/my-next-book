import SignUpScreen from '@/components/SignUpScreen';
import { useState } from 'react';

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <SignUpScreen closeLoginModal={closeLoginModal} />}
    </div>
  );
}