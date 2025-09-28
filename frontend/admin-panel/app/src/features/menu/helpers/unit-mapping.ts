import { MeasureUnit } from "@prisma/client";

export const unitTranslations: Record<MeasureUnit, string> = {
  [MeasureUnit.GRAM]: "гр",
  [MeasureUnit.MILLILITERS]: "мл",
  [MeasureUnit.PIECES]: "шт",
};
