import { useSession, signIn } from "next-auth/client";

import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./styles.module.scss";

interface SubscribePriceProps {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribePriceProps) {

  // Primeira coisa a se fazer é checar se o usuário está logado na aplicação.
  const [ session ] = useSession();

  async function handleSubscribe() {
    // Se o usuário não estiver logado, mande ele para o login.
    if(!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};