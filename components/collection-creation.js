import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Selector from "@/components/selector";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services";

import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import useEnter from "@/hooks/user-enter";

function CollectionCreation({ isOpen, onClose, editData, onSubmit }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");
  const { showErrorToast } = useToast();

  // Hook enter

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setCategoryName(editData.category.name);
      setIcon(editData.icon || "");
    }
  }, [editData]);

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const res = await categoryService.getAllCategories();
        return res;
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
  });

  const handleClose = () => {
    setName("");
    setCategoryName("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !categoryName.trim()) return;
    await onSubmit({ name, categoryName, icon });
    setName("");
    setCategoryName("");
    setIcon("");
  };

  useEnter(handleSubmit, [name, categoryName, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Collection" : "New Collection"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Update your collection information."
              : "Create a new collection."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col">
            <label
              htmlFor="collection-name"
              className="mb-1 text-sm font-medium"
            >
              Collection Name
            </label>
            <Input
              id="collection-name"
              placeholder="Nhập tên bộ sưu tập"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="collection-icon"
              className="mb-1 text-sm font-medium"
            >
              Icon for Collection
            </label>
            <Input
              id="collection-icon"
              placeholder="Nhập icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="collection-category"
              className="mb-1 text-sm font-medium"
            >
              Danh mục
            </label>
            <Selector
              id="collection-category"
              value={categoryName}
              onValueChange={setCategoryName}
              list={categories}
              placeholder="Chọn danh mục"
              property="name"
              displayProperty="name"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !categoryName.trim()}
          >
            {editData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CollectionCreation;
