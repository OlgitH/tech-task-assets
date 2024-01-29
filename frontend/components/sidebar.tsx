import Person from "@/interfaces/person";
import { useState } from "react";
import FilterButtons from "./filter-buttons";
import { sortByName } from "@/lib/helpers";
import PeopleList from "./people-list";
import Link from "next/link";
import styles from "@/styles/Sidebar.module.css";

type Props = {
  people: Person[] | null;
};

export default function People({ people }: Props) {
  // set up people as state
  const orderedPeople = sortByName(people);
  const [ppl, setPpl] = useState<Person[] | null>(orderedPeople ?? null);

  return (
    <>
      {ppl ? (
        <aside className={styles.sidebar}>
          <header>
            <div className={styles.logo}>
              <Link href="/">
                <span className="">VF</span>
                <span>Resourcing</span>
              </Link>
            </div>

            <FilterButtons ppl={ppl} setPpl={setPpl} />
          </header>

          {ppl ? <PeopleList people={ppl} /> : ""}

          <footer>
            <button className="add_resource bg-purple text-white">
              <Link href="/create">+ New resource</Link>
            </button>
          </footer>
        </aside>
      ) : (
        ""
      )}
    </>
  );
}
