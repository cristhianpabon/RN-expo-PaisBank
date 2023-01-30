import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface ButtonServiceProps {
  buttonText: string;
  serviceBackground: string;
  serviceImage: React.ReactNode;
  handleOnPress: () => void;
}

const ButtonService: React.FC<ButtonServiceProps> = ({
  buttonText,
  serviceBackground,
  serviceImage,
  handleOnPress,
}) => {
  return (
    <Pressable
      style={styles.profileServicesButton}
      onPress={() => handleOnPress()}
    >
      <View
        style={[
          styles.profileServicesButtonImageContainer,
          {
            backgroundColor: serviceBackground,
          },
        ]}
      >
        {serviceImage}
      </View>
      <Text style={styles.profileServicesButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profileServicesButton: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 18,
    fontWeight: "400",
    alignItems: "center",
  },
  profileServicesButtonImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: 70,
    height: 70,
    marginBottom: 16,
  },
  profileServicesButtonText: {
    fontFamily: FONTS.primary,
    color: COLORS.greySubTitle,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default ButtonService;
