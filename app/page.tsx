import Image from "next/image";
import PetCard from "@/components/PetCard";

export default function Home() {
  const pets = [
    {
      name: "Meg and Harry",
      src: "/dog-two.jpg",
      alt: "photo of meg and harry",
    },
    { name: "Simu", src: "/dog-three.jpg", alt: "photo of simu" },
    { name: "Ramona", src: "/dog-four.jpg", alt: "photo of ramona" },
    { name: "Rosalia", src: "/dog-five.jpg", alt: "photo of rosalia" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-[500px]">
        <Image
          src="/dog-one.jpg"
          fill
          objectFit="cover"
          alt="hero photo of a happy dog"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2.5">
          <h1 className="text-white text-5xl font-bold text-center mb-5">
            Find your new best friend!
          </h1>
          <h2 className="text-white text-2xl font-bold text-center">
            Browse dogs from our network of shelters and rescues.
          </h2>
        </div>
      </section>
      <section>
        <div className="my-10 text-center text-2xl text-purple-900 font-bold">
          <p>Dogs Available for Adoption Nearby</p>
        </div>
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pets.map((pet) => (
            <PetCard
              key={pet.name}
              name={pet.name}
              src={pet.src}
              alt={pet.src}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
