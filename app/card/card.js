"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import CardCreation from "@/components/card-creation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import CardFilter from "@/components/card-filter";
import CardTablePagination from "@/components/card-table-pagination";
import { useCards } from "@/hooks/use-card";
import { useCardMutations } from "@/hooks/use-card-mutation";

export default function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const [filterValues, setFilterValues] = useState({
    searchValue: "",
    collectionName: "",
    type: "all",
    rowQuantity: 20,
  });

  const [page, setPage] = useState(1);

  const { data: cardData = [], isLoading } = useCards({
    ...filterValues,
    page,
  });

  const handleChangeFilter = useMemo(
    () => (values) => {
      setFilterValues(values);
    },
    []
  );

  // Custom hook xử lý create/update/delete
  const { handleSaveCard, handleDeleteCard } = useCardMutations({
    editCard,
    setEditCard,
    setModalOpen,
    showErrorToast,
    showSuccessToast,
  });

  const handleEdit = useCallback((card) => {
    setEditCard(card);
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setEditCard(null);
    setModalOpen(false);
  }, []);

  const pageNext = useCallback(() => {
    setPage((p) => Math.min(cardData.totalPages, p + 1));
  }, [cardData?.totalPages]);

  const pagePrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  return (
    <div className="flex-1 h-full">
      <div className="p-8 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Cards</h1>
          <Button onClick={() => setModalOpen(true)}>New Card</Button>
        </div>

        <div className="overflow-x-auto flex-1 pb-20 lg:pb-8">
          <CardFilter onChange={handleChangeFilter} />
          <CardTable
            data={cardData.data}
            onDelete={handleDeleteCard}
            onEdit={handleEdit}
            isLoading={isLoading}
          />
          <CardTablePagination
            page={page}
            totalPages={cardData.totalPages}
            startIdx={(page - 1) * (filterValues.rowQuantity || 20)}
            visibleLength={cardData.data?.length || 0}
            totalCount={cardData.total || 0}
            onPrev={pagePrev}
            onNext={pageNext}
          />
        </div>

        <CardCreation
          isOpen={modalOpen}
          onClose={handleClose}
          isEdit={!!editCard}
          editValues={editCard}
          onSubmit={handleSaveCard}
        />
      </div>
    </div>
  );
}
