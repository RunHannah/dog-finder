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
