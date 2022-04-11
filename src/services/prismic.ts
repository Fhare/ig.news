import * as prismic from "@prismicio/client";

export function getPrismicClient() {
  const client = prismic.createClient("yagoignews" ,{
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,

    routes: [
      { type: "Publication", path: "/posts" }
    ]
  });

  return client;
}