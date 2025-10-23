"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import CardTable from "@/components/card-table";
import CardCreation from "@/components/card-creation";
import { cardsService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convertCardFormData } from "@/helpers";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";
import CardFilter from "@/components/card-filter";
import CardTablePagination from "@/components/card-table-pagination";
import { useCards } from "@/hooks/use-card";

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

  const handleEdit = useCallback((card) => {
    setEditCard(card);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    if (confirm("Are you sure ?")) deleteMutation.mutate(id);
  }, []);

  const handleClose = useCallback(() => {
    setEditCard(null);
    setModalOpen(false);
  }, []);

  const pageNext = useCallback(() => {
    setPage((p) => Math.min(cardData.totalPages, p + 1));
  }, [page]);

  const pagePrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, [page]);

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
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSubmit={handleSave}
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
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
