import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortCategory, SortOrder } from "@/types/Search";

interface SortMenuProps {
  sortCategories: SortCategory[];
  setSortOrder: (value: SortOrder) => void;
  setSortCategory: (value: SortCategory) => void;
}

export default function SortMenu({
  sortCategories,
  setSortOrder,
  setSortCategory,
}: SortMenuProps) {
  const handleCategoryChange = (value: string) => {
    setSortCategory(value as SortCategory);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-evenly">
      <Select onValueChange={(value: string) => handleCategoryChange(value)}>
        <SelectTrigger
          aria-label="Sort by"
          className="w-[190px] border-2 border-purple-950 m-2 text-sm md:text-base h-[35px] md:h-[55px] cursor-pointer"
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-sm md:text-base text-purple-900">
              Sort by
            </SelectLabel>
            {sortCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-col lg:flex-row lg:min-w-[200px]">
        <Button
          aria-label="sort by ascending order"
          variant={"outline"}
          className="border-purple-900 border-2 bg-purple-50 text-purple-900 m-2 text-sm md:text-base h-[35px] lg:w-[90px] md:h-[55px] hover:bg-purple-900  hover:text-white cursor-pointer"
          onClick={() => setSortOrder("asc")}
        >
          Asc
        </Button>
        <Button
          aria-label="sort by descending order"
          variant={"outline"}
          className="border-purple-900 border-2 bg-purple-50 text-purple-900 m-2 text-sm md:text-base h-[35px] lg:w-[90px]  md:h-[55px] hover:bg-purple-900  hover:text-white cursor-pointer"
          onClick={() => setSortOrder("desc")}
        >
          Desc
        </Button>
      </div>
    </div>
  );
}
