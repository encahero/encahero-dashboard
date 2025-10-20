"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services";
import CategoryTable from "@/components/category-table";
import CategoryCreation from "@/components/category-creation";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function Category() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();
  const { mutate: createCat } = useMutation({
    mutationFn: (name) => categoryService.createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]); // reload list
      setModalOpen(false);
      showSuccessToast("Success", "Create category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutate: deleteCat } = useMutation({
    mutationFn: (id) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]); // reload list
      showSuccessToast("Success", "Delete category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutate: updateCat } = useMutation({
    mutationFn: ({ id, name }) => categoryService.updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      setModalOpen(false);
      setEditCategory(null);
      showSuccessToast("Success", "Update category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAllCategories(),
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const handleSave = (categoryName) => {
    if (!categoryName) return;
    if (editCategory) {
      updateCat({ id: editCategory.id, name: categoryName });
    } else {
      createCat(categoryName);
    }
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteCat(id);
    }
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
        <CategoryTable
          data={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

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
