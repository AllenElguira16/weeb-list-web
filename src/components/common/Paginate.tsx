import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Button, IconButton, Stack, StackProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Paginate = forwardRef<HTMLDivElement, PaginateProps>(
  function Paginate(
    { currentPage, totalPages, onPageChange, ...stackProps },
    ref,
  ) {
    const getTotalPages = () => {
      let start = 0;
      let end = totalPages < 5 ? totalPages : 5;
      let pages = [];

      if (currentPage > 3 && totalPages > 5) {
        start = totalPages - 3 < currentPage ? totalPages - 5 : currentPage - 3;
      }

      if (totalPages > 5) {
        end = start + 5;
      }

      for (let i = start; i < end; i++) {
        pages.push(i + 1);
      }

      return pages;
    };

    const handlePageChange = (newCurrentPage: number) => () =>
      onPageChange!(newCurrentPage);

    return (
      <Stack ref={ref} {...stackProps}>
        <IconButton
          aria-label="Go-to First Page"
          icon={<ArrowLeftIcon />}
          onClick={handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <IconButton
          aria-label="Go-to Previous Page"
          onClick={handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={<ChevronLeftIcon />}
        />
        {getTotalPages().map((page, index) => (
          <Button
            key={index}
            isActive={page === currentPage}
            onClick={handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
        <IconButton
          aria-label="Go-to Next Page"
          onClick={handlePageChange(currentPage + 1)}
          icon={<ChevronRightIcon />}
          disabled={totalPages === 0 || currentPage === totalPages}
        />
        <IconButton
          aria-label="Go-to Last Page"
          onClick={handlePageChange(totalPages)}
          icon={<ArrowRightIcon />}
          disabled={totalPages === 0 || currentPage === totalPages}
        />
      </Stack>
    );
  },
);

export type PaginateProps = StackProps & {
  currentPage: number;
  totalPages: number;
  onPageChange?: (newCurrentPage: number) => void;
};
