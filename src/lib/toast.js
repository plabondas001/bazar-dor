export const toast = {
  success(message) {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, type: "success" } }));
  },
  error(message) {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, type: "error" } }));
  },
};

export const queueToast = (message, type = "success") => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("app:pending-toast", JSON.stringify({ message, type }));
  }
};

export const clearQueuedToast = () => {
  if (typeof window !== "undefined") window.sessionStorage.removeItem("app:pending-toast");
};
