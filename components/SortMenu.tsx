import { Button } from "@/components/ui/button";
import { SortOrder } from "@/types/Search";

interface SortMenuProps {
  setSortOrder: (value: SortOrder) => void;
}

export default function SortMenu({ setSortOrder }: SortMenuProps) {
  return (
    <div className="m-2 flex flex-col">
      <p>Sort By</p>
      <div className="flex flex-col lg:flex-row">
        <Button
          variant={"outline"}
          className="border-purple-900 border-2 bg-whte text-purple-900 m-2 p-2 h-[55px] w-[100px] hover:bg-purple-900 hover:cursor-pointer hover:text-white"
          onClick={() => setSortOrder("asc")}
        >
          Asc
        </Button>
        <Button
          variant={"outline"}
          className="border-purple-900 border-2 bg-whte text-purple-900 m-2 p-2 h-[55px] w-[100px] hover:bg-purple-900 hover:cursor-pointer hover:text-white"
          onClick={() => setSortOrder("desc")}
        >
          Desc
        </Button>
      </div>
    </div>
  );
}
