import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRecipes } from "@/app/context/RecipeContext";
import { useRouter } from "expo-router";

/**
 * Screen component for creating new recipes.
 * Provides form for entering recipe details and image selection.
 * @module NewRecipe
 */
export default function ModalScreen() {
  /** Router hook for navigation */
  const router = useRouter();
  /** State for selected image URI */
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  /** State for ingredients list */
  const [ingredients, setIngredients] = useState<string>("");
  /** State for cooking instructions */
  const [instructions, setInstructions] = useState<string>("");
  /** State for recipe name */
  const [recipeName, setRecipeName] = useState<string>("");
  /** Recipe context hook for adding new recipes */
  const { addRecipe } = useRecipes();

  /**
   * Handles image selection from device gallery.
   * Requests permissions and opens image picker.
   * Updates selectedImage state with chosen image URI.
   */
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  /**
   * Formats ingredients input with bullet points.
   * Adds bullet points to new lines automatically.
   * @param text - Raw ingredients input
   */
  const handleIngredientsChange = (text: string) => {
    // check if the input text contains newline characters
    const updatedText = text
      .split("\n")
      .map((line, index) => {
        // Only add bullet point if the line is not empty
        if (line.length === 1) {
          return "• " + line;
        }
        if (!line.trim()) {
          return "• " + line.trim();
        }
        return line;
      })
      .join("\n");

    setIngredients(updatedText);
  };

  /**
   * Formats instructions input with numbering.
   * Adds sequential numbers to new lines automatically.
   * @param text - Raw instructions input
   */
  const handleInstructionsChange = (text: string) => {
    const updatedText = text
      .split("\n")
      .map((line, index) => {
        // Add number to each line
        if (line.length === 1) {
          return `${index + 1}. ${line.trim()}`;
        }
        if (!line.trim()) {
          return `${index + 1}. ${line.trim()}`;
        }
        return line;
      })
      .join("\n");

    setInstructions(updatedText);
  };

  /**
   * Saves the new recipe and navigates back.
   * Combines all input states into a recipe object.
   */
  const handleSaveRecipe = () => {
    addRecipe({
      ingredients: ingredients,
      instructions: instructions,
      selectedImage: selectedImage,
      name: recipeName,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Recipe Name"}
          value={recipeName}
          onChangeText={setRecipeName}
        />

        <TouchableOpacity
          style={styles.imageUploadArea}
          onPress={handleImagePick}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
            />
          ) : (
            <Text style={styles.placeholderText}>Tap to upload image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.bulletInput}
          placeholder={"List Ingredients..."}
          multiline
          numberOfLines={5}
          value={ingredients}
          onChangeText={handleIngredientsChange}
        />

        <TextInput
          style={styles.bulletInput}
          placeholder={"List Instructions..."}
          multiline
          numberOfLines={5}
          value={instructions}
          onChangeText={handleInstructionsChange}
        />

        <TouchableOpacity onPress={() => handleSaveRecipe()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Save</Text>
          </View>
        </TouchableOpacity>

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * Styles for the new recipe form screen.
 * @constant styles
 */
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    width: "90%",
  },
  imageUploadArea: {
    width: "90%",
    height: 300,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  bulletInput: {
    fontSize: 18,
    paddingHorizontal: 15,
    width: "90%",
    height: 150,
    marginTop: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  addWrapper: {
    marginTop: 20,
    marginBottom: 40,
    width: 90,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "#aaa",
  },
});
