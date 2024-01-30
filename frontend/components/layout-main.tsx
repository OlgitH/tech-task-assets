import Sidebar from "@/components/sidebar";
import styles from "@/styles/Layout.module.css";
import Person from "@/interfaces/person";
import Head from "next/head";
type Props = {
  children?: React.ReactNode;
  people: Person[] | null;
};

export default function Layout({ children, people }: Props) {
  return (
    <>
      <Head>
        <title>VF Resourcing</title>
        <meta name="description" content="VF Resourcing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.wrapper}`}>
        <Sidebar people={people} />
        <main className={styles.main}>{children && children}</main>
      </div>
    </>
  );
}
