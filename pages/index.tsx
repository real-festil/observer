import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import moment from 'moment';
import dynamic from 'next/dynamic'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton';

const Table = dynamic(() => import('../components/Table'));

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState(null as any);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.child("lastUpdated").get().then((snapshot) => {
      if (snapshot.exists()) {
        setLastUpdated(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Observer VC | Main</title>
        <meta name="description" content="We promote Web Vitals metrics in VC and startup markets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
          <h1 className={styles.title}>Top VCs by website performance</h1>
          <p className={styles.subtitle}>
            {lastUpdated ?
              `Last updated: ${moment(lastUpdated).format('D MMMM YYYY')}` :
              <SkeletonTheme color="#13242d" highlightColor="#376882">
                <Skeleton />
              </SkeletonTheme>}
            </p>
        <Table/>
      </Layout>
    </div>
  )
}
