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

export default function CategoryTable() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Vocabulary", updated_at: "today", collection_count: 1 },
    { id: 2, name: "Hello", updated_at: "today", collection_count: 1 },
    { id: 3, name: "Abc", updated_at: "today", collection_count: 1 },
    { id: 4, name: "Vocabulary 1", updated_at: "today", collection_count: 1 },
    { id: 5, name: "Example", updated_at: "today", collection_count: 1 },
    // { id: 6, name: "Test", updated_at: "today", collection_count: 1 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name) return;

    if (editCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editCategory.id
            ? { ...c, name, updated_at: new Date().toISOString() }
            : c
        )
      );
    } else {
      const newCat = {
        id: categories.length + 1,
        name,
        updated_at: new Date().toISOString(),
        collection_count: 0,
      };
      setCategories([...categories, newCat]);
    }

    setModalOpen(false);
    setName("");
    setEditCategory(null);
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setName(cat.name);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={() => setModalOpen(true)}>New Category</Button>
        </div>
        <ScrollArea className="h-[80vh] border rounded bg-[var(--sidebar)]">
          <Table noWrapper className="w-full">
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
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="px-4 py-2">{cat.id}</TableCell>
                  <TableCell className="px-4 py-2">{cat.name}</TableCell>
                  <TableCell className="px-4 py-2">
                    {cat.collection_count}
                  </TableCell>
                  <TableCell className="px-4 py-2">{cat.updated_at}</TableCell>
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
            setEditCategory(null);
            setName("");
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editCategory ? "Edit Category" : "New Category"}
              </DialogTitle>
              <DialogDescription>
                {editCategory
                  ? "Update your category information."
                  : "Create a new category."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button onClick={handleSave}>
                {editCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  );
}
