"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pages.push(0, 1, 2, '...', totalPages - 1);
    } else if (currentPage >= totalPages - 3) {
      pages.push(0, '...', totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>

      {pages.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="text-gray-400 px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            aria-label={`Page ${(page as number) + 1}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {(page as number) + 1}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
