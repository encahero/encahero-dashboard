// hooks/use-card-mutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardsService } from "@/services";
import { convertCardFormData } from "@/helpers";

export function useCardMutations({
  editCard,
  setEditCard,
  setModalOpen,
  showErrorToast,
  showSuccessToast,
}) {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: (data) => {
      const formData = convertCardFormData(data);
      return editCard
        ? cardsService.updateCard(editCard.id, formData)
        : cardsService.createCard(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
      setModalOpen(false);
      setEditCard(null);
      showSuccessToast(
        "Success",
        editCard ? "Updated successfully" : "Created successfully"
      );
    },
    onError: (err) =>
      showErrorToast("Ops!", err.message || "Something went wrong"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => cardsService.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
      showSuccessToast("Success", "Deleted successfully");
    },
    onError: (err) =>
      showErrorToast("Ops!", err.message || "Something went wrong"),
  });

  return {
    handleSaveCard: async (data) => {
      try {
        await saveMutation.mutateAsync(data);
      } catch (error) {
        throw error;
      }
    },
    handleDeleteCard: (id) => {
      if (confirm("Are you sure?")) deleteMutation.mutate(id);
    },
  };
}
