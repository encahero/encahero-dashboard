"use client";

import { Button } from "@/components/ui/button";

function TablePagination({
  page,
  totalPages,
  startIdx,
  visibleLength,
  totalCount,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between mt-3 text-sm">
      <div className="text-muted-foreground">
        Showing{" "}
        {totalCount === 0 ? 0 : `${startIdx + 1}–${startIdx + visibleLength}`}{" "}
        of {totalCount}
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onPrev}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Page {page} / {totalPages || 1}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={onNext}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default TablePagination;
