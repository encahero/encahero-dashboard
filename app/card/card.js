"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardCreation from "@/components/card-creation";
import { cardsService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convertCardFormData } from "@/helpers";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export default function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const {
    data: cards = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      try {
        const res = await cardsService.getAllCards();
        return res;
      } catch (error) {
        showErrorToast("Ops", getErrorMessage(err));
        return [];
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data) => {
      const formData = convertCardFormData(data);
      if (editCard) {
        return cardsService.updateCard(editCard.id, formData);
      } else {
        return cardsService.createCard(formData);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
      setModalOpen(false);
      setEditCard(null);
      showSuccessToast(
        "Success",
        editCard ? "Update card successfully" : "Create card successfully"
      );
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const handleSave = async (data) => {
    // Gọi mutation
    try {
      await saveMutation.mutateAsync(data);
    } catch (error) {
      throw error;
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => cardsService.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
      showSuccessToast("Success", "Delete card successfully");
    },
    onError: (err) => showErrorToast("Ops!", getErrorMessage(err)),
  });

  const handleEdit = (card) => {
    setEditCard(card);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure ?")) deleteMutation.mutate(id);
  };

  const handleClose = () => {
    setEditCard(null);
    setModalOpen(false);
  };

  return (
    <div className="h-full flex-1">
      <div className="p-8 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Cards</h1>
          <Button onClick={() => setModalOpen(true)}>New Card</Button>
        </div>

        <div className="overflow-x-auto flex-1">
          <CardTable
            data={cards}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSubmit={handleSave}
          />
        </div>

        <CardCreation
          isOpen={modalOpen}
          onClose={handleClose}
          isEdit={!!editCard}
          editValues={editCard}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
