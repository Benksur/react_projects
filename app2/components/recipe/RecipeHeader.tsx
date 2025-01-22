import React from "react";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

/**
 * Component for rendering the recipe header with edit or save functionality.
 * @component
 */
interface RecipeHeaderProps {
  /** Unique identifier for the recipe */
  id: string | number | string[];
  /** Flag indicating if the recipe is saved */
  isSaved?: boolean;
  /** Flag indicating if edit mode is active */
  isEditMode?: boolean;
  /** Callback function for save action */
  onSave?: () => void;
  /** Color for the icon */
  color: string;
}

/**
 * Renders a header component with either an edit button or save button.
 * @param props - Component properties
 * @returns A header component with appropriate icon and functionality
 */
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
