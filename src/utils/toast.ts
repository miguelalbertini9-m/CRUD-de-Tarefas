import { toast as sonnerToast } from "sonner";

export const toast = sonnerToast;

export const showSuccess = (message: string) => {
  sonnerToast.success(message);
};

export const showError = (message: string) => {
  sonnerToast.error(message);
};

export const showLoading = (message: string) => {
  return sonnerToast.loading(message);
};

export const dismissToast = (toastId: string) => {
  sonnerToast.dismiss(toastId);
};