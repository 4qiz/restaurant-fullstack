import { ChooseProductModal } from "@/shared/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  if (!params || !params.id) {
    return notFound();
  }

  const productId = Number(params.id);
  if (isNaN(productId)) {
    return notFound();
  }
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
