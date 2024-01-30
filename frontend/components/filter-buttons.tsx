import Person from "@/interfaces/person";
import { sortByName } from "@/lib/helpers";
import styles from "@/styles/Sidebar.module.css";
import { useState } from "react";
type Props = {
  ppl: Person[] | null;
  setPpl: React.Dispatch<React.SetStateAction<Person[] | null>>;
};

export default function FilterButtons({ ppl, setPpl }: Props) {
  const [activeBtn, setActiveBtn] = useState<string>("az");
  const handleSortClick = (sortingOption: string) => {
    setActiveBtn(sortingOption);
    if (sortingOption === "az") {
      setPpl(sortByName(ppl));
    } else if (sortingOption === "za") {
      setPpl(sortByName(ppl, true));
    }
  };

  return (
    <div className={styles.filter}>
      <span className="block uppercase">Sort</span>
      <div>
        <button
          className={`filter-resources bg-lightpurple text-white ${
            activeBtn === "az" ? "active" : ""
          }`}
          onClick={() => handleSortClick("az")}
        >
          A-Z
        </button>
        <button
          className={`filter-resources bg-purple text-white ${
            activeBtn === "za" ? "active" : ""
          }`}
          onClick={() => handleSortClick("za")}
        >
          Z-A
        </button>
      </div>
    </div>
  );
}
