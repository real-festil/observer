import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import Table from '../components/Table';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Observer VC | Main</title>
        <meta name="description" content="We promote Web Vitals metrics in VC and startup markets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className={styles.title}>Top VCs by website performance</h1>
        <p className={styles.subtitle}>Last updated: 01 June 2021 </p>
        <Table/>
      </Layout>
    </div>
  )
}
