import { Recipe } from "../types/Recipe";

/**
 * Service for interacting with TheMealDB API.
 * Provides functions for fetching and searching recipes.
 * @module mealDbApi
 */

/** Base URL for TheMealDB API */
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/** 
 * Interface for raw recipe data from MealDB API.
 * @interface MealDBResponse
 */
interface MealDBResponse {
  /** Unique identifier for the meal */
  idMeal: string;
  /** Name of the meal */
  strMeal: string;
  /** URL to meal's thumbnail image */
  strMealThumb: string;
  /** Cooking instructions */
  strInstructions: string;
  /** Dynamic properties for ingredients and measures */
  [key: string]: string | null;
}

/** 
 * Extended Recipe interface with required ID field.
 * @interface MealDBRecipe
 * @extends Recipe
 */
interface MealDBRecipe extends Recipe {
  /** Unique identifier for the recipe (required) */
  id: string;
}

/**
 * Fetches recipes based on search query.
 * @param query - Search term for recipes
 * @returns Promise containing array of recipes
 */
export const searchRecipes = async (query: string): Promise<MealDBRecipe[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.php?s=${query}`
    );
    const data = await response.json();
    
    if (!data.meals) {
      return [];
    }

    return data.meals.map((meal: MealDBResponse) => {
      const ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`• ${measure?.trim() || ''} ${ingredient.trim()}`);
        }
      }

      return {
        id: meal.idMeal,
        name: meal.strMeal,
        selectedImage: meal.strMealThumb,
        instructions: meal.strInstructions,
        ingredients: ingredients.join('\n')
      };
    });
  } catch (error) {
    console.error('Search Recipes Error:', error);
    return [];
  }
};

/**
 * Fetches a specific recipe by ID.
 * @param id - Recipe identifier
 * @returns Promise containing recipe details
 */
export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await fetch(
      `${BASE_URL}/lookup.php?i=${id}`
    );
    const data = await response.json();
    
    if (!data.meals || !data.meals[0]) {
      throw new Error('Recipe not found');
    }

    const meal = data.meals[0];
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`• ${measure?.trim() || ''} ${ingredient.trim()}`);
      }
    }
    
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      selectedImage: meal.strMealThumb,
      instructions: meal.strInstructions,
      ingredients: ingredients.join('\n')
    };
  } catch (error) {
    console.error('Get Recipe Error:', error);
    throw error;
  }
}; 