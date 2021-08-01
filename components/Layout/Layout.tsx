import React from 'react'
import dynamic from 'next/dynamic'
import Header from '../Header';
import styles from './Layout.module.scss';

const Footer = dynamic(() => import('../Footer'))

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className={styles.layout}>
      <Header />
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </section>
  )
}

export default Layout
