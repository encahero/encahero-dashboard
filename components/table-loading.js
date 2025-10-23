// components/card-table-skeleton.js
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5, columns = 8 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-2">
              <Skeleton className="h-4 w-full rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
