import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cleanCityState } from "@/lib/utils";
import { CityStateType } from "@/types/Search";
import Link from "next/link";

interface LocationInputAndFavoritesLinkProps {
  setLocation: ({ city, state }: CityStateType) => void;
}

export type ValidatedCityStateType = {
  city: string;
  state: string;
};

export default function LocationInputAndFavoritesLink({
  setLocation,
}: LocationInputAndFavoritesLinkProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [validatedCityState, setValidatedCityState] =
    useState<ValidatedCityStateType>({ city: "", state: "" });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const location = e.target.value;
    setInputValue(location);
  };

  const handleOnClick = () => {
    if (
      validatedCityState &&
      validatedCityState.city &&
      validatedCityState.state
    ) {
      setLocation({
        city: validatedCityState.city,
        state: [validatedCityState.state],
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      const validatedCityState = cleanCityState(debouncedValue);
      setValidatedCityState(validatedCityState);
    }
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
          <Button
            variant={"outline"}
            className="h-10 md:h-14 text-base w-full md:w-[30%] lg:w-[150px] xl:w-[200px] border-purple-200 border-2 bg-purple-200 text-purple-900 rounded-md hover:bg-purple-900 hover:text-white cursor-pointer"
            onClick={handleOnClick}
          >
            Search
          </Button>
        </div>

        {/* Link to favorites */}
        <Link
          className="mt-2 md:mt-0 h-10 md:h-14 w-full md:w-[30%] lg:w-[150px] xl:w-[200px] text-center border-purple-200 border-2 bg-purple-200 text-purple-900 text-base hover:text-white hover:bg-purple-900 cursor-pointer rounded-md flex justify-center items-center md:ml-4"
          href="/favorites"
        >
          See your favorites
        </Link>
      </div>
    </div>
  );
}
