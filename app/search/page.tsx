"use client";
import { useCallback, useEffect, useState } from "react";
import LocationSearch from "@/components/LocationSearch";
import FilterMenu from "@/components/FilterMenu";
import SortMenu from "@/components/SortMenu";
import { SortCategory, SortOrder } from "@/types/Search";
import { getBreeds } from "@/actions/dogs";
import SearchResults from "@/components/SearchResults";

function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  // Filtering
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");
  // const [zipCode, setZipCode] = useState<string[]>([]);
  // Pagination
  const [page, setPage] = useState(0);
  const [totalPagesAvailable, setTotalPagesAvailable] = useState<number | null>(
    null
  );
  // Sorting
  const [sortCategory, setSortCategory] = useState<SortCategory>("age");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // Selection
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  useEffect(() => {
    const fetchBreeds = async () => {
      const result = await getBreeds();
      setBreeds(result);
    };
    fetchBreeds();
  }, []);

  const getTotalPages = useCallback((value: number | null) => {
    setTotalPagesAvailable(value);
  }, []);

  const getAgeMin = useCallback((value: number | null) => {
    setAgeMin(value);
  }, []);

  const getAgeMax = useCallback((value: number | null) => {
    setAgeMax(value);
  }, []);

  return (
    <div>
      <h1>Dog Finder: All About Doggos!</h1>
      <LocationSearch setLocation={setLocation} />
      <div className="max-w-[1400px] m-auto">
        <div className="flex flex-row justify-center lg:justify-between items-end">
          <FilterMenu
            breeds={breeds}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            ageMin={ageMin}
            getAgeMin={getAgeMin}
            ageMax={ageMax}
            getAgeMax={getAgeMax}
          />
          <SortMenu setSortOrder={setSortOrder} />
        </div>
        <SearchResults
          ageMax={ageMax}
          ageMin={ageMin}
          page={page}
          selectedBreed={selectedBreed}
          sortCategory={sortCategory}
          sortOrder={sortOrder}
          zipCode={location}
          getTotalPages={getTotalPages}
        />
      </div>
    </div>
  );
}

export default SearchPage;
