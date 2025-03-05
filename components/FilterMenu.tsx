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
          <label htmlFor="breed-select">Breed</label>
          <select
            className="border-2 border-purple-950 my-2 p-2 h-[55px]"
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
          <label htmlFor="age-min">Age: Minimum</label>
          <select
            className="border-2 border-purple-950 my-2 p-2 h-[55px]"
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
          <label htmlFor="age-max">Age: Maximum</label>
          <select
            className="border-2 border-purple-950 my-2 p-2 h-[55px]"
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
      {error && (
        <p className="text-sm text-red-700 font-bold mb-2 p-2">{error}</p>
      )}
    </div>
  );
}
