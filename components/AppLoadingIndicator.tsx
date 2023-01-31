import React from "react";
import { Image as MotiImage, View as MotiView } from "moti";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

const AppLoadingIndicator= () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingIndicator}>
        <MotiImage
          style={{
            width: 50,
            height: 50,
          }}
          from={{
            rotate: "0deg",
          }}
          animate={{
            rotate: "360deg",
          }}
          transition={{
            loop: true,
            repeatReverse: false,
            type: "timing",
            duration: 200,
          }}
          source={require("../assets/img/loading.png")}
        />
        <Text style={styles.loadingIndicatorText}>Cargando..</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgrey,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicatorText: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 20,
  },
});

export default AppLoadingIndicator;
