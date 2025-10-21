// hooks/useToast.ts
import CustomToast from "@/components/custom-toast";

import getErrorMessage from "@/utils/get-error-message";
import { toast } from "react-toastify";
import { useTheme } from "./use-theme";

const toastConfig = {
  autoClose: false,
  closeButton: true,
  autoClose: true,
  className: "hello",
  customProgressBar: true,
  className:
    "border dark:border-stone-700 rounded-md shadow-md overflow-hidden",
  style: {
    padding: 0,
  },
};

export function useToast() {
  const { resolvedTheme: theme } = useTheme();
  return {
    showSuccessToast: (title, content) => {
      return toast(CustomToast, {
        data: {
          type: "success",
          title,
          content: content,
        },

        ...toastConfig,
        theme,
      });
    },

    showErrorToast: (title, content) =>
      toast(CustomToast, {
        data: {
          type: "error",
          title,
          content,
        },

        ...toastConfig,
        theme,
      }),
    showWarningToast: (title, content) =>
      toast(CustomToast, {
        data: {
          type: "warning",
          title,
          content,
        },

        ...toastConfig,
        theme,
      }),
    showInfoToast: (title, content) =>
      toast(CustomToast, {
        data: {
          type: "info",
          title,
          content,
        },

        ...toastConfig,
        theme,
      }),
  };
}
