import '../styles/globals.css'
import type { AppProps } from 'next/app';
import React from 'react';
import { DefaultSeo } from 'next-seo';

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
            },
            {
              url: 'https://raw.githubusercontent.com/real-festil/observer-og/main/ogSmall.png',
              width: 180,
              height: 180,
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
