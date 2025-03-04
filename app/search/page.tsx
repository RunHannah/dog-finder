"use client";
import { useEffect, useState } from "react";
import { searchDogs, fetchDogsByIds } from "@/actions/dogs";
import Profile from "@/components/Profile";
import { DogProfile } from "@/types/Dog";

function SearchPage() {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const data = await searchDogs();
        setDogIds(data.resultIds);
      } catch (error) {
        console.log("error", error);
        setError("Failed to fetch dog IDs");
      }
    };
    getDogs();
  }, []);

  useEffect(() => {
    const getDogsByIds = async () => {
      try {
        const data = await fetchDogsByIds(dogIds);
        setDogProfiles(data);
      } catch (error) {
        console.log("error", error);
        setError("Failed to fetchDogsByIds");
      }
    };
    if (dogIds.length) {
      getDogsByIds();
    }
  }, [dogIds]);

  console.log("dogsIds", dogIds.length);
  console.log("dogProfiles", dogProfiles.length);

  return (
    <div>
      <h1>Search page</h1>
      {error && <div>{error}</div>}
      {dogProfiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 max-w-[1400px] m-auto mb-8">
          {dogProfiles.map((profile) => {
            const { id, img, name, breed, age, zip_code } = profile;
            return (
              <Profile
                key={id}
                id={id}
                img={img}
                breed={breed}
                name={name}
                age={age}
                zip_code={zip_code}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
