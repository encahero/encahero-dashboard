"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function useCollectionMutation() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutateAsync: createCol } = useMutation({
    mutationFn: ({ name, categoryName }) =>
      collectionService.createCollection(name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      showSuccessToast("Success", "Create collection successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutateAsync: updateCol } = useMutation({
    mutationFn: ({ id, name, categoryName }) =>
      collectionService.updateCollection(id, name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      showSuccessToast("Success", "Update collection successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutate: deleteCol } = useMutation({
    mutationFn: (id) => collectionService.deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      showSuccessToast("Success", "Delete collection successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  return {
    createCol,
    updateCol,
    deleteCol: (id) => {
      if (confirm("Are you sure?")) {
        deleteCol(id);
      }
    },
  };
}
