"use client";

import { useEffect, useState } from "react";

const ToastProvider = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, ...event.detail }]);
      window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3500);
    };
    window.addEventListener("app:toast", handleToast);
    const pendingToast = window.sessionStorage.getItem("app:pending-toast");
    if (pendingToast) {
      window.sessionStorage.removeItem("app:pending-toast");
      try {
        window.dispatchEvent(new CustomEvent("app:toast", { detail: JSON.parse(pendingToast) }));
      } catch {
        // Ignore malformed queued toast data.
      }
    }
    return () => window.removeEventListener("app:toast", handleToast);
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
      {toasts.map(({ id, message, type }) => (
        <div key={id} role={type === "error" ? "alert" : "status"} className={`rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${type === "error" ? "bg-red-600" : "bg-green-700"}`}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastProvider;
