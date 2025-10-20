import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function CategoryCreation({ isOpen, onClose, editData, onSubmit }) {
  const [name, setName] = useState(editData?.name || "");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
    }
  }, [editData]);
  const handleSubmit = () => {
    setName("");
    onSubmit(name);
  };

  const handleClose = () => {
    setName("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!!editData ? "Edit Category" : "New Category"}
          </DialogTitle>
          <DialogDescription>
            {!!editData
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
          <Button onClick={handleSubmit}>
            {!!editData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryCreation;
