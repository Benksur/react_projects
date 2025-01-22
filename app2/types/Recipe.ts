export interface Recipe {
  id?: string;
  name: string;
  ingredients: string;
  instructions: string;
  selectedImage: string | null;
} 