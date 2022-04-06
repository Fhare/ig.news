import * as prismic from '@prismicio/client'

const repo = "yagoignews";

export const client = prismic.createClient(repo, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN
});