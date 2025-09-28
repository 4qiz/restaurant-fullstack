"use client";

import { ResponsiveModal } from "../responsive-modal";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { useState } from "react";
import { X } from "lucide-react";
import { ResponsiveButton } from "@/shared/ui/responsive-button";

export const DeleteConfirmationButton = ({
  onDelete,
  disabled,
  btnText,
  modalText,
  modalTitle,
}: {
  onDelete: () => void;
  disabled: boolean;
  btnText?: string;
  modalTitle?: string;
  modalText?: string;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <ResponsiveButton
        variant="destructive"
        disabled={disabled}
        onClick={() => setModalOpen(true)}
        icon={<X size={16} />}
        text={btnText ? btnText : "Удалить"}
      ></ResponsiveButton>

      <ResponsiveModal
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle ? modalTitle : "Подтверждение удаления"}
      >
        <DeleteConfirmationDialog
          onDelete={onDelete}
          onCancel={() => setModalOpen(false)}
          btnText={btnText}
          dialogText={modalText}
        />
      </ResponsiveModal>
    </>
  );
};
