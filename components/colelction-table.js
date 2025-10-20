import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea className="h-[80vh] border rounded bg-[var(--sidebar)]">
      <Table noWrapper className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-stone-950 sticky top-0 z-10">
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Category</TableHead>
            <TableHead
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("card_count")}
            >
              CC{" "}
              {sortConfig.key === "card_count"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("register_count")}
            >
              RC{" "}
              {sortConfig.key === "register_count"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("updated_at")}
            >
              Updated At{" "}
              {sortConfig.key === "updated_at"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((col) => (
            <TableRow key={col.id}>
              <TableCell className="px-4 py-2">{col.id}</TableCell>
              <TableCell className="px-4 py-2">{col.name}</TableCell>
              <TableCell className="px-4 py-2">{col.category.name}</TableCell>
              <TableCell className="px-4 py-2">{col.card_count}</TableCell>
              <TableCell className="px-4 py-2">{col.register_count}</TableCell>
              <TableCell className="px-4 py-2">
                {formatDate(col.updated_at)}
              </TableCell>
              <TableCell className="px-4 py-2 space-x-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default CollectionTable;
