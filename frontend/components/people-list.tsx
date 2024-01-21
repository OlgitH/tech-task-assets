import Person from "@/interfaces/person";
import Link from "next/link";
type Props = {
  people: Person[] | undefined;
};

export default function PeopleList({ people }: Props) {
  return (
    <div>
      {people
        ? people.map((p: Person, i) => {
            return (
              <div className="person" key={`p-${i}`}>
                <Link href={`/detail/${p.id}`}>{p.name}</Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}
