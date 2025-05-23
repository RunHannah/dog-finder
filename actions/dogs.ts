"use server";

import { cookies } from "next/headers";
import { SearchParams, CityStateType, DogSearchResponse } from "@/types/Search";

const url = "https://frontend-take-home-service.fetch.com";

// returns an array of breed names
export async function getBreeds(): Promise<string[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fetch-access-token")?.value;

    const response = await fetch(`${url}/dogs/breeds`, {
      headers: {
        Cookie: `fetch-access-token=${token}`,
      },
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
  zipCodes,
  ageMin,
  ageMax,
  size,
  from,
  sort,
}: SearchParams): Promise<DogSearchResponse> {
  try {
    const queryParams = new URLSearchParams();

    // Handle arrays by joining them with commas
    if (breeds && breeds.length > 0) {
      queryParams.append("breeds", breeds.join(","));
    }

    if (zipCodes && zipCodes.length > 0) {
      zipCodes.forEach((zip) => queryParams.append("zipCodes", zip));
    }

    if (ageMin) queryParams.append("ageMin", ageMin.toString());
    if (ageMax) queryParams.append("ageMax", ageMax.toString());
    if (size) queryParams.append("size", size.toString());
    if (from) queryParams.append("from", from.toString());
    if (sort) queryParams.append("sort", sort.toString());

    const cookieStore = await cookies();
    const token = cookieStore.get("fetch-access-token")?.value;

    const response = await fetch(`${url}/dogs/search?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `fetch-access-token=${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch /dogs/search: ${response.statusText}`);
    }

    const data: DogSearchResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to search dogs", error);
    throw error;
  }
}

export async function fetchDogsByIds(ids: string[]) {
  const idsLimit = ids.slice(0, 100); // max 100 ids
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fetch-access-token")?.value;

    const response = await fetch(`${url}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `fetch-access-token=${token}`,
      },
      body: JSON.stringify(idsLimit),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to getDogsByIds", error);
    throw error;
  }
}

export async function getZipCodesByCityState({ city, state }: CityStateType) {
  const validatedCity = city && /^[A-Za-z\s]+$/.test(city?.trim());
  const validatedState = state && Array.isArray(state);

  try {
    if (validatedCity && validatedState) {
      const cookieStore = await cookies();
      const token = cookieStore.get("fetch-access-token")?.value;

      const response = await fetch(`${url}/locations/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `fetch-access-token=${token}`,
        },
        body: JSON.stringify({ city: city, state: state }),
      });

      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    console.error("Error fetching zip codes", error);
  }
}

export async function getMatch(dogIds: string[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fetch-access-token")?.value;

    const response = await fetch(`${url}/dogs/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `fetch-access-token=${token}`,
      },
      body: JSON.stringify(dogIds),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching zip codes", error);
  }
}
