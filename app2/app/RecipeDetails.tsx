import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipes } from "@/app/context/RecipeContext";
import { useTheme } from "@react-navigation/native";
import { Recipe } from "@/types/Recipe";
import { useNavigation } from "@react-navigation/native";
import { RecipeHeader } from "@/components/recipe/RecipeHeader";
import { RecipeContent } from "@/components/recipe/RecipeContent";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const { recipes } = useRecipes();
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const savedRecipe =
      recipes.find((r) => String(r.id) === String(id)) || recipes[Number(id)];
    if (savedRecipe) {
      setRecipe(savedRecipe);
    } else {
      setError("Recipe not found");
    }
    setIsLoading(false);
  }, [id, recipes]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RecipeHeader id={String(id)} isEditMode={true} color={colors.text} />
      ),
    });
  }, [recipe, colors, id]);

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
