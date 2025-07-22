import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { PaginationEvents } from "@/interfaces/table";
import { cn } from "rizzui"; // Ensure you have the `cn` utility for merging class names

const TablePagination = ({
  totalPages,
  currentPage,
  paginationEvents,
}: {
  totalPages: number;
  currentPage: number;
  paginationEvents?: PaginationEvents;
}) => {
  const { onClickNumber, onNext, onPrevious } = paginationEvents || {};
  const { push } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    if (onClickNumber) {
      onClickNumber(page);
    } else {
      const url = `${pathname}?page=${page}`;
      push(url); // Navigate to the new URL
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      if (onPrevious) {
        onPrevious(currentPage - 1);
      } else {
        handlePageChange(currentPage - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      if (onNext) {
        onNext(currentPage + 1);
      } else {
        handlePageChange(currentPage + 1);
      }
    }
  };

  // Generate visible pages (similar to shadcn's logic)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of visible page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift("...");
    }
    if (endPage < totalPages) {
      pages.push("...");
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center"
    >
      <ul className="flex flex-row items-center gap-1">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium transition-colors",
              "hover:bg-gray-100 hover:text-gray-900",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </button>
        </li>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex h-9 w-9 items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-[#E02014] text-white"
                    : "hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium transition-colors",
              "hover:bg-gray-100 hover:text-gray-900",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TablePagination;
