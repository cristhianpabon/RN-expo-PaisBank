import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";

import { setLoggin } from "../redux/slices/LoggedSlice";
import { COLORS, FONTS } from "../constants/constants";
import { REACT_APP_LOGIN_URL, REACT_APP_KEY } from "@env";

import ButtonPrimary from "../components/ButtonPrimary";
import FormInput from "../components/FormInput";

interface LoginScreenProps extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { logged: isLogged } = useSelector((state: RootState) => state.logged);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const dispatch = useDispatch();

  const handleOnPressLoginButton = () => {
    axios
      .post(
        REACT_APP_LOGIN_URL,
        // {
        //   email: email?.toLocaleLowerCase(),
        //   password: password,
        // },
        {
          email: "soypaisanx@paisanos.io",
          password: "PAISANX2023!$",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": REACT_APP_KEY,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setEmail("");
          setPassword("");
          dispatch(setLoggin(true));
          navigation.navigate("profile");
        }
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };

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
            value={email}
            placeholder={"Ingresa tu email"}
            handleOnChangeText={(text: string) => setEmail(text)}
          />
          <FormInput
            type={"password"}
            label={"Contraseña"}
            value={password}
            placeholder={"Ingresa tu contraseña"}
            handleOnChangeText={(text: string) => setPassword(text)}
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
            handleOnPress={handleOnPressLoginButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
