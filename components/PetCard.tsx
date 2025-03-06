import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface PetCardProps {
  name: string;
  src: string;
  alt: string;
}

export default function PetCard({ name, src, alt }: PetCardProps) {
  return (
    <Card className="w-fit h-[300px] border-purple-900 border-2 py-0 m-2 font-bold text-purple-900 text-lg text-center">
      <Image
        className="rounded-tl-lg rounded-tr-lg"
        src={src}
        alt={alt}
        width={300}
        height={30}
      />
      <CardContent>
        <p>{name}</p>
      </CardContent>
    </Card>
  );
}
