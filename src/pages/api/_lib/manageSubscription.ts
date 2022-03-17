import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {

  // Buscar o usuário no banco do Fauna usando o customerId
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index("user_by_stripe_customer_id"),
          customerId
        )
      )
    )
  )

  // Cria um campo com os dados de inscrição do usuário
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Pegando apenas os dados relevantes para salvar no banco
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  await fauna.query(
    q.Create(
      q.Collection("subscriptions"),
      { data: subscriptionData }
    )
  )
};