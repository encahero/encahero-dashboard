"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PenLineIcon, Trash2Icon } from "lucide-react";
import Selector from "@/components/selector";
import { collectionService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function CollectionTable() {
  const [categories] = useState([
    "Vocabulary",
    "Travel English",
    "Business English",
    "Grammar",
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCollection, setEditCollection] = useState(null);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState(categories[0]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const {
    data: collections = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionService.getAllCollections(),
  });

  const handleSave = () => {
    if (!name) return;

    if (editCollection) {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === editCollection.id
            ? { ...c, name, categoryName, updated_at: new Date().toISOString() }
            : c
        )
      );
    } else {
      const newCol = {
        id: collections.length + 1,
        name,
        categoryName,
        register_count: 0,
        card_count: 0,
        updated_at: new Date().toISOString(),
      };
      setCollections([...collections, newCol]);
    }

    setModalOpen(false);
    setName("");
    setCategoryName(categories[0]);
    setEditCollection(null);
  };

  const handleEdit = (col) => {
    setEditCollection(col);
    setName(col.name);
    setCategoryName(col.categoryName);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setCollections(collections.filter((c) => c.id !== id));
  };

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
    <ScrollArea className="h-full w-full">
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Collections</h1>
          <Button onClick={() => setModalOpen(true)}>New Collection</Button>
        </div>

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
              {collections.map((col) => (
                <TableRow key={col.id}>
                  <TableCell className="px-4 py-2">{col.id}</TableCell>
                  <TableCell className="px-4 py-2">{col.name}</TableCell>
                  <TableCell className="px-4 py-2">
                    {col.categoryName}
                  </TableCell>
                  <TableCell className="px-4 py-2">{col.card_count}</TableCell>
                  <TableCell className="px-4 py-2">
                    {col.register_count}
                  </TableCell>
                  <TableCell className="px-4 py-2">{col.updated_at}</TableCell>
                  <TableCell className="px-4 py-2 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cat)}
                    >
                      <PenLineIcon />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        {/* Modal */}
        <Dialog
          open={modalOpen}
          onOpenChange={() => {
            setModalOpen(false);
            setEditCollection(null);
            setName("");
            setCategoryName(categories[0]);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editCollection ? "Edit Collection" : "New Collection"}
              </DialogTitle>
              <DialogDescription>
                {editCollection
                  ? "Update your collection information."
                  : "Create a new collection."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Collection Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Selector
                value={categoryName}
                onValueChange={setCategoryName}
                list={categories}
              />
            </div>

            <DialogFooter>
              <Button onClick={handleSave}>
                {editCollection ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  );
}
