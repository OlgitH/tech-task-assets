import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout-main";
import Person from "@/interfaces/person";
import { getData } from "@/lib/helpers";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default function Home({
  people,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>VF Resourcing</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout people={people}>Hello</Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const people: Person[] | undefined = await getData(
    "http://localhost:4000/resources"
  );
  return { props: { people } };
};
