import Person from "@/interfaces/person";
import { sortByName } from "@/lib/helpers";

type Props = {
  ppl: Person[] | undefined;
  setPpl: React.Dispatch<React.SetStateAction<Person[] | undefined>>;
};

export default function FilterButtons({ ppl, setPpl }: Props) {
  return (
    <>
      <span className="block uppercase">Sort</span>
      <button
        className="filter-resources bg-gray-300 text-white rounded px-4 py-2"
        onClick={() => setPpl(sortByName(ppl))}
      >
        A-Z
      </button>
      <button
        className="filter-resources bg-gray-300 text-white rounded px-4 py-2"
        onClick={() => setPpl(sortByName(ppl, true))}
      >
        Z-A
      </button>
    </>
  );
}
