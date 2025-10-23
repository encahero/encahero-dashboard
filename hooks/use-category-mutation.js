"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function useCategoryMutation() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  // ✅ Create category
  const createCat = useMutation({
    mutationFn: (name) => categoryService.createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      showSuccessToast("Success", "Create category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  // ✅ Update category
  const updateCat = useMutation({
    mutationFn: ({ id, name }) => categoryService.updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      showSuccessToast("Success", "Update category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  // ✅ Delete category
  const deleteCat = useMutation({
    mutationFn: (id) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      showSuccessToast("Success", "Delete category successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  return {
    createCat: (name) => createCat.mutateAsync(name),
    updateCat: ({ id, name }) => updateCat.mutateAsync({ id, name }),
    deleteCat: (id) => {
      if (confirm("Are you sure?")) {
        deleteCat.mutateAsync(id);
      }
    },
  };
}
