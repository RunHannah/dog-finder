"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/button";
import Profile from "@/components/Profile";
import { getMatch } from "@/actions/dogs";
import { DogProfile } from "@/types/Search";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [isMatch, setIsMatch] = useState<{ match: string } | null>(null);
  const [viewMatch, setViewMatch] = useState<DogProfile | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleGoBack = () => {
    router.push("/search");
  };

  const handleGetMatch = async () => {
    const dogsIds = favorites.map((favorite) => favorite.id);
    const result = await getMatch(dogsIds);
    setIsMatch(result);
  };

  useEffect(() => {
    if (isMatch) {
      const findMatch = favorites.filter(
        (favorite) => favorite.id === isMatch.match
      );
      setViewMatch(findMatch.length > 0 ? findMatch[0] : null);
    }
  }, [isMatch, favorites]);

  useEffect(() => {
    if (viewMatch) {
      setIsDrawerOpen(true); // Open drawer when there's a match
    }
  }, [viewMatch]);

  return (
    <div className="min-h-screen mb-10">
      <div className="max-w-[1400px] m-auto">
        <h1 className="text-3xl text-center my-4">Your Favorite Dogs 💜</h1>
        <div className="flex flex-col md:flex-row justify-center">
          <Button
            onClick={handleGoBack}
            variant={"outline"}
            className="border-purple-900 border-2 bg-white text-purple-900 m-2 text-sm md:text-base h-[35px] hover:bg-purple-900  hover:text-white cursor-pointer"
          >
            Go Back to Search
          </Button>
          <Button
            onClick={handleGetMatch}
            variant={"outline"}
            className="border-purple-900 border-2 bg-purple-200 text-purple-950 m-2 text-sm md:text-base h-[35px] hover:bg-purple-900  hover:text-white cursor-pointer"
          >
            Check if there&apos;s a match!
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.length === 0 ? (
            <p className="text-center">You have no favorite dogs yet. 🐶</p>
          ) : (
            favorites.map((dog) => (
              <Profile
                key={dog.id}
                id={dog.id}
                img={dog.img}
                breed={dog.breed}
                name={dog.name}
                age={dog.age}
                zip_code={dog.zip_code}
              />
            ))
          )}
        </div>

        {/* Match Success */}
        {isDrawerOpen && viewMatch && (
          <Drawer open={isDrawerOpen}>
            <DrawerContent className="bg-purple-100">
              <DrawerHeader>
                <DrawerTitle className="text-center text-2xl text-purple-900">
                  Hooray!
                </DrawerTitle>
                <DrawerDescription className="text-center text-lg text-purple-900">{`You matched with ${viewMatch.name}!`}</DrawerDescription>
                <Profile
                  key={viewMatch.id}
                  id={viewMatch.id}
                  img={viewMatch.img}
                  breed={viewMatch.breed}
                  name={viewMatch.name}
                  age={viewMatch.age}
                  zip_code={viewMatch.zip_code}
                />
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    variant={"outline"}
                    className="mx-auto border-purple-900 border-2 bg-white text-purple-900 text-sm md:text-base h-[55px] w-[100px] hover:bg-purple-900  hover:text-white cursor-pointer"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
