import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cleanCityState } from "@/lib/utils";
import { CityStateType } from "@/types/Search";

interface LocationInputProps {
  setLocation: ({ city, state }: CityStateType) => void;
}

export type ValidatedCityStateType = {
  city: string;
  state: string;
};

export default function LocationInput({ setLocation }: LocationInputProps) {
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
    <div className="w-full bg-purple-900 p-2">
      <div className="max-w-[1400px] m-auto flex flex-row">
        <Input
          className="w-[400px] mx-2 h-14 text-sm md:text-base border-2 bg-purple-50 text-purple-900"
          type="string"
          value={inputValue}
          placeholder="Enter city and state: Seattle, WA"
          onChange={handleOnChange}
        />
        <Button
          variant={"outline"}
          className="h-14 border-purple-200 border-2 bg-purple-200 text-purple-900text-sm md:text-base max-w-[90px] hover:bg-purple-900  hover:text-white cursor-pointer"
          onClick={handleOnClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
