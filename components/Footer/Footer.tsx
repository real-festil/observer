import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import vercelLogo from '../../public/logoVercel.png';
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 768px)'
  })

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="http://www.twiter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="http://www.github.com" target="_blank" rel="noreferrer" style={{marginTop: isDesktopOrLaptop ? 0 : '30px'}}>GitHub</a>
      </div>
      {!isDesktopOrLaptop && (
        <div style={{marginTop: '30px', marginBottom: '30px'}}>
          <Image src={vercelLogo} alt="vercel" />
        </div>
      )}
      <div>
        <p>Made by <span>Accuration</span></p>
      </div>
      {isDesktopOrLaptop && (
        <div>
          <Image src={vercelLogo} alt="vercel" />
        </div>
        )}
    </footer>
  )
}

export default Footer;
