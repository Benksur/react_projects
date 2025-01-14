import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import CurrencyConverter from "./src/components/CurrencyConverter";
import SelectLocal from "./src/components/SelectLocal";
import Insights from "./src/components/Insights";
import Searchbar from "./src/components/Searchbar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CurrencyProvider } from "./src/contexts/CurrencyContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <ImageBackground
    //   source={require("./assets/background/gradient (3).png")}
    //   style={styles.container}
    //   resizeMode="stretch"
    // >
    //   <View style={styles.currencyContainer}>
    //     <CurrencyConverter />
    //   </View>

    //   <SelectLocal />
    //   <Insights />

    //   <StatusBar style="auto" />
    // </ImageBackground>
    // <View style={styles.container}>
    //   <Searchbar />
    // </View>
    <CurrencyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CurrencyConverter">
          <Stack.Screen
            name="CurrencyConverter"
            component={CurrencyConverter}
            options={{
              transitionSpec: {
                open: {
                  animation: "spring",
                  config: { stiffness: 1000, damping: 50 },
                },
                close: {
                  animation: "spring",
                  config: { stiffness: 1000, damping: 50 },
                },
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Searchbar"
            component={Searchbar}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrencyProvider>
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
