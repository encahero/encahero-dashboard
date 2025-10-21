"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { collectionService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CollectionTable from "@/components/colelction-table";
import CollectionCreation from "@/components/collection-creation";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function Collection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCollection, setEditCollection] = useState(null);
  const { showErrorToast, showSuccessToast } = useToast();
  const queryClient = useQueryClient();

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionService.getAllCollections(),
  });

  const { mutateAsync: createCol } = useMutation({
    mutationFn: ({ name, categoryName }) =>
      collectionService.createCollection(name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
      showSuccessToast("Success", "Create collection successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const { mutateAsync: updateCol } = useMutation({
    mutationFn: ({ id, name, categoryName }) =>
      collectionService.updateCollection(id, name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
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

  const handleEdit = (col) => {
    setEditCollection(col);
    setModalOpen(true);
  };

  const handleSave = async ({ name, categoryName }) => {
    if (!name) return;
    try {
      if (editCollection) {
        await updateCol({ id: editCollection.id, name, categoryName });
      } else {
        await createCol({ name, categoryName });
      }
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteCol(id);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditCollection(null);
  };

  return (
    <div className="h-full flex-1">
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Collections</h1>
          <Button onClick={() => setModalOpen(true)}>New Collection</Button>
        </div>

        <CollectionTable
          data={collections}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Modal */}
        <CollectionCreation
          isOpen={modalOpen}
          onClose={handleClose}
          editData={editCollection}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
