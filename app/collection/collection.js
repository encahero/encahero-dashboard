"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { categoryService, collectionService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CollectionTable from "@/components/colelction-table";
import CollectionCreation from "@/components/collection-creation";

export default function Collection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCollection, setEditCollection] = useState(null);

  const queryClient = useQueryClient();

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionService.getAllCollections(),
  });

  const { mutate: createCol } = useMutation({
    mutationFn: ({ name, categoryName }) =>
      collectionService.createCollection(name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
    },
    onError: (err) => alert(err.message),
  });

  const { mutate: updateCol } = useMutation({
    mutationFn: ({ id, name, categoryName }) =>
      collectionService.updateCollection(id, name, categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
      setModalOpen(false);
    },
    onError: (err) => alert(err.message),
  });

  const { mutate: deleteCol } = useMutation({
    mutationFn: (id) => collectionService.deleteCollection(id),
    onSuccess: () => queryClient.invalidateQueries(["collections"]),
    onError: (err) => alert(err.message),
  });

  const handleEdit = (col) => {
    setEditCollection(col);
    setModalOpen(true);
  };

  const handleSave = ({ name, categoryName }) => {
    if (!name) return;

    if (editCollection) {
      updateCol({ id: editCollection.id, name, categoryName });
    } else {
      createCol({ name, categoryName });
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
