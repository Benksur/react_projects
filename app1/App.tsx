import Searchbar from "./src/pages/Searchbar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CurrencyProvider } from "./src/contexts/CurrencyContext";
import Home from "./src/pages/Home";

const Stack = createStackNavigator();

export default function App() {
  return (

    <CurrencyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
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
