import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function SelectLocal() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
  });

  return (
    <View style={styles.whiteContainer}>
      <Text style={styles.text}>
        Choose your local currency to explore favorable exchange rates.
      </Text>
      <View style={styles.circleContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
    width: "100%",
    height: 100,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 40,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    paddingRight: 10,
    fontFamily: "Rubik-Regular",
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#172429",
  },
});
