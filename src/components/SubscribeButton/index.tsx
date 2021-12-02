import styles from "./styles.module.scss";

interface SubscribePriceProps {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribePriceProps) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
};