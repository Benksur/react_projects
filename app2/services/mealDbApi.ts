import { Recipe } from "../types/Recipe";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

interface MealDBResponse {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | null;
}

interface MealDBRecipe extends Recipe {
  id: string;
}

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