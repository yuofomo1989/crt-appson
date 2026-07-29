"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ConsultationModal from "@/components/ConsultationModal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book a Free Consultation");

  const openConsultationModal = (title = "Book a Free Consultation") => {
    setModalTitle(title);
    setIsConsultationOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationOpen(false);
  };

  // Also listen for global CustomEvents so any component can trigger the modal
  // even if React context hydration is delayed on static exports
  useEffect(() => {
    const handler = (e) => {
      const title = e.detail?.title || "Book a Free Consultation";
      openConsultationModal(title);
    };
    window.addEventListener("openConsultationModal", handler);
    return () => window.removeEventListener("openConsultationModal", handler);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isConsultationOpen,
        openConsultationModal,
        closeConsultationModal,
        modalTitle,
      }}
    >
      {children}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultationModal}
        title={modalTitle}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    // Fallback: fire a global event instead of throwing
    return {
      openConsultationModal: (title = "Book a Free Consultation") => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("openConsultationModal", { detail: { title } })
          );
        }
      },
      closeConsultationModal: () => {},
      isConsultationOpen: false,
      modalTitle: "Book a Free Consultation",
    };
  }
  return context;
}
