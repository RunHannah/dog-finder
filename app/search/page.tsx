"use client";
import { useState } from "react";
import Profile from "@/components/Profile";
import { SortCategory, SortOrder } from "@/types/Search";
import { useSearch } from "@/hooks/useSearch";

function SearchPage() {
  const [breeds, setBreeds] = useState("");
  // Filtering
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  // Pagination
  const [page, setPage] = useState(0);
  // Sorting
  const [sortCategory, setSortCategory] = useState<SortCategory>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // Selection
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  const { dogProfiles, totalPages, error, isLoading } = useSearch({
    ageMax,
    ageMin,
    page,
    selectedBreed,
    sortCategory,
    sortOrder,
    zipCodes,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Search page</h1>
      {error && <div>{error}</div>}
      {dogProfiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 max-w-[1400px] m-auto mb-8">
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
        </div>
      )}
    </div>
  );
}

export default SearchPage;
