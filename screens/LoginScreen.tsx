import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { Image as MotiImage, View as MotiView } from "moti";
import axios from "axios";

import { setLoggin } from "../redux/slices/LoggedSlice";
import { COLORS, FONTS } from "../constants/constants";
import { REACT_APP_LOGIN_URL, REACT_APP_KEY } from "@env";

import ButtonPrimary from "../components/ButtonPrimary";
import FormInput from "../components/FormInput";
import AppLoadingIndicator from "../components/AppLoadingIndicator";

interface LoginScreenProps extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const dispatch = useDispatch();

  const handleOnPressLoginButton = () => {
    setLoading(true);
    axios
      .post(
        REACT_APP_LOGIN_URL,
        {
          email: email?.toLocaleLowerCase(),
          password: password,
        },
        // {
        //   email: "soypaisanx@paisanos.io",
        //   password: "PAISANX2023!$",
        // },
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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error: ", err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsToggled(true);
    }, 200);
  }, []);

  if (isLoading) {
    return <AppLoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginWidth}>
        <MotiView
          style={styles.loginHeader}
          animate={{
            opacity: isToggled ? 1 : 0,
            transform: isToggled ? [{ translateY: 0 }] : [{ translateY: -10 }],
          }}
          transition={{
            type: "timing",
            delay: 0,
            duration: 400,
          }}
        >
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
        </MotiView>
        <MotiView
          style={styles.loginContent}
          animate={{
            opacity: isToggled ? 1 : 0,
            transform: isToggled ? [{ translateY: 0 }] : [{ translateY: -10 }],
          }}
          transition={{
            type: "timing",
            delay: 0,
            duration: 700,
          }}
        >
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
        </MotiView>
        <MotiView
          style={styles.loginFooter}
          animate={{
            opacity: isToggled ? 1 : 0,
            transform: isToggled ? [{ translateY: 0 }] : [{ translateY: -10 }],
          }}
          transition={{
            type: "timing",
            delay: 0,
            duration: 900,
          }}
        >
          <View style={styles.registerLabel}>
            <Text style={styles.registerLabelText}>No tienes cuenta?</Text>
            <Pressable>
              <Text style={styles.registerLabelButton}>Registrate</Text>
            </Pressable>
          </View>
          <ButtonPrimary
            buttonText={"Ingresar"}
            handleOnPress={handleOnPressLoginButton}
            disabled={loading}
          />
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgrey,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight && StatusBar.currentHeight + 30
        : 0,
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
