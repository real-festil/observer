import '../styles/globals.css'
import type { AppProps } from 'next/app';
import firebase from 'firebase';
import React from 'react';
import { DefaultSeo } from 'next-seo';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "observer-vc.firebaseapp.com",
  databaseURL: "https://observer-vc-default-rtdb.firebaseio.com",
  projectId: "observer-vc",
  storageBucket: "observer-vc.appspot.com",
  messagingSenderId: "847143738715",
  appId: "1:847143738715:web:390e594dd9305e816f4e7e",
  measurementId: "G-6DDSLZG269"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          title: 'Observer VC',
          description: 'Observer mission is to promote Web Vitals metrics in VC and startup markets. We use data from Google’s Pagespeed Insights API to get performance metrics for venture fund websites.',
          images: [
            {
              url: 'https://raw.githubusercontent.com/real-festil/observer-og/main/ogLarge.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            }
          ],
          site_name: 'Observer VC',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
