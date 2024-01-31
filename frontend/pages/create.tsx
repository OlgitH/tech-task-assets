import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout-main";
import Person from "@/interfaces/person";
import Skill from "@/interfaces/skill";
import { getData } from "@/lib/helpers";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import CreateForm from "@/components/forms/create";

export default function Create({
  people,
  allSkills,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>VF Resourcing | Create</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout people={people}>
        <header>
          <h1>Create resource</h1>
        </header>
        <CreateForm allSkills={allSkills} />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const people: Person[] | null = await getData(
    "http://localhost:4000/resources"
  );
  const allSkills: Skill[] | null = await getData(
    "http://localhost:4000/skills"
  );
  return { props: { people, allSkills } };
};
