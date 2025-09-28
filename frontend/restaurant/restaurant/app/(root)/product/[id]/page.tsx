import { Container } from "@/shared/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductFormTemplate } from "@/shared/components/shared/product-form-template";

export const dynamic = "force-dynamic";

export default async function ProductPage({
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
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container
      className="pt-8 bg-white overflow-hidden max-w-full md:w-[90vw] md:max-w-[1060px] md:min-h-[500px] 
                md:rounded-lg "
    >
      <div>
        <ProductFormTemplate product={product} />
      </div>
    </Container>
  );
}
