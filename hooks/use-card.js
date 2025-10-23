import { useQuery } from "@tanstack/react-query";
import { cardsService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export function useCards({
  searchValue,
  collectionName,
  type,
  page,
  rowQuantity,
}) {
  const { showErrorToast } = useToast();

  console.log({ collectionName });
  return useQuery({
    queryKey: ["cards", searchValue, collectionName, type, page, rowQuantity],
    queryFn: async () => {
      try {
        const res = await cardsService.getAllCards({
          searchValue,
          collectionName,
          type,
          page,
          rowQuantity,
        });
        return res;
      } catch (err) {
        showErrorToast("Ops!", getErrorMessage(err));
        return [];
      }
    },
    keepPreviousData: true,
  });
}
