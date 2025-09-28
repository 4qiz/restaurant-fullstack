"use client";

import { useRouter } from "next/navigation";
import { ProductRelations } from "@/@types/prisma";
import { ProductFormTemplate } from "../product-form-template";
import { ResponsiveModal } from "./responsive-modal";

interface Props {
  product: ProductRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };

  return (
    <ResponsiveModal
      isOpen={Boolean(product)}
      title=""
      onOpenChange={onCloseModal}
      className=" max-w-screen-lg overflow-auto "
    >
      <div className="">
        <ProductFormTemplate product={product} onSubmit={onCloseModal} />
      </div>
    </ResponsiveModal>
  );
};

// <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
//   <DialogContent
//     className="p-0 bg-white overflow-hidden max-w-full w-[90vw] sm:w-[1060px] sm:max-w-[1060px] sm:min-h-[500px]
//             rounded-lg sm:p-8"
//   >
//     <ProductFormTemplate product={product} onSubmit={onCloseModal} />
//   </DialogContent>
// </Dialog>
