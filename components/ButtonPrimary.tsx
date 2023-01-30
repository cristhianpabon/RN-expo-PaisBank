import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface ButtonPrimaryProps {
  buttonText: string;
  handleOnPress: () => void;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  buttonText,
  handleOnPress,
  disabled,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          disabled ? { opacity: 0.45 } : { opacity: 1 },
        ]}
        onPress={() => handleOnPress && handleOnPress()}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 19,
  },
  buttonText: {
    fontFamily: FONTS.primary,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ButtonPrimary;
