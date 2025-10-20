"use client";

import { useEffect, useState } from "react";
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
import { categoryService, collectionService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import formatDate from "@/utils/format-date";

export default function Collection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCollection, setEditCollection] = useState(null);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAllCategories(),
  });

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionService.getAllCollections(),
  });

  useEffect(() => {
    if (categories.length > 0 && !categoryName) {
      setCategoryName(categories[0].name);
    }
  }, [categories]);

  const { mutate: createCol } = useMutation({
    mutationFn: ({ name, categoryName }) =>
      collectionService.createCollection(name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
    },
    onError: (err) => alert(err.message),
  });

  const { mutate: updateCol } = useMutation({
    mutationFn: ({ id, name, categoryName }) =>
      collectionService.updateCollection(id, name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
    },
    onError: (err) => alert(err.message),
  });

  const { mutate: deleteCol } = useMutation({
    mutationFn: (id) => collectionService.deleteCollection(id),
    onSuccess: () => queryClient.invalidateQueries(["collections"]),
    onError: (err) => alert(err.message),
  });

  const handleEdit = (col) => {
    setEditCollection(col);
    setName(col.name);
    setCategoryName(col.category.name);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name) return;

    if (editCollection) {
      updateCol({ id: editCollection.id, name, categoryName });
    } else {
      createCol({ name, categoryName });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteCol(id);
    }
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
                    {col.category.name}
                  </TableCell>
                  <TableCell className="px-4 py-2">{col.card_count}</TableCell>
                  <TableCell className="px-4 py-2">
                    {col.register_count}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {formatDate(col.updated_at)}
                  </TableCell>
                  <TableCell className="px-4 py-2 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(col)}
                    >
                      <PenLineIcon />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(col.id)}
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
                property={"name"}
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
