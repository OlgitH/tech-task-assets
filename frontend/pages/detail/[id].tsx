import Head from "next/head";
import styles from "@/styles/Detail.module.css";
import Layout from "@/components/layout-main";
import Person from "@/interfaces/person";
import Skill from "@/interfaces/skill";
import { getData } from "@/lib/helpers";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DetailPage({
  people,
  person,
  skills,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(person);
  const [selectedTab, setSelectedTab] = useState("overview");

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

        <div className={styles.detail}>
          <header className={styles.detailHeader}>
            <button
              onClick={() => setSelectedTab("overview")}
              className={selectedTab === "overview" ? "active" : ""}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("skills")}
              className={selectedTab === "skills" ? "active" : ""}
            >
              Skills
            </button>
          </header>
          {selectedTab === "overview" ? (
            <div>
              <p className={styles.overviewItem}>
                <span>Role:</span>
                {person?.role}
              </p>
              <p className={styles.overviewItem}>
                <span>Email:</span>
                {person?.email}
              </p>
            </div>
          ) : selectedTab === "skills" ? (
            <div>
              {skills ? (
                <ul>
                  {skills.map((skill, i) => (
                    <li key={`s-${i}`}>{skill.name}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const people: Person[] | null = await getData(
    `http://localhost:4000/resources`
  );

  const person: Person | null = await getData(
    `http://localhost:4000/resources/${params.id}`
  );

  const skills: Skill[] | null = await getData(
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
