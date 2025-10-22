import { PenLineIcon, Trash2Icon } from "lucide-react";
import formatDate from "@/utils/format-date";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function CollectionTable({ data, onDelete, onEdit }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setCollections((prev) => {
      return [...prev].sort((a, b) => {
        let aVal = a[key];
        let bVal = b[key];

        if (key === "updated_at") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      });
    });
  };

  return (
    <div className="overflow-auto border rounded bg-[var(--sidebar)] h-[80vh] w-full">
      <table className="w-full min-w-[700px] table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-100 dark:bg-stone-950 z-2">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("card_count")}
            >
              CC{" "}
              {sortConfig.key === "card_count"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("register_count")}
            >
              RC{" "}
              {sortConfig.key === "register_count"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSort("updated_at")}
            >
              Updated At{" "}
              {sortConfig.key === "updated_at"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((col) => (
            <tr key={col.id} className="hover:bg-muted/50">
              <td className="px-4 py-2">{col.id}</td>
              <td className="px-4 py-2">{col.name}</td>
              <td className="px-4 py-2">{col.category.name}</td>
              <td className="px-4 py-2">{col.card_count}</td>
              <td className="px-4 py-2">{col.register_count}</td>
              <td className="px-4 py-2">{formatDate(col.updated_at)}</td>
              <td className="px-4 py-2 flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(col)}>
                  <PenLineIcon />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(col.id)}
                >
                  <Trash2Icon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CollectionTable;
