import React from 'react';
import styles from './Modal.module.css';

// モーダルコンポーネントの定義
const Modal = ({ isOpen, onClose, children }) => {
     // モーダルが開いていない場合は何も表示しない
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            {/* モーダルを閉じるためのボタン */}
          <button onClick={onClose} 
          className={styles.closeButton}></button>
           {/* モーダルの内容 */}
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
