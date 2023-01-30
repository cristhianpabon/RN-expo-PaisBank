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
import ButtonService from "../components/ButtonService";
import ButtonTransaction from "../components/ButtonTransaction";
import { COLORS, FONTS } from "../constants/constants";

import type { RootState } from "../redux/store";

export default function ProfileScreen() {
  const cards = useSelector((state: RootState) => state.cards.value);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileWidth}>
        <View style={styles.topNavbar}>
          <View>
            <Text style={styles.topNavbarSubTitle}>Hola</Text>
            <Text style={styles.topNavbarTitle}>Paisanx</Text>
          </View>
          <View style={styles.topNavbarButton}>
            <Pressable>
              <Image
                style={styles.topNavbarIcon}
                source={require("../assets/img/search.png")}
              />
            </Pressable>
            <Pressable>
              <Image
                style={styles.topNavbarIcon}
                source={require("../assets/img/bell.png")}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.profileServices}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          <View style={styles.profileServicesButtons}>
            <ButtonService
              buttonText={"Billetera"}
              serviceBackground={COLORS.lightGreen}
              serviceImage={
                <Image source={require("../assets/img/wallet.png")} />
              }
              handleOnPress={() => console.log("service")}
            />
            <ButtonService
              buttonText={"Transferir"}
              serviceBackground={COLORS.lightOrange}
              serviceImage={
                <Image source={require("../assets/img/transfer.png")} />
              }
              handleOnPress={() => console.log("service")}
            />
            <ButtonService
              buttonText={"Pagar"}
              serviceBackground={COLORS.lightPurple}
              serviceImage={<Image source={require("../assets/img/pay.png")} />}
              handleOnPress={() => console.log("service")}
            />
            <ButtonService
              buttonText={"Recargar"}
              serviceBackground={COLORS.lightblue}
              serviceImage={
                <Image source={require("../assets/img/recharge.png")} />
              }
              handleOnPress={() => console.log("service")}
            />
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Últimas transacciones</Text>
            <ButtonTransaction
              transactionTitle={"Adobe"}
              transactionDescription={"Pago de suscripción"}
              transactionAmount={"125"}
              transactionBackground={COLORS.lightPurple}
              transactionColor={COLORS.purple}
              transactionImage={
                <Image source={require("../assets/img/suscribe.png")} />
              }
            />
            <ButtonTransaction
              transactionTitle={"Juan David"}
              transactionDescription={"Pago recibido"}
              transactionAmount={"95"}
              transactionBackground={COLORS.lightGreen}
              transactionColor={COLORS.green}
              transactionImage={
                <Image source={require("../assets/img/cashIn.png")} />
              }
            />
            <ButtonTransaction
              transactionTitle={"Miguel Tanaka"}
              transactionDescription={"Envio realizado"}
              transactionAmount={"186"}
              transactionBackground={COLORS.lightOrange}
              transactionColor={COLORS.orange}
              transactionImage={
                <Image source={require("../assets/img/cashOut.png")} />
              }
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
  profileWidth: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 20,
  },
  topNavbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  topNavbarSubTitle: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
  },
  topNavbarTitle: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 16,
    fontWeight: "500",
  },
  topNavbarButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topNavbarIcon: {
    marginLeft: 10,
  },
  profileServices: {},
  profileServicesButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
});
