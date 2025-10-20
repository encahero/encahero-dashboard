"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardCreation from "@/components/card-creation";
import { cardsService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convertCardFormData } from "@/helpers";

export default function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: cards = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: () => cardsService.getAllCards(),
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
    },
  });

  const handleSave = (data) => {
    // Gọi mutation
    saveMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => cardsService.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
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

        <div className="overflow-x-auto">
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
          defaultValues={editCard}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
