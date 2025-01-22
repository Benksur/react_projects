import React from "react";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

interface RecipeHeaderProps {
  id: string | number | string[];
  isSaved?: boolean;
  isEditMode?: boolean;
  onSave?: () => void;
  color: string;
}

export function RecipeHeader({
  id,
  isSaved,
  isEditMode,
  onSave,
  color,
}: RecipeHeaderProps) {
  if (isEditMode) {
    return (
      <Link href={{ pathname: "/EditRecipe", params: { id } }} asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="edit"
              size={25}
              color={color}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable onPress={onSave} disabled={isSaved}>
      {({ pressed }) => (
        <FontAwesome
          name={isSaved ? "heart" : "heart-o"}
          size={25}
          color={isSaved ? "#ff0000" : color}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
}
