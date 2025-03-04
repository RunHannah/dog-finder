interface FilterMenuProps {
  breeds: string[];
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
  ageMin: number | null;
  setAgeMin: (value: number | null) => void;
  ageMax: number | null;
  setAgeMax: (value: number | null) => void;
}

export default function FilterMenu({
  breeds,
  selectedBreed,
  setSelectedBreed,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
}: FilterMenuProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Breeds */}
      <div className="flex flex-col m-2">
        <label htmlFor="breed-select">Breed</label>
        <select
          className="outline-2 outline-purple-950 my-2 p-2 h-[55px] hover:cursor-pointer"
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
        <input
          className="outline-2 outline-purple-950 my-2 p-2 h-[55px]"
          id="age-min"
          name="age-min"
          min={0}
          max={20}
          placeholder="min age: 0"
          value={ageMin || ""}
          onChange={(e) =>
            setAgeMin(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      {/* Age - max */}
      <div className="flex flex-col m-2">
        <label htmlFor="age-max">Age: Maximum</label>
        <input
          className="outline-2 outline-purple-950 my-2 p-2 h-[55px]"
          id="age-max"
          name="age-max"
          min={0}
          max={15}
          placeholder="max age: 15"
          value={ageMax || ""}
          onChange={(e) =>
            setAgeMax(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>
    </div>
  );
}
