import Person from "@/interfaces/person";
import Link from "next/link";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/router";
type Props = {
  people: Person[] | null;
};

export default function PeopleList({ people }: Props) {
  const router = useRouter();
  return (
    <div className={styles.people_list}>
      {people
        ? people.map((p: Person, i) => {
            return (
              <div className={styles.person} key={`p-${i}`}>
                <Link
                  href={`/detail/${p.id}`}
                  className={
                    p.id.toString() === router.query.id?.toString()
                      ? "active"
                      : ""
                  }
                >
                  {p.name}
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}
