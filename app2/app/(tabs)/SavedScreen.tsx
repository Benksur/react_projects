import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import RecipeCard from "@/components/RecipeCard";
import { Link } from "expo-router";
import { useRecipes } from "@/app/context/RecipeContext";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;
  const { recipes } = useRecipes();

  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.recipesWrapper}>
          <Text style={styles.sectionTitle}>Your Recipes</Text>

          <View style={styles.items}>
            {recipes.map((recipe, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/RecipeDetails",
                  params: { id: index },
                }}
                asChild
              >
                <TouchableOpacity style={styles.touchableWrapper}>
                  <RecipeCard recipe={recipe} />
                </TouchableOpacity>
              </Link>
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
          value={task}
          onChangeText={(text) => setTask(text)}
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
});
