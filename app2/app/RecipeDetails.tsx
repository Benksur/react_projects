import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipes } from "@/app/context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const { recipes } = useRecipes();
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

  const recipe = recipes[Number(id)];

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

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
});
