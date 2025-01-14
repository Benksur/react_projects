import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { useCurrency } from "../contexts/CurrencyContext";

type ButtonType = "From" | "To" | null;

export default function CurrencyConverter({ navigation }: { navigation: any }) {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } =
    useCurrency();
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
  });

  const [selectedButton, setSelectedButton] = useState<ButtonType>(null);
  const [text, setText] = useState("");

  const handleButtonPress = (button: ButtonType) => {
    setSelectedButton(button);
    if (button === "From") {
      navigation.navigate("Searchbar", { button: "From" });
    } else if (button === "To") {
      navigation.navigate("Searchbar", { button: "To" });
    }
  };

  const handleSwapPress = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (!fontsLoaded) {
    return null;
  }

  const conversionAmount = 126.59; 
  const [wholeNumber, cents] = conversionAmount.toFixed(2).split(".");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Currency Convert</Text>
        <Text style={styles.conversionText}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.wholeNumber}>{wholeNumber}</Text>
          <Text style={styles.cents}>
            {`.`}
            {cents}
          </Text>
        </Text>

        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          selectionColor="#a4856d"
          placeholder="Enter Amount"
          placeholderTextColor="#808080"
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonBubble]}
              onPress={() => handleButtonPress("From")}
            >
              <Text style={styles.buttonText}>
                {fromCurrency ? fromCurrency.abbreviation : "From"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Clickable icon with the same styling as the buttons */}
          <TouchableOpacity
            style={styles.buttonBubble} // Apply same styling as button
            onPress={handleSwapPress} // Trigger swap when clicked
          >
            <Image
              source={require("../../assets/icons/convert.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBubble}
              onPress={() => handleButtonPress("To")}
            >
              <Text style={styles.buttonText}>
                {toCurrency ? toCurrency.abbreviation : "To"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.placeholderText}>
          1 {`${fromCurrency?.abbreviation}`} = 20{" "}
          {`${toCurrency?.abbreviation}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#071216",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonBubble: {
    backgroundColor: "#172429",
    borderRadius: 50, // Half of width/height for circle
    width: 80, // Same width and height for a perfect circle
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Rubik-Regular",
  },
  selectedButton: {
    backgroundColor: "#172429",
  },
  icon: {
    width: 30,
    height: 30,
  },
  placeholderText: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
    fontFamily: "Rubik-Light",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    color: "#f8f8f8",
    marginBottom: 10,
    marginTop: 70,
    fontFamily: "Rubik-Bold",
  },
  conversionText: {
    fontSize: 40,
    color: "#f8f8f8",
    marginBottom: 30,
    marginLeft: 40,
    fontFamily: "Rubik-Regular",
    alignSelf: "flex-start",
  },
  dollarSign: {
    fontFamily: "Rubik-Regular",
  },
  wholeNumber: {
    fontFamily: "Rubik-Regular",
  },
  cents: {
    fontFamily: "Rubik-Light", // Light for cents
  },
  textInput: {
    width: 320,
    height: 60,
    color: "#fff",
    backgroundColor: "#172429",
    borderColor: "#f0f0f0",
    borderWidth: 0.8,
    borderRadius: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
});
