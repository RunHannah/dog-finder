"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DogProfile } from "@/types/Search";

interface FavoritesContextType {
  favorites: DogProfile[];
  addFavorite: (dog: DogProfile) => void;
  removeFavorite: (dogId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<DogProfile[]>([]);

  const addFavorite = (dog: DogProfile) => {
    setFavorites((prevFavorites) => [...prevFavorites, dog]);
  };

  const removeFavorite = (dogId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((dog) => dog.id !== dogId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
