import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.scss';

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
