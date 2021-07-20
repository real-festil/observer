import '../styles/globals.css'
import type { AppProps } from 'next/app';
import firebase from 'firebase';

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
  return <Component {...pageProps} />
}
export default MyApp
