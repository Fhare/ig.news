import { Fragment } from "react";
import { GetServerSideProps } from "next";

import { SubscribeButton } from "../components/SubscribeButton";

import { stripe } from "../services/stipe";

import Head from "next/head";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number
  }
};

export default function Home({ product }: HomeProps) {
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
            <span>For {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </Fragment>
  );
};

// Forma de se fazer chamada HTTP no Next: 
// Nós criamos essa função com o nome getServerSideProps para poder trazer a tipagem dessa chamada dentro do Next.
// getServerSideProps é renderizado na camada do servidor node que o Next executa junto com a nossa aplicação React.

export const getServerSideProps: GetServerSideProps = async () => {
  // Fazendo chamada a API do stripe
  // * LER A DOCUMENTAÇÃO *

  const price = await stripe.prices.retrieve("price_1K2DUsKvYNQnlaqykw9aSctI");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format((price.unit_amount / 100))
  };

  return {
    props: {
      product
    }
  };
};