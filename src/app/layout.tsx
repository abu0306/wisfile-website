import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import { Nav } from "@/components/Nav";
import Footer from "@/components/Footer";
import { QueryParamsHandler } from "@/components/QueryParamsHandler";
import Script from "next/script";
import StoreProvider from "./StoreProvider";
import "@/styles/index.scss";
import "aos/dist/aos.css";
import LazyImage from "@/components/LazyImage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WisFile: Tidy Your Files with AI",
  description:
    "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
    "Automatically generates clear, consistent filenames based on content. " +
    "Instantly sorts your files into logical folders for easy access. " +
    "All operations run on your device — no cloud, no data leaks.",
  alternates: {
    canonical: "https://www.wisfile.ai",
  },
  openGraph: {
    title: "WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
    url: "https://www.wisfile.ai",
    siteName: "WisFile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Wisfileofficial",
    title: "WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FEFCF7]`}
        >
          <Script src="/rem.js" strategy="beforeInteractive" />
          <QueryParamsHandler />
          <Nav />
          <a
            href="https://www.producthunt.com/products/wisfile/reviews?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-wisfile"
            target="_blank"
            className="top-14 md:top-[10px] right-6 md:right-8 z-50 fixed"
          >
            <LazyImage
              src="/images/product_review.svg"
              alt="WisFile - 100% Local & Free AI File Manager for Docx and PDFs | Product Hunt"
              width={250}
              height={54}
              className="w-[180px] md:w-[250px] h-fit scale-80"
            />
          </a>
          {children}
          <Footer />
          {process.env.NODE_ENV === "development" && <StagewiseToolbar />}
          {process.env.NODE_ENV === "production" && (
            <>
              <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-C2J12C5Z2L"
                strategy="afterInteractive"
              />
              <Script id="gtag-init" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-C2J12C5Z2L');
              `}
              </Script>
            </>
          )}
        </body>
      </html>
    </StoreProvider>
  );
}
