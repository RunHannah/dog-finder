"use client";
import { useState, useEffect, useRef } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  setPage,
}: PaginationControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePageClick = (page: number) => {
    setPage(page);
    setIsOpen(false);
  };

  // Close dropdown menu when outside click
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Pagination className="items-center mb-2.5">
      <PaginationItem className="list-none">
        <PaginationPrevious
          className={`text-purple-900 text-base border-2 border-purple-900 mx-5 p-5 h-[55px] max-w-[155px] sm:w-[155px] rounded-sm hover:bg-purple-900 hover:text-white
            ${
              currentPage === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
          `}
          onClick={() => (currentPage > 0 ? setPage(currentPage - 1) : "")}
        />
      </PaginationItem>

      {/* Trying to replicate pet finder pagination */}
      <div ref={dropdownRef} className="relative ">
        <p
          className="flex justify-center items-center text-center text-base border-2 border-purple-900 mx-5 p-5 h-[55px] max-w-[155px] sm:w-[155px] rounded-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {`Page ${currentPage + 1}/${totalPages}`}
        </p>

        {/* dropdown list */}
        {isOpen && (
          <ul className="absolute max-h-72 max-w-[155px] sm:w-[155px] mx-5 py-2 bg-white overflow-auto cursor-pointer">
            {pagesArray.map((page) => (
              <PaginationItem key={page} className="hover:bg-gray-300">
                <PaginationLink
                  className="w-full h-[55px] hover:bg-gray-300"
                  onClick={() => handlePageClick(page)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </ul>
        )}
      </div>

      <PaginationItem className="list-none">
        <PaginationNext
          className={`text-purple-900 text-base border-2 border-purple-900 mx-5 p-5 h-[55px] max-w-[155px] sm:w-[155px] rounded-sm hover:bg-purple-900 hover:text-white
            ${
              currentPage + 1 === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
          `}
          onClick={() =>
            currentPage + 1 < totalPages ? setPage(currentPage + 1) : ""
          }
        />
      </PaginationItem>
    </Pagination>
  );
}
