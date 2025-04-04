"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cleanCityState } from "@/lib/utils";
import { CityStateType } from "@/types/Search";
import CustomButton from "./CustomButton";

interface LocationInputAndFavoritesLinkProps {
  setLocation: (location: CityStateType | null) => void;
  setSelectedBreed: (breed: string) => void;
  getAgeMin: (minAge: number | null) => void;
  getAgeMax: (maxAge: number | null) => void;
  setZipCodes: (values: string[]) => void;
}

export type ValidatedCityStateType = {
  city: string;
  state: string;
};

export default function LocationInputAndFavoritesLink({
  setLocation,
  setZipCodes,
  setSelectedBreed,
  getAgeMin,
  getAgeMax,
}: LocationInputAndFavoritesLinkProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [validatedCityState, setValidatedCityState] =
    useState<ValidatedCityStateType | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const location = e.target.value;
    setInputValue(location);
  };

  const handleOnClick = () => {
    if (validatedCityState) {
      setLocation({
        city: validatedCityState.city,
        state: [validatedCityState.state],
      });
    }
  };

  const handleClearSearch = () => {
    setLocation(null);
    setZipCodes([]);
    setSelectedBreed("");
    getAgeMin(null);
    getAgeMax(null);
    setInputValue("");
    setDebouncedValue("");
    setValidatedCityState(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const validatedCityState = cleanCityState(debouncedValue);
    setValidatedCityState(validatedCityState);
  }, [debouncedValue]);

  return (
    <div className="w-full bg-purple-900 p-2 flex flex-col items-center">
      <div className="max-w-[1400px] w-full flex flex-col md:flex-row justify-between items-center px-2">
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          {/* Location input field */}
          <Input
            className="h-10 md:h-14 text-sm w-full md:w-[70%] lg:w-[500px] xl:w-[600px] border-2 bg-purple-50 text-purple-900 rounded-md p-2"
            type="string"
            value={inputValue}
            placeholder="Enter city and state: Seattle, WA"
            onChange={handleOnChange}
          />

          {/* Search Button */}
          <CustomButton
            className="border-purple-200 bg-purple-200 text-purple-900 hover:bg-purple-900 hover:text-white"
            onClick={handleOnClick}
          >
            Search
          </CustomButton>

          {/* Clear Button*/}
          <CustomButton
            className="border-purple-200 bg-purple-200 text-purple-900 hover:bg-purple-900 hover:text-white"
            onClick={handleClearSearch}
          >
            Clear Search
          </CustomButton>
        </div>

        {/* Link to favorites */}
        <CustomButton
          className="mt-2 md:mt-0 text-center border-purple-200 bg-purple-200 text-purple-900 hover:text-white hover:bg-purple-900 flex justify-center items-center md:ml-4"
          href="/favorites"
        >
          See your favorites
        </CustomButton>
      </div>
    </div>
  );
}
