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
import { Recipe } from "@/types/Recipe";
import { getRecipeById } from "@/services/mealDbApi";
import { useTheme } from "@react-navigation/native";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeContent } from "@/components/recipe/RecipeContent";

export default function RecipeDisplay() {
  console.log("RecipeDisplay mounted");
  const params = useLocalSearchParams();
  const id = params.id;
  console.log("Received ID:", id);

  const { recipes, addRecipe } = useRecipes();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const { colors } = useTheme();

  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

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

  const handleSave = () => {
    if (recipe && !isSaved) {
      addRecipe(recipe);
      setIsSaved(true);
    }
  };

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
