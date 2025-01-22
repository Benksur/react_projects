import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Recipe } from "@/types/Recipe";

/**
 * Props for the RecipeContent component.
 */
interface RecipeContentProps {
  /** Recipe object containing all recipe details */
  recipe: Recipe;
  /** Styles object for component styling */
  styles: {
    container: object;
    image: object;
    content: object;
    title: object;
    sectionTitle: object;
    text: object;
  };
}

/**
 * Renders the content of a recipe including image, ingredients, and instructions.
 * @param props - Component properties
 * @returns A scrollable view containing recipe details
 */
export function RecipeContent({ recipe, styles }: RecipeContentProps) {
  return (
    <ScrollView style={styles.container}>
      {recipe.selectedImage && (
        <Image source={{ uri: recipe.selectedImage }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.text}>{recipe.ingredients}</Text>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </View>
    </ScrollView>
  );
}
