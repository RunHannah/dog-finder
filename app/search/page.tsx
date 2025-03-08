"use client";
import { useCallback, useEffect, useState } from "react";
import LocationSearch from "@/components/LocationSearch";
import FilterMenu from "@/components/FilterMenu";
import SortMenu from "@/components/SortMenu";
import { SortCategory, SortOrder } from "@/types/Search";
import { getBreeds } from "@/actions/dogs";
import SearchResults from "@/components/SearchResults";
import PaginationControls from "@/components/PaginationControls";

function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  // Filtering
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("");
  // const [zipCode, setZipCode] = useState<string[]>([]);
  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);
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

  const getTotalPages = useCallback((value: number) => {
    setTotalPages(value);
  }, []);

  const getAgeMin = useCallback((value: number | null) => {
    setAgeMin(value);
  }, []);

  const getAgeMax = useCallback((value: number | null) => {
    setAgeMax(value);
  }, []);

  return (
    <div>
      <LocationSearch setLocation={setLocation} />
      <div className="max-w-[1400px] m-auto">
        <div className="flex flex-row justify-center lg:justify-between items-baseline min-h-40">
          <FilterMenu
            breeds={breeds}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            ageMin={ageMin}
            getAgeMin={getAgeMin}
            ageMax={ageMax}
            getAgeMax={getAgeMax}
          />
          <SortMenu
            sortCategories={["age", "name", "breed"]}
            setSortOrder={setSortOrder}
            setSortCategory={setSortCategory}
          />
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
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default SearchPage;
