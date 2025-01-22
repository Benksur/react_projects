import { Recipe } from "../types/Recipe";

const mockRecipes: Recipe[] = [
  {
    name: "Classic Spaghetti Carbonara",
    selectedImage: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
    instructions: "1. Cook spaghetti according to package instructions\n2. In a pan, cook diced pancetta until crispy\n3. Mix eggs, pecorino, and black pepper in a bowl\n4. Combine hot pasta with egg mixture and pancetta\n5. Serve immediately with extra cheese",
    ingredients: "• 1 pound spaghetti\n• 4 oz pancetta, diced\n• 4 large eggs\n• 1 cup freshly grated Pecorino Romano\n• 1 teaspoon black pepper\n• Salt to taste"
  },
  {
    name: "Homemade Margherita Pizza",
    selectedImage: "https://www.allrecipes.com/thmb/UnhE0kE-WKrNJT2NvKr9v3_BRq0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_4x3_1724-fd91f26e0bd6400a9e89c6866336532b.jpg",
    instructions: "1. Prepare pizza dough and let rise\n2. Preheat oven to 500°F\n3. Roll out dough and add tomato sauce\n4. Top with fresh mozzarella and basil\n5. Bake until crust is golden",
    ingredients: "• Pizza dough\n• San Marzano tomatoes\n• Fresh mozzarella\n• Fresh basil\n• Olive oil\n• Salt"
  },
  {
    name: "Chicken Tikka Masala",
    selectedImage: "https://www.allrecipes.com/thmb/1ul-jdOz8H4b6BDrwHca0NMzJf0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/239867chef-johns-chicken-tikka-masala-ddmfs-3X4-0572-e02a25f8c7b745459a9106e9eb13de10.jpg",
    instructions: "1. Marinate chicken in yogurt and spices\n2. Grill chicken until charred\n3. Prepare masala sauce\n4. Combine chicken with sauce\n5. Simmer until thick",
    ingredients: "• Chicken thighs\n• Yogurt\n• Garam masala\n• Tomato sauce\n• Heavy cream\n• Spices"
  },
  {
    name: "Fresh Garden Salad",
    selectedImage: "https://www.allrecipes.com/thmb/1VXlYN4qnxMDIQyLWyDGDZ3Yw-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14469-mediterranean-greek-salad-DDMFS-4x3-08871ee885714caa837b6ad9d7c52426.jpg",
    instructions: "1. Wash and chop all vegetables\n2. Make vinaigrette\n3. Combine ingredients\n4. Toss with dressing\n5. Serve immediately",
    ingredients: "• Mixed greens\n• Cherry tomatoes\n• Cucumber\n• Red onion\n• Olive oil\n• Balsamic vinegar"
  },
  {
    name: "Chocolate Chip Cookies",
    selectedImage: "https://www.allrecipes.com/thmb/mJtP4Wn-_-UmJGZMXYCRCzGh9KY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-chocolate-chip-cookies-4f4502e2f19d414aae88a8d0d18d7835.jpg",
    instructions: "1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Fold in chocolate chips\n5. Bake at 375°F",
    ingredients: "• Butter\n• Brown sugar\n• White sugar\n• Eggs\n• Flour\n• Chocolate chips"
  }
  
];

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!query) return mockRecipes;
  
  return mockRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(query.toLowerCase())
  );
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes[id] || mockRecipes[0];
}; 