import React, {useState} from 'react';
import Modal from '../Modal';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';

const BurgerMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Help = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.08984 8.99999C9.32495 8.33166 9.789 7.7681 10.3998 7.40912C11.0106 7.05015 11.7287 6.91893 12.427 7.0387C13.1253 7.15848 13.7587 7.52151 14.2149 8.06352C14.6712 8.60552 14.9209 9.29151 14.9198 9.99999C14.9198 12 11.9198 13 11.9198 13" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="#617E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Header = () => {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  console.log(router);

  return (
    <header className={styles.header}>
      <div className={styles.headerIcon} onClick={() => setIsMenuVisible(true)}>
        <BurgerMenu />
      </div>
      <div className={styles.headerTitle} onClick={() => router.push('/')}>
        <h1>OBSERVER <span>VC</span></h1>
      </div>
      <div className={styles.headerButtons}>
        <button onClick={() => router.push('/about')}>About</button>
        <button onClick={() => window.open('https://t.me/dandaka', '_blank')}>Contact</button>
      </div>
      <div className={styles.headerIcon} onClick={() => setIsHelpVisible(true)}>
        <Help />
      </div>
      {isMenuVisible && (
        <Modal onClose={() => setIsMenuVisible(false)}>
          <div className={styles.modalButtons}>
            <button onClick={() => router.push(router.pathname === '/' ? `/about` : `/`)}>{router.pathname === '/' ? `About` : `Main`}</button>
            <button onClick={() => window.open('https://t.me/dandaka', '_blank')}>Contact</button>
          </div>
        </Modal>
      )}
      {isHelpVisible && (
        <Modal onClose={() => setIsHelpVisible(false)}>
          <div className={styles.modalHelp}>
            <p>CMS — Content Management System</p>
            <p>PSI — Page Speed Insights</p>
            <p>Uty — Usability</p>
            <p>Overall — Overall Score</p>
          </div>
        </Modal>
      )}
    </header>
  )
}

export default Header
