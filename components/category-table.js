import { Button } from "@/components/ui/button";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import formatDate from "@/utils/format-date";

function CategoryTable({ data, onDelete, onEdit }) {
  return (
    <div className="overflow-auto border rounded bg-[var(--sidebar)] h-[80vh] w-full">
      <table className="w-full min-w-[700px] table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-100 dark:bg-stone-950 z-2">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">CC</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat, index) => (
            <tr key={index} className="hover:bg-muted/50">
              <td className="px-4 py-2">{cat.id}</td>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">{cat.collection_count}</td>
              <td className="px-4 py-2">{formatDate(cat.updated_at)}</td>
              <td className="px-4 py-2 flex space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
