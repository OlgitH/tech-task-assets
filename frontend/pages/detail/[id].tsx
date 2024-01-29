import Head from "next/head";
import styles from "@/styles/Detail.module.css";
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
  // console.log(person);

  function getInitials(fullname: string | undefined) {
    if (fullname) {
      const words = fullname.split(" ");
      const initials = words
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      return initials;
    }
    return;
  }

  return (
    <>
      <Head>
        <title>VF Resourcing | {person?.id}</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout people={people}>
        <h1 className={styles.initials}>
          <span>{getInitials(person?.name)}</span>
          {person?.name}
        </h1>
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
  const people: Person[] | null = await getData(
    "http://localhost:4000/resources"
  );

  return {
    paths: people
      ? people.map((person) => {
          return {
            params: {
              id: person.id,
            },
          };
        })
      : null,
    fallback: false,
  };
}
