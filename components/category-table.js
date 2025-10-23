import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import formatDate from "@/utils/format-date";
import { headerTextClassName } from "@/constants";
import TableSkeleton from "./table-loading";
import { useMemo, useState } from "react";

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

  const sortedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (key === "updated_at" || key === "created_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className="overflow-auto border rounded bg-[var(--sidebar)] h-[80vh] w-full">
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
