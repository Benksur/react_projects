import React, { createContext, useContext, useState } from "react";
import { Recipe } from "../../types/Recipe";

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (index: number) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (index: number) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
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
