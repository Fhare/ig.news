import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from "../services/prismic";

import { AppProps } from "next/app";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <NextAuthProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </NextAuthProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
};

export default MyApp;