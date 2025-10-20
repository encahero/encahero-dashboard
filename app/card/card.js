"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardCreation from "@/components/card-creation";
import { cardsService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      if (editCard) {
        return cardsService.updateCard(editCard.id, data);
      } else {
        return cardsService.createCard(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
      setModalOpen(false);
      setEditCard(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => cardsService.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  const handleSave = (data) => {
    const newCard = {
      id: editCard ? editCard.id : cards.length + 1,
      en_word: data.en_word,
      vn_word: data.vn_word,
      vn_choice: data.vn_choice || [data.vn_word],
      en_choice: data.en_choice || [data.en_word],
      meaning: data.meaning,
      ex: data.ex || [], // ex là array từ form
      image_url: data.image_url,
      type: data.type,
      created_at: editCard ? editCard.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      collectionName: data.collectionName,
    };

    if (editCard) {
      setCards((prev) => prev.map((c) => (c.id === editCard.id ? newCard : c)));
    } else {
      setCards((prev) => [...prev, newCard]);
    }

    setModalOpen(false);
    setEditCard(null);
  };

  const handleEdit = (card) => {
    setEditCard(card);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-8">
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
          close={() => setModalOpen(false)}
          isEdit={!!editCard}
          defaultValues={editCard}
          onSubmit={handleSave}
        />
      </div>
    </ScrollArea>
  );
}
