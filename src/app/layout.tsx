import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from "./ApolloWrapper";

const inter = Inter({ subsets: ['latin'] })

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
      <body className="h-full p-8">
      <ApolloWrapper>

          {children}

      </ApolloWrapper>
      </body>
    </html>
  )
}
