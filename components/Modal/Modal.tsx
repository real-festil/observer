import React from 'react';
import styles from './Modal.module.scss';

const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Modal = ({children, onClose}: {children: React.ReactNode, onClose: () => void}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBack} onClick={onClose}>
        <BackArrow />
      </div>
      <div className={styles.modalChild}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
