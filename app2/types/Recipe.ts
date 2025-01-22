/**
 * Interface representing a recipe in the application.
 * @interface Recipe
 */
export interface Recipe {
  /** Unique identifier for the recipe */
  id?: string;
  /** Name of the recipe */
  name: string;
  /** URL or path to recipe image */
  selectedImage: string | null;
  /** List of ingredients with measurements */
  ingredients: string;
  /** Step by step cooking instructions */
  instructions: string;
} 