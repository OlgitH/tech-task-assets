import Person from "../interfaces/person";
import Skill from "@/interfaces/skill";
export async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    return null
  }
  return res.json();
}

// function that manages the display order
  export const sortByName = (arr: Person[] | null, reverse: boolean = false) => {
    if (arr) {
      const sortedArray: Person[] = [...arr].sort((a, b) => {
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
    return null; // return null if arr falsy
  };

// post data to api
interface ResourceData { 
  firstname: string;
  lastname: string; 
  role: string; 
  email: string; 
  skills: Skill[]; 
}

export async function addResource(data: ResourceData): Promise<any> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/resources",
      requestOptions
    );

    if (!response.ok) {
      // If the response status is not okay, throw an error with the status text
      throw new Error(`Error: ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    // Handle any network or parsing errors
    console.error("Error adding resource:", error.message);
    throw new Error("Failed to add resource");
  }
}