import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ListRenderItem,
} from "react-native";
import { useFonts } from "expo-font";
import currencyData from "../../assets/text/data.json";

interface CurrencyData {
  abbreviation: string;
  name: string;
  icon: any;
}

interface ExchangeData extends CurrencyData {
  rateChange: string;
}

interface HistoricalRates {
  [key: string]: number;
}

interface Currencies {
  currencies: {
    [key: string]: {
      rates: HistoricalRates;
    };
  };
}

const placeholderCurrencies: CurrencyData[] = [
  {
    abbreviation: "USD",
    name: "United States Dollar",
    icon: require("../../assets/icons/united-states.png"),
  },
  {
    abbreviation: "EUR",
    name: "Euro",
    icon: require("../../assets/icons/european-union.png"),
  },
  {
    abbreviation: "JPY",
    name: "Japanese Yen",
    icon: require("../../assets/icons/japan.png"),
  },
  {
    abbreviation: "GBP",
    name: "British Pound",
    icon: require("../../assets/icons/united-kingdom.png"),
  },
  {
    abbreviation: "AUD",
    name: "Australian Dollar",
    icon: require("../../assets/icons/australia.png"),
  },
  {
    abbreviation: "CAD",
    name: "Canadian Dollar",
    icon: require("../../assets/icons/canada.png"),
  },
  {
    abbreviation: "CHF",
    name: "Swiss Franc",
    icon: require("../../assets/icons/switzerland.png"),
  },
  {
    abbreviation: "CNY",
    name: "Chinese Yuan",
    icon: require("../../assets/icons/china.png"),
  },
  {
    abbreviation: "SEK",
    name: "Swedish Krona",
    icon: require("../../assets/icons/sweden.png"),
  },
  {
    abbreviation: "NZD",
    name: "New Zealand Dollar",
    icon: require("../../assets/icons/new-zealand.png"),
  },
];

export default function Insights() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  const [exchangeData, setExchangeData] = useState<ExchangeData[]>([]);
  const compareRates = (
    currencyAbbreviation: string,
    currentRate: number
  ): string => {
    const historicalRates = (currencyData as Currencies).currencies[
      currencyAbbreviation
    ].rates;
    const lastThreeMonths = [
      historicalRates["2024-12-01"],
      historicalRates["2024-11-01"],
      historicalRates["2024-10-01"],
    ];

    const isHigher = lastThreeMonths.some((rate) => currentRate > rate);

    return isHigher ? "↑ Higher" : "↓ Lower";
  };

  useEffect(() => {
    const fetchExchangeData = async (): Promise<void> => {
      const response = await fetch("https://open.er-api.com/v6/latest/AUD");
      const result = await response.json();

      const currentRates: { [key: string]: number } = result.rates;

      const data: ExchangeData[] = placeholderCurrencies.map((currency) => {
        const currentRate = currentRates[currency.abbreviation];
        return {
          ...currency,
          rateChange: compareRates(currency.abbreviation, currentRate),
        };
      });

      setExchangeData(data);
    };

    fetchExchangeData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const renderItem: ListRenderItem<ExchangeData> = ({ item }) => {
    const textColor = item.rateChange.includes("↑") ? "green" : "red";

    return (
      <View style={styles.currencyItem}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.currencyAbbreviation}>{item.abbreviation}</Text>
        <Text style={styles.currencyName}> {item.name}</Text>
        <Text style={[styles.percentage, { color: textColor }]}>
          {" "}
          {item.rateChange}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.whiteContainer}>
      <FlatList
        data={exchangeData}
        keyExtractor={(item) => item.abbreviation}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 40,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  currencyItem: {
    width: "90%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: "#303030",
    borderBottomWidth: 1,
    marginLeft: "5%",
  },
  currencyAbbreviation: {
    fontSize: 18,
    fontFamily: "Rubik-Bold",
    color: "#000",
  },
  currencyName: {
    fontSize: 15,
    color: "#555",
    fontFamily: "Rubik-Regular",
    flex: 1,
    textAlign: "left",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  percentage: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    marginLeft: "auto",
  },
});
