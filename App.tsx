import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync(); 

import { BottomTabNavigator } from "./navigator/BottomTabNavigator";

export default function App() {
  const [loaded] = Font.useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onReady={onLayoutRootView}>
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
