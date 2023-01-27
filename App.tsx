import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
