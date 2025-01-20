import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

interface Recipe {
  text: string;
}

export default function RecipeCard(props: Recipe) {
  const colorScheme = useColorScheme();
  const styles = colorScheme === "dark" ? darkStyles : lightStyles;

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  item: {
    borderColor: "#C0C0C0",
    borderWidth: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 40,
    height: 40,
    borderColor: "#55BCF6",
    borderWidth: 2,
    opacity: 0.4,
    borderRadius: 15,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
});

const darkStyles = StyleSheet.create({
  item: {

    borderWidth: 1,
    backgroundColor: "#282828",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,

  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 40,
    height: 40,
    borderColor: "#55BCF6",
    borderWidth: 2,
    opacity: 0.4,
    borderRadius: 15,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    color: "#FFF",
  },
});
