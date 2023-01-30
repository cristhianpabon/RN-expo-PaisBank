import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ButtonPrimary from "../components/ButtonPrimary";
import FormInput from "../components/FormInput";
import { COLORS, FONTS } from "../constants/constants";

import type { RootState } from "../redux/store";

export default function LoginScreen() {
  const cards = useSelector((state: RootState) => state.cards.value);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginWidth}>
        <View style={styles.loginHeader}>
          <View>
            <Image
              style={styles.loginHeaderImage}
              source={require("../assets/img/brand.png")}
            />
          </View>
          <Text style={styles.loginHeaderTitle}>PaisBank</Text>
          <Text style={styles.loginHeaderLabel}>
            Comienza a manejar tu vida financiera
          </Text>
        </View>
        <View style={styles.loginContent}>
          <FormInput
            type={"text"}
            label={"Email"}
            placeholder={"Ingresa tu email"}
            handleOnChangeText={(text: string) => console.log(text)}
          />
          <FormInput
            type={"password"}
            label={"Contraseña"}
            placeholder={"Ingresa tu contraseña"}
            handleOnChangeText={(text: string) => console.log(text)}
          />
          <View style={styles.formCheckbox}>
            <View style={styles.formCheckboxSquare}></View>
            <Text style={styles.formCheckboxLabel}>Recordarme</Text>
          </View>
        </View>
        <View style={styles.loginFooter}>
          <View style={styles.registerLabel}>
            <Text style={styles.registerLabelText}>No tienes cuenta?</Text>
            <Pressable>
              <Text style={styles.registerLabelButton}>Registrate</Text>
            </Pressable>
          </View>
          <ButtonPrimary
            buttonText={"Ingresar"}
            handleOnPress={() => console.log("button....")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgrey,
  },
  loginWidth: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  loginHeader: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  loginHeaderImage: {
    width: 48,
    height: 48,
    marginBottom: 20,
  },
  loginHeaderTitle: {
    fontFamily: FONTS.primary,
    color: COLORS.primaryBlue,
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 20,
  },
  loginHeaderLabel: {
    fontFamily: FONTS.primary,
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: "400",
  },
  loginContent: {
    flex: 1,
  },
  formCheckbox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formCheckboxSquare: {
    height: 18,
    width: 18,
    backgroundColor: COLORS.greyCheckBox,
    borderRadius: 6,
    marginRight: 8,
  },
  formCheckboxLabel: {
    fontFamily: FONTS.primary,
    color: COLORS.greyLabel,
    fontSize: 14,
    fontWeight: "400",
  },
  loginFooter: {
    flex: 1,
    justifyContent: "flex-end",
  },
  registerLabel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  registerLabelText: {
    fontFamily: FONTS.primary,
    color: COLORS.greySubTitle,
    fontSize: 18,
    fontWeight: "400",
    marginRight: 5,
  },
  registerLabelButton: {
    fontFamily: FONTS.primary,
    color: COLORS.primaryBlue,
    fontSize: 18,
    fontWeight: "400",
  },
});
