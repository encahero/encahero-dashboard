import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import formatDate from "@/utils/format-date";
import { headerTextClassName } from "@/constants";
import TableSkeleton from "./table-loading";
import { useMemo, useState } from "react";
import sortTable from "@/utils/sort-table";

function CategoryTable({ data, onDelete, onEdit, isLoading }) {
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(
    () => sortTable(data, sortConfig),
    [data, sortConfig]
  );

  return (
    <div className="overflow-auto border rounded bg-[var(--sidebar)] max-h-[80vh] w-full">
      <table className="w-full min-w-[700px] table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-100 dark:bg-stone-950 z-2">
          <tr>
            <th
              className={`${headerTextClassName} cursor-pointer`}
              onClick={() => handleSort("id")}
            >
              ID{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className={headerTextClassName}>Name</th>
            <th
              className={`${headerTextClassName} cursor-pointer`}
              onClick={() => handleSort("collection_count")}
            >
              CC{" "}
              {sortConfig.key === "collection_count"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className={`${headerTextClassName} cursor-pointer`}
              onClick={() => handleSort("updated_at")}
            >
              Updated At{" "}
              {sortConfig.key === "updated_at"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className={headerTextClassName}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : sortedData.length > 0 ? (
            sortedData.map((cat, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">{cat.collection_count}</td>
                <td className="px-4 py-2">{formatDate(cat.updated_at)}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(cat)}
                  >
                    <PenLineIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(cat.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 py-8">
                No category found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
