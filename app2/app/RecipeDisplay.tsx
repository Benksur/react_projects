import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipes } from "@/app/context/RecipeContext";
import { useNavigation } from "@react-navigation/native";
import { Recipe } from "../types/Recipe";
import { getRecipeById } from "@/services/mealDbApi";
import { useTheme } from "@react-navigation/native";
import { RecipeHeader } from "../components/recipe/RecipeHeader";
import { RecipeContent } from "../components/recipe/RecipeContent";

/**
 * Screen component for displaying recipes from the API.
 * Allows users to view and save recipes from external sources.
 * @module RecipeDisplay
 */
export default function RecipeDisplay() {
  console.log("RecipeDisplay mounted");
  /** Recipe ID from URL parameters */
  const params = useLocalSearchParams();
  const id = params.id;
  console.log("Received ID:", id);

  /** Context hooks for recipe management */
  const { recipes, addRecipe } = useRecipes();
  /** Navigation hook for header customization */
  const navigation = useNavigation();
  /** Theme colors for styling */
  const { colors } = useTheme();
  /** Color scheme for conditional styling */
  const colorScheme = useColorScheme();
  /** State management */
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  /** Loading state indicator */
  const [isLoading, setIsLoading] = useState(true);
  /** Error message state */
  const [error, setError] = useState<string | null>(null);
  /** Flag indicating if recipe is saved */
  const [isSaved, setIsSaved] = useState(false);

  /** Styles based on color scheme */
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

  /**
   * Fetches recipe data from the API.
   * Updates recipe state and checks if it's already saved.
   */
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log("ID type:", typeof id);
        console.log("ID value:", id);
        console.log("Raw params:", params); // Use the params from above

        if (!id) {
          console.log("No ID provided");
          setError("No recipe ID provided");
          setIsLoading(false);
          return;
        }

        const data = await getRecipeById(id as string);
        console.log("API Response:", data);

        if (data) {
          setRecipe(data);
          const isAlreadySaved = recipes.some(
            (r) => String(r.id) === String(data.id)
          );
          setIsSaved(isAlreadySaved);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to load recipe details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipes]);

  /**
   * Handles saving a recipe to the user's collection.
   * Only saves if recipe exists and isn't already saved.
   */
  const handleSave = () => {
    if (recipe && !isSaved) {
      addRecipe(recipe);
      setIsSaved(true);
    }
  };

  /**
   * Sets up the header right button with save functionality.
   * Updates when save status or theme changes.
   */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
          <RecipeHeader
            id={id}
            isSaved={isSaved}
            onSave={handleSave}
            color={colors.text}
          />
        </View>
      ),
    });
  }, [isSaved, recipe, colors, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || "Recipe not found"}</Text>
      </View>
    );
  }

  return <RecipeContent recipe={recipe} styles={styles} />;
}

/**
 * Light theme styles for the recipe display.
 * @constant lightStyles
 */
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
});

/**
 * Dark theme styles for the recipe display.
 * @constant darkStyles
 */
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
});
