import Person from "@/interfaces/person";
import People from "./people";
import styles from "@/styles/Sidebar.module.css";

type Props = {
  people: Person[] | undefined;
};

export default function Sidebar({ people }: Props) {
  return (
    <>
      <aside className={styles.sidebar}>
        <People people={people} />
      </aside>
    </>
  );
}
