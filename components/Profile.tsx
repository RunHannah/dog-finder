import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DogProfile } from "@/types/Search";

export default function Profile({
  id,
  img,
  breed,
  name,
  age,
  zip_code,
}: DogProfile) {
  return (
    <Card key={id} className="max-w-xs mx-auto pt-0">
      <div className="w-[250px] h-[250px] overflow-hidden relative">
        <Image
          className="rounded-tl-xl rounded-tr-xl"
          src={img}
          width={250}
          height={250}
          layout="intrinsic"
          objectFit="cover"
          alt={breed}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl text-purple-900">{name}</CardTitle>
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
