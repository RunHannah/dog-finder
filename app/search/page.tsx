"use client";
import { useEffect, useState } from "react";
import { getZipCodesByCityState } from "@/actions/dogs";
import LocationInputAndFavoritesLink from "@/components/LocationInputAndFavoritesLink";
import FilterMenu from "@/components/FilterMenu";
import SortMenu from "@/components/SortMenu";
import {
  SortCategory,
  SortOrder,
  Location,
  CityStateType,
} from "@/types/Search";
import { getBreeds } from "@/actions/dogs";
import SearchResults from "@/components/SearchResults";
import PaginationControls from "@/components/PaginationControls";

export default function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  // Filtering
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [location, setLocation] = useState<CityStateType | null>(null);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
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

  useEffect(() => {
    // To filter dogs by location, need to get the zip codes for that city and state
    const fetchZipCodes = async (location: CityStateType) => {
      const result: Location[] = await getZipCodesByCityState({
        city: location.city,
        state: location.state,
      });

      if (result.length > 0) {
        const zipCodesArray = result.map((location) => location.zip_code);
        setZipCodes(zipCodesArray);
      }
    };

    if (location && location.city && location.state) {
      fetchZipCodes(location);
    }
  }, [location]);

  return (
    <div>
      <LocationInputAndFavoritesLink setLocation={setLocation} />
      <div className="max-w-[1400px] m-auto">
        <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center md:items-baseline min-h-40 m-auto">
          <FilterMenu
            breeds={breeds}
            setSelectedBreed={setSelectedBreed}
            getAgeMin={setAgeMin}
            getAgeMax={setAgeMax}
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
          zipCodes={zipCodes}
          getTotalPages={setTotalPages}
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
