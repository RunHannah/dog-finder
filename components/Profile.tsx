"use client";

import { useCallback } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DogProfile } from "@/types/Search";
import { useFavorites } from "@/context/FavoritesContext";

export default function Profile({
  id,
  img,
  breed,
  name,
  age,
  zip_code,
}: DogProfile) {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const isFavorite = favorites.some((dog) => dog.id === id);

  const handleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, img, breed, name, age, zip_code });
    }
  }, [
    isFavorite,
    removeFavorite,
    addFavorite,
    id,
    img,
    breed,
    name,
    age,
    zip_code,
  ]);

  // Generate status message for screen readers
  const statusMessage = isFavorite
    ? "Saved as a favorite"
    : "Removed from favorites";

  return (
    <Card key={id} className="max-w-xs mx-auto pt-0">
      <div className="w-[250px] h-[250px] overflow-hidden relative flex items-center justify-center">
        <Image
          className="rounded-tl-xl rounded-tr-xl"
          src={img}
          alt={breed}
          fill
          sizes="(max-width: 250px) 100vw"
          style={{
            objectPosition: "center",
            objectFit: "cover",
          }}
        />
      </div>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="text-2xl text-purple-900">{name}</CardTitle>
          <div
            role="status"
            aria-live="assertive"
            className="sr-only" // Ensure it’s visually hidden but still accessible
          >
            {statusMessage}
          </div>
          <Button
            aria-label={`Click to ${
              isFavorite ? "remove from" : "save as"
            } favorites`}
            className="w-[35px] text-3xl bg-transparent rounded-full hover:bg-purple-900 cursor-pointer"
            onClick={handleFavorite}
          >
            {isFavorite ? "💜" : "💔"}
          </Button>
        </div>
        <CardDescription className="flex flex-col">
          <p className="text-base">{breed}</p>
          <p className="text-base">
            {age === 0
              ? "Age unknown"
              : age === 1
              ? `${age} year`
              : `${age} years`}
          </p>
          <p className="text-base">Zip code: {zip_code}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
