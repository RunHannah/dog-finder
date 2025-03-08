import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterMenuProps {
  breeds: string[];
  setSelectedBreed: (value: string) => void;
  getAgeMin: (value: number | null) => void;
  getAgeMax: (value: number | null) => void;
}

export default function FilterMenu({
  breeds,
  setSelectedBreed,
  getAgeMin,
  getAgeMax,
}: FilterMenuProps) {
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [error, setError] = useState("");
  const ageRange = Array.from({ length: 16 }, (_, index) => index);

  const handleAgeFilter = (value: string, type: "ageMin" | "ageMax") => {
    if (type === "ageMin") setMin(Number(value));
    if (type === "ageMax") setMax(Number(value));
  };

  useEffect(() => {
    if (min !== null && max !== null && min > max) {
      setError(`Please select an age greater than ${min} years.`);
    } else {
      getAgeMin(min);
      getAgeMax(max);
      setError("");
    }
  }, [min, max, getAgeMin, getAgeMax]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row justify-evenly">
        {/* Breeds */}
        <Select onValueChange={(value) => setSelectedBreed(value)}>
          <SelectTrigger className="w-[190px] border-2 border-purple-950 m-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer">
            <SelectValue placeholder="Choose a breed" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-sm md:text-base">Breeds</SelectLabel>
              {breeds.length > 0 &&
                breeds.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Age - min */}
        <Select onValueChange={(value) => handleAgeFilter(value, "ageMin")}>
          <SelectTrigger className="w-[190px] border-2 border-purple-950 m-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer">
            <SelectValue placeholder="Choose a min age" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-sm md:text-base">
                Age range
              </SelectLabel>
              {ageRange.map((age) => (
                <SelectItem key={age} value={age.toString()}>
                  {age} years
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Age - max */}
        <Select onValueChange={(value) => handleAgeFilter(value, "ageMax")}>
          <SelectTrigger className="w-[190px] border-2 border-purple-950 m-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer">
            <SelectValue placeholder="Choose a max age" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-sm md:text-base">
                Age range
              </SelectLabel>
              {ageRange.map((age) => (
                <SelectItem key={age} value={age.toString()}>
                  {age} years
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* div wrapper so error message displays below filters*/}
      {error && (
        <p className="text-sm text-red-700 font-bold mb-2 p-2">{error}</p>
      )}
    </div>
  );
}
