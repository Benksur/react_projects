import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRecipes } from "@/app/context/RecipeContext";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { recipes, updateRecipe } = useRecipes();
  const recipe = recipes[Number(id)];
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

  const [selectedImage, setSelectedImage] = useState<string | null>(
    recipe.selectedImage
  );
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [recipeName, setRecipeName] = useState(recipe.name);

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const handleSaveRecipe = () => {
    updateRecipe(Number(id), {
      name: recipeName,
      ingredients,
      instructions,
      selectedImage,
    });
    router.back();
  };

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
          onChangeText={setInstructions}
        />

        <TouchableOpacity onPress={handleSaveRecipe}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Save</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const lightStyles = StyleSheet.create({
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

const darkStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#000",
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    width: "90%",
    color: "#fff",
  },
  imageUploadArea: {
    width: "90%",
    height: 300,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  placeholderText: {
    color: "#666",
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
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: "top",
    color: "#fff",
    backgroundColor: "#282828",
  },
  addWrapper: {
    marginTop: 20,
    marginBottom: 40,
    width: 90,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#666",
    borderWidth: 1,
  },
  addText: {
    color: "#fff",
  },
});
