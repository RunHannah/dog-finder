"server only";

import { SearchParams } from "@/types/Search";

const url = "https://frontend-take-home-service.fetch.com";

// returns an array of breed names
export async function getBreeds() {
  try {
    const response = await fetch(`${url}/dogs/breeds`, {
      credentials: "include",
    });

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to search dogs", error);
    throw error;
  }
}

// will return an array of dogs ids: resultIds[]
export async function searchDogs({
  breeds,
  zipCode,
  ageMin,
  ageMax,
  size,
  from,
  sort,
}: SearchParams) {
  try {
    const queryParams = new URLSearchParams();

    // Handle arrays by joining them with commas
    if (breeds && breeds.length > 0) {
      queryParams.append("breeds", breeds.join(","));
    }

    if (zipCode) queryParams.append("zip_code", zipCode.toString());
    if (ageMin) queryParams.append("ageMin", ageMin.toString());
    if (ageMax) queryParams.append("ageMax", ageMax.toString());
    if (size) queryParams.append("size", size.toString());
    if (from) queryParams.append("from", from.toString());
    if (sort) queryParams.append("sort", sort.toString());

    const response = await fetch(`${url}/dogs/search?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to search dogs", error);
    throw error;
  }
}

export async function fetchDogsByIds(ids: string[]) {
  const idsLimit = ids.slice(0, 100); // max 100 ids
  try {
    const response = await fetch(`${url}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(idsLimit),
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to getDogsByIds", error);
    throw error;
  }
}
