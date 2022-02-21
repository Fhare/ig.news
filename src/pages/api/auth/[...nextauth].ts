import { query as q } from "faunadb";

import NextAuth from "next-auth"
import Provider from "next-auth/providers"

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  
  callbacks: {
    async signIn(user, account, profile) {
      // Resgata o email do usuário que vem da função signIn()
      const { email } = user;

      // Essa é a forma de escrever uma informação na tabela do Fauna
      // FQL (Fauna query language)

      // Try catch verifica se ocorreu tudo certo na inserção do usuário
      // return true diz que deu tudo certo.

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true;
      } catch {
        return false;
      }
    }
  }
});