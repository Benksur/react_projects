import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";

export default function Insights() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.whiteContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
        <Text style={styles.text}>hello</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1, // Ensures this container takes up all remaining space
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing between children
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollContent: {
    paddingVertical: 20, // Adds padding inside the scroll view
    paddingHorizontal: 20,
    alignItems: "center", // Centers content horizontally
  },
  text: {
    fontSize: 16,
    color: "#000", // Ensures the text is visible against the white background
    fontFamily: "Rubik-Regular",
  },
});
