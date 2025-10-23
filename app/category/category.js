"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services";
import CategoryTable from "@/components/category-table";
import CategoryCreation from "@/components/category-creation";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import useCategoryMutation from "@/hooks/use-category-mutation";

export default function Category() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const { createCat, updateCat, deleteCat } = useCategoryMutation();
  const { showErrorToast } = useToast();

  const { data: categories = [], isLoading } = useQuery({
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

  const handleSave = async (categoryName) => {
    if (!categoryName) return;

    try {
      if (editCategory) {
        await updateCat({ id: editCategory.id, name: categoryName });
      } else {
        await createCat(categoryName);
      }
      setModalOpen(false);
      setEditCategory(null);
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

  return (
    <div className="h-full flex-1">
      <div className="p-8 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={() => setModalOpen(true)}>New Category</Button>
        </div>
        <div className="overflow-x-auto flex-1 pb-20 lg:pb-8">
          <CategoryTable
            data={categories}
            onDelete={deleteCat}
            onEdit={handleEdit}
            isLoading={isLoading}
          />
        </div>

        {/* Modal */}
        <CategoryCreation
          isOpen={modalOpen}
          onClose={handleCloseModal}
          editData={editCategory}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
