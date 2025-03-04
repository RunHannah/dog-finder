import { useEffect, useState } from "react";

interface LocationSearchProps {
  setLocation: (location: string) => void;
}

export default function LocationSearch({ setLocation }: LocationSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const location = e.target.value.trim();
    setInputValue(location);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      setLocation(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="w-full bg-purple-900">
      <input
        className="h-14 mx-auto my-2.5 p-2.5 text-white font-bold border-2 w-96"
        type="string"
        value={inputValue}
        placeholder="Enter City, State, or Zip"
        onChange={handleOnChange}
      />
    </div>
  );
}
