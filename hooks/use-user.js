import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import getErrorMessage from "@/utils/get-error-message";

export function useUsers({ searchValue, page, rowQuantity }) {
  const { showErrorToast } = useToast();

  return useQuery({
    queryKey: ["users", searchValue, page, rowQuantity],
    queryFn: async () => {
      try {
        const res = await userService.getAllUsers({
          searchValue,
          page,
          limit: rowQuantity,
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
