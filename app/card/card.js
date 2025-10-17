"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardCreation from "@/components/card-creation";

export default function Cards() {
  const [cards, setCards] = useState([
    {
      id: 1,
      en_word: "apple",
      vn_word: "táo",
      vn_choice: ["táo", "cam", "chuối", "nho"],
      en_choice: ["apple", "orange", "banana", "grape"],
      meaning: "Quả táo, loại trái cây phổ biến",
      ex: ["I eat an apple every morning", "She bought some apples yesterday"],
      image_url: "https://example.com/images/apple.png",
      type: "noun",
      created_at: "2025-09-19T21:27:41.985Z",
      updated_at: "2025-09-19T21:27:41.985Z",
      collectionName: "Common",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);

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

        {/* Modal không nằm trong ScrollArea */}
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
