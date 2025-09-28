import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const PaginationControls: React.FC<Props> = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(page - 1, 1))}
            // isActive={page === 1}
            // inert={page === 1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (num) => (
            <PaginationItem key={num}>
              <PaginationLink
                onClick={() => setPage(num)}
                // isActive={num === page}
                // inert={num === page}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {totalPages > 7 && page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            // inert={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
