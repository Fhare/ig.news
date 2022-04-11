import { Header } from "../components/Header";

import { Provider as NextAuthProvider } from "next-auth/client";

import { PrismicProvider } from "@prismicio/react";
import { client } from "../services/prismic";

import { AppProps } from "next/app";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <PrismicProvider
      client={client}
    >
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </PrismicProvider>
  )
};

export default MyApp;