import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout-main";
import Person from "@/interfaces/person";
import { getData } from "@/lib/helpers";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Home({
  people,
  person,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>VF Resourcing | {person.id}</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout people={people}>
        <h1>{person.name}</h1>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const people: Person[] | undefined = await getData(
    `http://localhost:4000/resources`
  );

  const person: Person | undefined = await getData(
    `http://localhost:4000/resources/${params.id}`
  );

  return { props: { person, people } };
};

export async function getStaticPaths() {
  const people: Person[] | undefined = await getData(
    "http://localhost:4000/resources"
  );

  return {
    paths: people.map((person) => {
      return {
        params: {
          id: person.id,
        },
      };
    }),
    fallback: false,
  };
}
