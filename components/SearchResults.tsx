"use client";

import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "@/components/Profile";
import Grid from "@/components/Grid";
import { SearchFilter } from "@/types/Search";
import { useEffect } from "react";

interface SearchResultsProps extends SearchFilter {
  getTotalPages: (value: number) => void;
}

export default function SearchResults({
  ageMax,
  ageMin,
  page,
  selectedBreed,
  sortCategory,
  sortOrder,
  zipCodes,
  getTotalPages,
}: SearchResultsProps) {
  const { dogProfiles, totalPages, error, isLoading } = useSearch({
    ageMax,
    ageMin,
    page,
    selectedBreed,
    sortCategory,
    sortOrder,
    zipCodes,
  });

  useEffect(() => {
    if (totalPages) {
      getTotalPages(totalPages);
    }
  }, [totalPages, getTotalPages]);

  if (isLoading) {
    return (
      <>
        {isLoading && (
          <Grid>
            {Array.from({ length: 25 }).map((_, index) => (
              <Skeleton key={index} className="h-[400px] w-[250px] m-auto" />
            ))}
          </Grid>
        )}
      </>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (dogProfiles.length === 0) {
    return (
      <p className="text-purple-900 text-center">
        Sorry no profiles were found. 🐶
      </p>
    );
  }

  return (
    <>
      {dogProfiles.length > 0 && (
        <Grid>
          {dogProfiles.map((profile) => {
            const { id, img, name, breed, age, zip_code } = profile;
            return (
              <Profile
                key={id}
                id={id}
                img={img}
                breed={breed}
                name={name}
                age={age}
                zip_code={zip_code}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
}
