"use client";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import Grid from "@/components/Grid";
import LocationSearch from "@/components/LocationSearch";
import FilterMenu from "@/components/FilterMenu";
import SortMenu from "@/components/SortMenu";
import { SortCategory, SortOrder } from "@/types/Search";
import { useSearch } from "@/hooks/useSearch";
import { getBreeds } from "@/actions/dogs";

function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  // Filtering
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");
  // const [zipCode, setZipCode] = useState<string[]>([]);
  // Pagination
  const [page, setPage] = useState(0);
  // Sorting
  const [sortCategory, setSortCategory] = useState<SortCategory>("age");
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
    zipCode: location,
  });

  useEffect(() => {
    const fetchBreeds = async () => {
      const result = await getBreeds();
      setBreeds(result);
    };
    fetchBreeds();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dog Finder</h1>
      <LocationSearch setLocation={setLocation} />
      {error && <div>{error}</div>}

      <div>
        <div className="flex flex-row justify-center lg:justify-between items-end">
          <FilterMenu
            breeds={breeds}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            ageMin={ageMin}
            setAgeMin={setAgeMin}
            ageMax={ageMax}
            setAgeMax={setAgeMax}
          />
          <SortMenu setSortOrder={setSortOrder} />
        </div>
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
      </div>
    </div>
  );
}

export default SearchPage;
