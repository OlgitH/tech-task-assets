import Person from "@/interfaces/person";
import { sortByName } from "@/lib/helpers";
import styles from "@/styles/Sidebar.module.css";

type Props = {
  ppl: Person[] | null;
  setPpl: React.Dispatch<React.SetStateAction<Person[] | null>>;
};

export default function FilterButtons({ ppl, setPpl }: Props) {
  return (
    <div className={styles.filter}>
      <span className="block uppercase">Sort</span>
      <div>
        <button
          className="filter-resources bg-lightpurple text-white"
          onClick={() => setPpl(sortByName(ppl))}
        >
          A-Z
        </button>
        <button
          className="filter-resources bg-purple text-white"
          onClick={() => setPpl(sortByName(ppl, true))}
        >
          Z-A
        </button>
      </div>
    </div>
  );
}
