import { useState, useEffect } from "react";
import { searchDogs, fetchDogsByIds } from "@/actions/dogs";
import { DogProfile, SearchFilter } from "@/types/Search";

export const useSearch = ({
  zipCodes,
  ageMin,
  ageMax,
  page,
  selectedBreed,
  sortCategory,
  sortOrder,
}: SearchFilter) => {
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    setIsLoading(true);
    try {
      const filters = {
        breeds: selectedBreed ? [selectedBreed] : [],
        size: 25,
        from: page * 25,
        zipCodes,
        ageMin: ageMin,
        ageMax: ageMax,
        sort: `${sortCategory}:${sortOrder}`,
      };

      // Returns an array of dogIds
      const result = await searchDogs(filters);
      // Set total pages for pagination
      setTotalPages(Math.ceil(result.total / 25));
      // fetch data for each id
      const profilesResult = await fetchDogsByIds(result.resultIds);
      setDogProfiles(profilesResult);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setError("Sorry, there was an error. Please try again later. 😞");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [ageMax, ageMin, page, selectedBreed, sortCategory, sortOrder, zipCodes]);

  return { dogProfiles, totalPages, error, isLoading };
};
