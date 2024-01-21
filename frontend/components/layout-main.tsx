import Sidebar from "@/components/sidebar";
import styles from "@/styles/Layout.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Person from "@/interfaces/person";

type Props = {
  children: React.ReactNode;
  people: Person[] | undefined;
};

export default function Layout({ children, people }: Props) {
  return (
    <div className={`${styles.wrapper} ${inter.className}`}>
      <Sidebar people={people} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
