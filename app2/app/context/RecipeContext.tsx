import React, { createContext, useContext, useState } from "react";
import { Recipe } from "../../types/Recipe";

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (index: number) => void;
  updateRecipe: (index: number, recipe: Partial<Recipe>) => void;
  deleteMultipleRecipes: (indices: number[]) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const updateRecipe = (index: number, recipe: Partial<Recipe>) => {
    setRecipes((prev) => {
      const newRecipes = [...prev];
      newRecipes[index] = { ...newRecipes[index], ...recipe };
      return newRecipes;
    });
  };

  const deleteRecipe = (index: number) => {
    setRecipes((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteMultipleRecipes = (indices: number[]) => {
    setRecipes((prev) => prev.filter((_, index) => !indices.includes(index)));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        deleteMultipleRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
}
