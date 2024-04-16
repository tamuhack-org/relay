import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <style jsx global>{`
        html {
          font-family: ${GeistSans.style.fontFamily};
        }
      `}</style>
      <main className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
