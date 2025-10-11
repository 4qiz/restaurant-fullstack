import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const items = await Api.ingredients.getAll();
        setIngredients(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
