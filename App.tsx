import { StyleSheet } from "react-native";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { BottomTabNavigator } from "./navigator/BottomTabNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
