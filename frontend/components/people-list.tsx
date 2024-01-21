import Person from "@/interfaces/person";

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
                {p.name}
              </div>
            );
          })
        : ""}
    </div>
  );
}
