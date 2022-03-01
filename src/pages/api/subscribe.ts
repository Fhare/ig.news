import { NextApiRequest, NextApiResponse } from "next";

import { query as q } from "faunadb";

import { getSession } from "next-auth/client";

import { stripe } from "../../services/stripe";
import { fauna } from "../../services/fauna";

type User = {
  ref: {
    id: string;
  },

  data: {
    stripe_customer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Checa se o método passado é POST. A rota só deve aceitar requisições do tipo POST

  if (req.method === "POST") {
    const session = await getSession({ req });

    // Faz uma busca pelo usuário da session através do email
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index("user_by_email"),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email
      });

      // Atualizo o usuário do Fauna com o valor do customer id, para fazer a verificação para evitar a duplicação do Stripe
      await fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id
    }


    // Cria uma sessão no stripe
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId, // Customer é quem está comprando esse produto.
      payment_method_types: ["card"], // Quais métodos de pagamento são permitidos card (Cartão de crédito).
      billing_address_collection: "required", // Permite que o stripe preencha os dados de endereço do usuário ou que seja obrigatório o usuário preencher.

      // Itens do usuário.
      line_items: [
        { price: "price_1K2DUsKvYNQnlaqykw9aSctI", quantity: 1 }
      ],

      mode: "subscription", // Modo do pagamento. Subscription pois é uma assinatura recorrente.
      allow_promotion_codes: true, // Permite ter promoções.
      success_url: process.env.STRIPE_SUCCESS_URL, // Para onde o usuário deve ser redirecionado se der sucesso.
      cancel_url: process.env.STRIPE_CANCEL_URL // Para onde o usuário deve ser redirecionado se ele cancelar a operação.
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed"); // Método não permitido (405)
  }
}