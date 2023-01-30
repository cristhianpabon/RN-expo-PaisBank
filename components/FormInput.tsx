import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface FormInputProps {
  type: string;
  label: string;
  placeholder: string;
  value?: string;
  handleOnChangeText: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  label,
  placeholder,
  value,
  handleOnChangeText,
}) => {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.inputStyle}
        secureTextEntry={type === "password" ? true : false}
        placeholder={placeholder}
        placeholderTextColor={"#9CA2B7"}
        value={value && value}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: FONTS.primary,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.greyTitle,
    marginBottom: 16,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 3,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 12,
  },
});

export default FormInput;
