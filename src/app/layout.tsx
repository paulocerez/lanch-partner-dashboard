import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/app/lib/ApolloWrapper";
// import { ApolloWrapper } from "@/app/ApolloWrapper";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "./context/AuthContext";

const GTM_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LANCH Partner Dashboard",
  description: "Dashboard for LANCH Partners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthProvider>
    <ApolloWrapper>
      <html lang="en" className="h-full bg-white">
        <body className="h-full p-8">
          {children}
          <Analytics />
          <GoogleAnalytics gaId={GTM_ID} />
        </body>
      </html>
    </ApolloWrapper>
    // </AuthProvider>
  );
}
