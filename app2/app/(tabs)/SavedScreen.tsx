import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  useColorScheme,
  Alert,
} from "react-native";
import React, { useState, useMemo } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import RecipeCard from "@/components/RecipeCard";
import { Link, useNavigation } from "expo-router";
import { useRecipes } from "@/app/context/RecipeContext";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;
  const { recipes, deleteMultipleRecipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      `Are you sure you want to delete ${selectedRecipes.length} recipe${
        selectedRecipes.length > 1 ? "s" : ""
      }?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMultipleRecipes(selectedRecipes);
            setSelectedRecipes([]);
            setIsDeleteMode(false);
          },
        },
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
          {isDeleteMode ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setSelectedRecipes([]);
                  setIsDeleteMode(false);
                }}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: "#999" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={{ marginRight: 15 }}
              >
                <Text
                  style={{
                    color: selectedRecipes.length > 0 ? "#ff4444" : "#999",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setIsDeleteMode(true)}
              style={{ marginRight: 15 }}
            >
              <FontAwesome
                name="trash"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [isDeleteMode, selectedRecipes]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.recipesWrapper}>
          <Text style={styles.sectionTitle}>Your Recipes</Text>

          <View style={styles.items}>
            {filteredRecipes.map((recipe, index) => (
              <View key={index}>
                {isDeleteMode ? (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedRecipes((prev) =>
                        prev.includes(index)
                          ? prev.filter((i) => i !== index)
                          : [...prev, index]
                      );
                    }}
                  >
                    <View
                      style={[
                        styles.recipeCardContainer,
                        selectedRecipes.includes(index) && { opacity: 0.5 },
                      ]}
                    >
                      <RecipeCard recipe={recipe} />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Link
                    href={{
                      pathname: "/RecipeDetails",
                      params: { id: index },
                    }}
                    asChild
                  >
                    <TouchableOpacity>
                      <View style={styles.recipeCardContainer}>
                        <RecipeCard recipe={recipe} />
                      </View>
                    </TouchableOpacity>
                  </Link>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Search a Recipe"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Link href="/NewRecipe" asChild>
          <TouchableOpacity>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipesWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  touchableWrapper: {
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
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
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addText: {},
  selectedRecipe: {
    opacity: 0.5,
  },
  recipeCardContainer: {
    width: "100%",
    marginBottom: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipesWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  touchableWrapper: {
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#282828",
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#282828",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addText: {},
  selectedRecipe: {
    opacity: 0.5,
  },
  recipeCardContainer: {
    width: "100%",
    marginBottom: 10,
  },
});
