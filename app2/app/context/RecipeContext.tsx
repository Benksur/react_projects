import React, { createContext, useContext, useState } from "react";
import { Recipe } from "../../types/Recipe";

/**
 * Context provider for managing recipe state across the application.
 * @module RecipeContext
 */
interface RecipeContextType {
  /** Array of saved recipes */
  recipes: Recipe[];
  /** Function to add a new recipe */
  addRecipe: (recipe: Recipe) => void;
  /** Function to delete a recipe by index */
  deleteRecipe: (index: number) => void;
  /** Function to update an existing recipe */
  updateRecipe: (index: number, recipe: Partial<Recipe>) => void;
  /** Function to delete multiple recipes at once */
  deleteMultipleRecipes: (indices: number[]) => void;
}

/**
 * Context for managing recipe state globally.
 * @constant RecipeContext
 */
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

/**
 * Provider component for recipe context.
 * Manages state and provides recipe-related functions.
 * @param props - Component properties
 * @param props.children - Child components to wrap with context
 */
export function RecipeProvider({ children }: { children: React.ReactNode }) {
  /** State for storing saved recipes */
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  /**
   * Adds a new recipe to the saved collection.
   * @param recipe - Recipe to add
   */
  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  /**
   * Updates an existing recipe in the collection.
   * @param index - Index of recipe to update
   * @param recipe - Partial recipe data to update
   */
  const updateRecipe = (index: number, recipe: Partial<Recipe>) => {
    setRecipes((prev) => {
      const newRecipes = [...prev];
      newRecipes[index] = { ...newRecipes[index], ...recipe };
      return newRecipes;
    });
  };

  /**
   * Deletes a single recipe from the collection.
   * @param index - Index of recipe to delete
   */
  const deleteRecipe = (index: number) => {
    setRecipes((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Deletes multiple recipes from the collection.
   * @param indices - Array of indices to delete
   */
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

/**
 * Hook for accessing recipe context.
 * @throws {Error} If used outside of RecipeProvider
 * @returns Recipe context value
 */
export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
}
