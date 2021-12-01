import { Header } from "../components/Header";

import { AppProps } from "next/app";

import "../styles/global.scss";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
};

export default MyApp;