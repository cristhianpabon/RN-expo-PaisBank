import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";

import { COLORS, FONTS } from "../constants/constants";
import {
  REACT_APP_CARDS_URL,
  REACT_APP_TRANSACTIONS_URL,
  REACT_APP_KEY,
} from "@env";
import { setCards } from "../redux/slices/CardsSlice";
import { setTransactions } from "../redux/slices/TransactionsSlice";

import ButtonService from "../components/ButtonService";
import ButtonTransaction from "../components/ButtonTransaction";
import CardItem from "../components/CardItem";
import {
  transactionTypeValues,
} from "../types/types";

interface ProfileScreenProps extends StackScreenProps<any, any> {}

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { logged: isLogged } = useSelector((state: RootState) => state.logged);
  const { cards } = useSelector((state: RootState) => state.cards);
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useDispatch();

  const setTransactionTypeValues = (
    transactionType: string
  ): transactionTypeValues => {
    let currentTransactionType;
    switch (transactionType) {
      case "SUS":
        currentTransactionType = {
          description: "Pago de suscripción",
          background: COLORS.lightPurple,
          color: COLORS.purple,
          image: <Image source={require("../assets/img/suscribe.png")} />,
        };
        break;
      case "CASH_IN":
        currentTransactionType = {
          description: "Pago recibido",
          background: COLORS.lightGreen,
          color: COLORS.green,
          image: <Image source={require("../assets/img/cashIn.png")} />,
        };
        break;

      case "CASH_OUT":
        currentTransactionType = {
          description: "Envio realizado",
          background: COLORS.lightOrange,
          color: COLORS.orange,
          image: <Image source={require("../assets/img/cashOut.png")} />,
        };
        break;
      default:
        currentTransactionType = undefined;
        break;
    }
    return currentTransactionType;
  };

  const getCardsInfo = () => {
    axios
      .get(REACT_APP_CARDS_URL, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": REACT_APP_KEY,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setCards(response.data.data));
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
      });
  };

  const getTransactionsInfo = () => {
    axios
      .get(REACT_APP_TRANSACTIONS_URL, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": REACT_APP_KEY,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setTransactions(response.data.data));
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
      });
  };

  useEffect(() => {
    if (isLogged) {
      getCardsInfo();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      getTransactionsInfo();
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileWidth}
      >
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.profileCards}
        >
          {cards && cards.map((card) => <CardItem key={card.id} {...card} />)}
        </ScrollView>
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
          {transactions &&
            transactions.map((transaction) => {
              const currentTransactionType = setTransactionTypeValues(
                transaction.transactionType
              );
              return (
                <ButtonTransaction
                  key={transaction.id}
                  transactionTitle={transaction.title}
                  transactionDescription={currentTransactionType?.description}
                  transactionAmount={transaction.amount}
                  transactionBackground={currentTransactionType?.background}
                  transactionColor={currentTransactionType?.color}
                  transactionImage={currentTransactionType?.image}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginLeft: 24,
  },
  profileCards: {},
  profileServices: {},
  profileServicesButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
});
