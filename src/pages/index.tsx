import { Fragment } from "react";

import { SubscribeButton } from "../components/SubscribeButton";

import Head from "next/head";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <Fragment>
      {/* Head é uma forma de deixar o title dinâmico por página */}

      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>For $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </Fragment>
  );
};