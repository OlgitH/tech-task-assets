import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout-main";
import Person from "@/interfaces/person";
import Skill from "@/interfaces/skill";
import { getData } from "@/lib/helpers";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Home({
  people,
  person,
  skills,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(person);

  return (
    <>
      <Head>
        <title>VF Resourcing | {person?.id}</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout people={people}>
        <h1>{person?.name}</h1>
        <h3>Overview</h3>
        <p>
          <span>Role:</span>
          {person?.role}
        </p>
        <p>
          <span>Email:</span>
          {person?.email}
        </p>
        <h3>Skills</h3>
        {skills ? (
          <ul>
            {skills.map((skill, i) => (
              <li key={`s-${i}`}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
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

  const skills: Skill[] | undefined = await getData(
    `http://localhost:4000/resources/${params.id}/skills`
  );

  return { props: { person, people, skills } };
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
