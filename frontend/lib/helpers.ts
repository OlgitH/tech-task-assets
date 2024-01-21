import Person from "../interfaces/person";

export async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// function that manages the display order
  export const sortByName = (arr: Array<Person> | undefined, reverse: boolean = false) => {
    if (arr) {
      const sortedArray = [...arr].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

          return reverse ? sortedArray.reverse() : sortedArray;
    }
    return; // return if arr falsy
  };