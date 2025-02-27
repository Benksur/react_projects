import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import RecipeCard from "../../components/RecipeCard";
import { Link } from "expo-router";
import { searchRecipes } from "@/services/mealDbApi";
import { Recipe } from "../../types/Recipe";

/**
 * Interface for recipe data from MealDB API.
 * Extends base Recipe type with required ID field.
 */
interface MealDBRecipe extends Recipe {
  /** Unique identifier for the recipe */
  id: string;
}

/**
 * Screen component for browsing and searching recipes from MealDB API.
 * Features search functionality and displays recipe cards.
 * @module BrowseScreen
 */
export default function BrowseScreen() {
  /** Color scheme for theme-based styling */
  const colorScheme = useColorScheme();
  /** Styles based on current color scheme */
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;
  /** State for search query input */
  const [searchQuery, setSearchQuery] = useState("");
  /** State for storing fetched recipes */
  const [recipes, setRecipes] = useState<MealDBRecipe[]>([]);
  /** Loading state indicator */
  const [isLoading, setIsLoading] = useState(false);
  /** Error message state */
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches recipes from the API based on search query.
   * Updates recipes state and handles loading/error states.
   * @param query - Search term for recipes
   */
  const searchRecipesFromApi = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Searching for:", query); // Debug log
      const results = await searchRecipes(query || "");
      console.log("Results:", results); // Debug log
      setRecipes(results);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads initial recipes on component mount.
   * Fetches recipes with empty query to show default results.
   */
  useEffect(() => {
    searchRecipesFromApi("");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.recipesWrapper}>
          <Text style={styles.sectionTitle}>Browse Recipes</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.searchWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder={"Search recipes..."}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => searchRecipesFromApi(searchQuery)}
            />
            <TouchableOpacity
              onPress={() => searchRecipesFromApi(searchQuery)}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>

          {isLoading ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <View style={styles.items}>
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={{
                    pathname: "/RecipeDisplay",
                    params: { id: recipe.id },
                  }}
                  asChild
                >
                  <TouchableOpacity>
                    <View style={styles.recipeCardContainer}>
                      <RecipeCard recipe={recipe} />
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Light theme styles for the browse screen.
 * @constant lightStyles
 */
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipesWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  items: {
    marginTop: 30,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButton: {
    backgroundColor: "#55BCF6",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  recipeCardContainer: {
    width: "100%",
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});

/**
 * Dark theme styles for the browse screen.
 * @constant darkStyles
 */
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipesWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  items: {
    marginTop: 30,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#282828",
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: "#fff",
  },
  searchButton: {
    backgroundColor: "#55BCF6",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  recipeCardContainer: {
    width: "100%",
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 50,
  },
});
