"use client";

import { ResponsiveModal } from "@/shared/components/responsive-modal";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateProductItemForm } from "./create-product-item-form";

export const CreateProductItemModal = ({
  productId,
}: {
  productId: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant={"outline"} onClick={() => setIsOpen(true)}>
        <Plus />
        Добавить
      </Button>
      <ResponsiveModal
        className="md:min-w-[600px]"
        title="Добавить размер"
        isOpen={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <CreateProductItemForm productId={productId} />
      </ResponsiveModal>
    </>
  );
};
