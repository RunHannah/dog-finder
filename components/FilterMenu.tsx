import { useState, useEffect } from "react";

interface FilterMenuProps {
  breeds: string[];
  selectedBreed: string;
  ageMin: number | null;
  ageMax: number | null;
  setSelectedBreed: (value: string) => void;
  getAgeMin: (value: number | null) => void;
  getAgeMax: (value: number | null) => void;
}

export default function FilterMenu({
  breeds,
  selectedBreed,
  ageMin,
  ageMax,
  setSelectedBreed,
  getAgeMin,
  getAgeMax,
}: FilterMenuProps) {
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [error, setError] = useState("");
  const ageRange = Array.from({ length: 16 }, (_, index) => index);

  const handleAgeFilter = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "ageMin" | "ageMax"
  ) => {
    if (type === "ageMin") setMin(Number(e.target.value));
    if (type === "ageMax") setMax(Number(e.target.value));
  };

  useEffect(() => {
    if (min !== null && max !== null && min > max) {
      setError(`Please select a minimum age less than ${max}`);
    } else {
      getAgeMin(min);
      getAgeMax(max);
      setError("");
    }
  }, [min, max, getAgeMin, getAgeMax]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        {/* Breeds */}
        <div className="flex flex-col m-2">
          <label htmlFor="breed-select" className="text-sm md:text-base">
            Breed
          </label>
          <select
            className="border-2 border-purple-950 my-2 p-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer"
            id="breed-select"
            name="breeds"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">Choose a breed</option>
            {breeds.length > 0 &&
              breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
          </select>
        </div>

        {/* Age - min */}
        <div className="flex flex-col m-2">
          <label htmlFor="age-min" className="text-sm md:text-base">
            Age: Minimum
          </label>
          <select
            className="border-2 border-purple-950 my-2 p-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer"
            id="age-min"
            name="age-min"
            value={ageMin || ""}
            onChange={(e) => handleAgeFilter(e, "ageMin")}
          >
            <option value="">minimum age</option>
            {ageRange.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        {/* Age - max */}
        <div className="flex flex-col m-2">
          <label htmlFor="age-max" className="text-sm md:text-base">
            Age: Maximum
          </label>
          <select
            className="border-2 border-purple-950 my-2 p-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer"
            id="age-max"
            name="age-max"
            value={ageMax || ""}
            onChange={(e) => handleAgeFilter(e, "ageMax")}
          >
            <option value="">maximum age</option>
            {ageRange.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* div wrapper so error message displays below filters*/}
      {error && (
        <p className="text-sm text-red-700 font-bold mb-2 p-2">{error}</p>
      )}
    </div>
  );
}
