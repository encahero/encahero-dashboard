"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function useCollectionMutation() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutateAsync: createCol } = useMutation({
    mutationFn: ({ name, categoryName, icon }) =>
      collectionService.createCollection(name, categoryName, icon),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      showSuccessToast("Success", "Create collection successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutateAsync: updateCol } = useMutation({
    mutationFn: ({ id, name, categoryName, icon }) =>
      collectionService.updateCollection(id, name, categoryName, icon),
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
