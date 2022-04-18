import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { getPrismicClient } from "../../services/prismic";

import styles from "./styles.module.scss";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => (
              <Link href={`/posts/${post.slug}`}>
                <a key={post.id}>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))
          }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const response = await client.getAllByType("publication-id", {
    pageSize: 100
  });

  const posts = response.map(post => {
    return {
      id: post.id,
      slug: post.uid,
      title: post.data.title, // Converte o que vem do Prismic para um Texto (asText) ou HTML (asHtml)
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "", // Forma de pegar sempre o primeiro paragrâfo do texto que vem do prismic. Caso não tenha retorne um array vazio
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long", // Mês por extenso
        year: "numeric"
      }), // Formatando a data para o formato do layout
    }
  })

  return {
    props: {
      posts
    }
  }
}