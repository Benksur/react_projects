import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Recipe } from "@/types/Recipe";

interface RecipeContentProps {
  recipe: Recipe;
  styles: any; // You can define a proper type for styles
}

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
