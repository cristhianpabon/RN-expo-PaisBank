import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface FormSearchInputProps {
  placeholder: string;
  value?: string;
  handleOnChangeText: (value: string) => void;
}

const FormSearchInput: React.FC<FormSearchInputProps> = ({
  placeholder,
  value,
  handleOnChangeText,
}) => {
  return (
    <View style={styles.searchInput}>
      <Image
        style={styles.searchInputImage}
        source={require("../assets/img/search_grey.png")}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={"#9CA2B7"}
        value={value && value}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 16,
    width: "100%",
    marginBottom: 30,
  },
  searchInputImage: {
    width: 17,
    height: 17,
    marginRight: 20,
  },
  inputStyle: {
    width: "90%",
  },
});

export default FormSearchInput;
