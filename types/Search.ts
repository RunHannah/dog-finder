export interface DogProfile {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

export type SortCategory = "breed" | "name" | "age";

export type SortOrder = "asc" | "desc";

export interface SearchParams {
  breeds: string[];
  size: number;
  from: number;
  zipCodes: string[];
  ageMin: number | null;
  ageMax: number | null;
  sort: unknown;
}

export interface SearchFilter
  extends Pick<SearchParams, "zipCodes" | "ageMin" | "ageMax"> {
  page: number;
  selectedBreed: string;
  sortCategory: SortCategory;
  sortOrder: SortOrder;
}

export const SORT_CATEGORIES = {
  breed: "breed",
  age: "age",
  name: "name",
} as const;

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export type CityStateType = {
  city: string;
  state: string[];
};

export interface DogSearchResponse {
  next: string; // "/dogs/search?size=25&from=25"
  resultIds: string[];
  total: number;
}
