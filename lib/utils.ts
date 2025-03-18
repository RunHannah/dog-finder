import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ValidatedCityStateType } from "@/components/LocationInputAndFavoritesLink";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanCityState(input: string): ValidatedCityStateType | null {
  // If the user cleared the input field
  if (input.length === 0) return { city: "", state: "" };

  const [city, state] = input
    .split(",")
    .map((item) => item.trim().toLowerCase());

  // Check if the city only contains letters and spaces
  const validCityRegex = /^[A-Za-z\s]+$/;

  // Check if the state is exactly 2 letters (a-z, no spaces)
  const validStateRegex = /^[a-zA-Z]{2}$/;

  if (validCityRegex.test(city) && validStateRegex.test(state)) {
    return { city, state };
  }

  // If city and state are not valid, then return all the results
  return null;
}
