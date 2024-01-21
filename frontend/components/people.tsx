import Person from "@/interfaces/person";
import { useState } from "react";
import FilterButtons from "./filter-buttons";
import { sortByName } from "@/lib/helpers";
import PeopleList from "./people-list";
import Link from "next/link";
type Props = {
  people: Person[] | undefined;
};

export default function People({ people }: Props) {
  // set up people as state
  const [ppl, setPpl] = useState<Person[] | undefined>(sortByName(people));

  return (
    <>
      {ppl ? (
        <div>
          <header className="flex flex-col">
            <div className="flex flex-row border-b">
              <Link href="/">VF Resourcing</Link>
            </div>
            <div className="flex flex-row border-b gap-4">
              <FilterButtons ppl={ppl} setPpl={setPpl} />
            </div>
          </header>

          <div>{ppl ? <PeopleList people={ppl} /> : ""}</div>

          <footer>
            <button className="add-resource bg-purple-600 text-white rounded px-4 py-2">
              <Link href="/create">New resource</Link>
            </button>
          </footer>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
