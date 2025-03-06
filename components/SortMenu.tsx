import { Button } from "@/components/ui/button";
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
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortCategory;
    setSortCategory(value);
  };

  return (
    <div className="my-2 flex flex-col lg:flex-row items-end">
      <div className="flex flex-col">
        <label htmlFor="sort-category">Sort By</label>
        <select
          name="sort-category"
          className="border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-white text-purple-900 w-[170px]"
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {sortCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant={"outline"}
        className="border-purple-900 border-2 bg-white text-purple-900 m-2 p-2 h-[55px] w-[100px] hover:bg-purple-900 hover:cursor-pointer hover:text-white"
        onClick={() => setSortOrder("asc")}
      >
        Asc
      </Button>
      <Button
        variant={"outline"}
        className="border-purple-900 border-2 bg-white text-purple-900 m-2 p-2 h-[55px] w-[100px] hover:bg-purple-900 hover:cursor-pointer hover:text-white"
        onClick={() => setSortOrder("desc")}
      >
        Desc
      </Button>
    </div>
  );
}
