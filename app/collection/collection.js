"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { collectionService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CollectionTable from "@/components/collection-table";
import CollectionCreation from "@/components/collection-creation";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import useCollectionMutation from "@/hooks/use-collection-mutation";

export default function Collection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCollection, setEditCollection] = useState(null);
  const { showErrorToast } = useToast();

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        const res = await collectionService.getAllCollections();
        return res;
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
  });

  const { createCol, updateCol, deleteCol } = useCollectionMutation();

  const handleEdit = (col) => {
    setEditCollection(col);
    setModalOpen(true);
  };

  const handleSave = async ({ name, categoryName, icon }) => {
    if (!name) return;
    try {
      if (editCollection) {
        await updateCol({ id: editCollection.id, name, categoryName, icon });
      } else {
        await createCol({ name, categoryName, icon });
      }
      setModalOpen(false);
      setEditCollection(null);
    } catch (err) {
      throw err;
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
        <div className="overflow-x-auto flex-1 pb-20 lg:pb-8">
          <CollectionTable
            data={collections}
            onDelete={deleteCol}
            onEdit={handleEdit}
            isLoading={isLoading}
          />
        </div>

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
