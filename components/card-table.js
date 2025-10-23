import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import ImageWithFallback from "./image-with-fallback";
import formatDate from "@/utils/format-date";
import { headerTextClassName } from "@/constants";
import TableSkeleton from "./table-loading";
import sortTable from "@/utils/sort-table";

function CardTable({ data = [], onDelete, onEdit, isLoading = false }) {
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
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
    <div className="overflow-auto border rounded bg-[var(--sidebar)] max-h-[70vh]">
      <table className="w-full min-w-[800px] table-auto border-collapse">
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
            <th className={headerTextClassName}>Thumbnail</th>
            <th className={headerTextClassName}>EN Word</th>
            <th className={headerTextClassName}>VN Word</th>
            <th className={headerTextClassName}>Type</th>
            <th className={headerTextClassName}>Collection</th>
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
            <TableSkeleton rows={5} columns={8} />
          ) : sortedData.length > 0 ? (
            sortedData.map((card) => (
              <tr
                key={card.id}
                className="hover:bg-gray-200 dark:hover:bg-stone-800"
              >
                <td className="px-4 py-2">{card.id}</td>
                <td className="px-4 py-2">
                  <ImageWithFallback
                    src={card.image_url}
                    alt={card.en_word}
                    className="w-8 h-8 dark:bg-white border"
                  />
                </td>
                <td className="px-4 py-2">{card.en_word}</td>
                <td className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.vn_word}
                </td>
                <td className="px-4 py-2">{card.type}</td>
                <td className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap truncate">
                  {card.collectionName}
                </td>
                <td className="px-4 py-2">{formatDate(card.updated_at)}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(card)}
                  >
                    <PenLineIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(card.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 py-8">
                No cards found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CardTable;
