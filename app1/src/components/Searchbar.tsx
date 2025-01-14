import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import currencyData from "../../assets/text/currencies.json";
import flagMapping from "../../assets/text/flags.json";
import { useNavigation } from "@react-navigation/native";
import { useCurrency } from "../contexts/CurrencyContext";

type Currency = {
  abbreviation: string;
  name: string;
};

type CurrencyData = { [key: string]: string };
type FlagMapping = { [key: string]: string };

export default function Searchbar({ route }: { route: any }) {
    const { setFromCurrency, setToCurrency } = useCurrency();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
  });

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        const currencyList: Currency[] = Object.entries(data.rates).map(
          ([abbreviation]) => ({
            abbreviation,
            name:
              (currencyData as CurrencyData)[abbreviation] ||
              "Unknown Currency",
          })
        );

        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.abbreviation.toLowerCase().includes(searchText.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectCurrency = (currency: Currency) => {
    if (route.params.button === "From") {
        setFromCurrency(currency);
      } else if (route.params.button === "To") {
        setToCurrency(currency);
      }
      console.log("Selected Currency:", currency); // For testing
      navigation.goBack(); // Go back after selecting
  };

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.titleText}>Select Currency</Text>
      <TextInput
        style={styles.searchBar}
        selectionColor="#a4856d"
        placeholder="Search for currency/coun.."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.abbreviation}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectCurrency(item)}>
            <View style={styles.currencyItem}>
              <Text style={styles.flag}>
                {(flagMapping as FlagMapping)[item.abbreviation] || "🌍"}
              </Text>
              <View style={styles.currencyTextContainer}>
                <Text style={styles.currencyAbbreviation}>
                  {item.abbreviation}
                </Text>
                <Text style={styles.currencyName}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#071216",
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    borderBottomColor: "#303030",
    borderBottomWidth: 1,
  },
  flag: {
    marginLeft: 30,
    fontSize: 24,
    marginRight: 15,
  },
  currencyTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  currencyAbbreviation: {
    fontSize: 18,
    fontFamily: "Rubik-Bold",
    color: "#fff",
  },
  currencyName: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Rubik-Regular",
  },
  titleText: {
    fontSize: 16,
    color: "#f8f8f8",
    marginBottom: 10,
    marginTop: 70,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
  searchBar: {
    fontSize: 24,
    fontFamily: "Rubik-Regular",
    height: 40,
    marginBottom: 20,
    marginHorizontal: 30,
    paddingLeft: 10,
    color: "#fff",
    borderRadius: 5,
  },
  selectedCurrencyText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  backButton: {
    position: "absolute",
    height: 40,
    width: 60,
    top: 50,
    left: 20,

  },
  backButtonText: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Rubik-Regular",
  },
});
