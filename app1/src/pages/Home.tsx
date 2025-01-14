import SelectLocal from "../components/SelectLocal";
import Insights from "../components/Insights";
import CurrencyConverter from "../components/CurrencyConverter";
import { StyleSheet, View, ImageBackground, Text } from "react-native";

export default function Home({ navigation }: { navigation: any }) {
  return (
    <ImageBackground
      source={require("../../assets/background/gradient (3).png")}
      style={styles.container}
      resizeMode="stretch"
    >
      <View style={styles.currencyContainer}>
        <CurrencyConverter navigation={navigation} />
      </View>

      <SelectLocal />
      <Insights />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  currencyContainer: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
