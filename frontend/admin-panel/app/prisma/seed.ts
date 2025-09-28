import { PrismaClient } from "@prisma/client";
import { usersSeed } from "./seed-data/users";
import { employeeUsersSeed } from "./seed-data/employees";
import { storiesSeed, storyItemsSeed } from "./seed-data/stories";
import { categoriesSeed } from "./seed-data/categories";
import { productsSeed } from "./seed-data/products";
import { productsItemsSeed } from "./seed-data/products-items";
import { deliveryPriceSeed } from "./seed-data/delivery-price";

const prisma = new PrismaClient();

async function up() {
  await prisma.employeeUser.createMany({ data: employeeUsersSeed });
  await prisma.user.createMany({ data: usersSeed });

  await prisma.story.createMany({ data: storiesSeed });
  await prisma.storyItem.createMany({ data: storyItemsSeed });

  await prisma.category.createMany({ data: categoriesSeed });
  await prisma.product.createMany({ data: productsSeed });
  await prisma.productItem.createMany({ data: productsItemsSeed });

  await prisma.deliveryPrice.createMany({ data: deliveryPriceSeed });
  console.log("-- Seed data created✅ --");
}

async function down() {
  // only for postgres
  await prisma.$executeRaw`DO $$ 
  DECLARE 
      rec RECORD;
  BEGIN
      -- Disable foreign key constraints
      EXECUTE 'SET session_replication_role = ''replica''';
  
      -- Truncate all tables in the 'public' schema
      FOR rec IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'TRUNCATE TABLE public."' || rec.tablename || '" RESTART IDENTITY CASCADE';
      END LOOP;
  
      -- Restore foreign key constraints
      EXECUTE 'SET session_replication_role = ''origin''';
  END $$;
  `;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
