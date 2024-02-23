import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from "./ApolloWrapper";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'


const GTM_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LANCH Partner Dashboard',
  description: 'Dashboard for LANCH Partners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className="h-full bg-white">
      {/* <Script id="google-analytics" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
    </Script> */}
      <body className="h-full p-8">
      <ApolloWrapper>

          {children}
          <Analytics />
          <GoogleAnalytics gaId={GTM_ID} />
      </ApolloWrapper>
      </body>
  
    </html>
  )
}
