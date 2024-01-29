import Person from "@/interfaces/person";
import Link from "next/link";
import styles from "@/styles/Sidebar.module.css";

type Props = {
  people: Person[] | null;
};

export default function PeopleList({ people }: Props) {
  return (
    <div className={styles.people_list}>
      {people
        ? people.map((p: Person, i) => {
            return (
              <div className={styles.person} key={`p-${i}`}>
                <Link href={`/detail/${p.id}`}>{p.name}</Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}
