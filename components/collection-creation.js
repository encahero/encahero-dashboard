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
import getErrorMessage from "@/utils/get-error-message";
import { useToast } from "@/hooks/use-toast";

function CollectionCreation({ isOpen, onClose, editData, onSubmit }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const { showErrorToast } = useToast();
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setCategoryName(editData.category.name);
    }
  }, [editData]);

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAllCategories(),
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const handleClose = () => {
    setName("");
    setCategoryName("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !categoryName.trim()) return;
    await onSubmit({ name, categoryName });
    setName("");
    setCategoryName("");
  };

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
          <Input
            placeholder="Collection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Selector
            value={categoryName}
            onValueChange={setCategoryName}
            list={categories}
            placeholder="Select Category"
            property="name"
            displayProperty={"name"}
          />
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
