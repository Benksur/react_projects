import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import RecipeCard from "@/components/RecipeCard";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.recipesWrapper}>
        <Text style={styles.sectionTitle}>Your Recipes</Text>

        <View style={styles.items}>
          <RecipeCard text={"hello"} />
          <RecipeCard text={"hello"} />

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipesWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30
  },
});
