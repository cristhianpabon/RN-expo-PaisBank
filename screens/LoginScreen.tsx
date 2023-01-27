import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '../redux/store'

export default function LoginScreen() {
    const cards = useSelector((state: RootState) => state.cards.value)
  return (
      <SafeAreaView style={styles.container}>
        <Text>Hello World!</Text>
        <Text>{cards}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
