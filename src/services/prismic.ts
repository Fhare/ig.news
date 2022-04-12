import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from '@prismicio/next'
import sm from "../../sm.json";

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

export function linkResolver(doc) {
  const type = doc.type;

  if(doc.type === "publication") {
    return "/posts";
  }

  return type;
}

export function getPrismicClient(config = {} as any) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client;
}