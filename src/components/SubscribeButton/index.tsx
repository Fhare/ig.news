import { useSession, signIn } from "next-auth/client";

import styles from "./styles.module.scss";

interface SubscribePriceProps {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribePriceProps) {

  // Primeira coisa a se fazer é checar se o usuário está logado na aplicação.
  const [ session ] = useSession();

  function handleSubscribe() {
    // Se o usuário não estiver logado, mande ele para o login.
    if(!session) {
      signIn("github");
      return;
    }

    // Criação da checkout session
    
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