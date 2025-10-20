// hooks/useToast.ts
import CustomToast from "@/components/custom-toast";
import { useTheme } from "@/context/theme";
import { toast } from "react-toastify";

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
  const { theme } = useTheme();
  return {
    showSuccessToast: (title, content) =>
      toast(CustomToast, {
        data: {
          type: "success",
          title,
          content,
        },

        ...toastConfig,
        theme,
      }),

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
