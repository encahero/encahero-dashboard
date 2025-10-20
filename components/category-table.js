import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import formatDate from "@/utils/format-date";
function CategoryTable({ data, onDelete, onEdit }) {
  return (
    <ScrollArea className="h-[80vh] border rounded bg-[var(--sidebar)]">
      <Table noWrapper>
        <TableHeader>
          <TableRow className="bg-gray-100  dark:bg-stone-950  sticky top-0 z-10 ">
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">CC</TableHead>
            <TableHead className="px-4 py-2">createdAt</TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="px-4 py-2">{cat.id}</TableCell>
              <TableCell className="px-4 py-2">{cat.name}</TableCell>
              <TableCell className="px-4 py-2">
                {cat.collection_count}
              </TableCell>
              <TableCell className="px-4 py-2">
                {formatDate(cat.updated_at)}
              </TableCell>
              <TableCell className="px-4 py-2 space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(cat)}>
                  <PenLineIcon />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(cat.id)}
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

export default CategoryTable;
