import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
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
import { Image as MotiImage, View as MotiView } from "moti";
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
import { transactionTypeValues } from "../types/types";

interface ProfileScreenProps extends StackScreenProps<any, any> {}

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [loadingCards, setLoadingCards] = useState<boolean>(false);
  const [loadingTransactions, setLoadingTransactions] =
    useState<boolean>(false);
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
    setLoadingCards(true);
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
          setLoadingCards(false);
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
      });
  };

  const getTransactionsInfo = () => {
    setLoadingTransactions(true);
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
          setLoadingTransactions(false);
          setIsToggled(true);
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

  useEffect(() => {
    if (loadingCards || loadingTransactions) {
      setIsToggled(false);
    } else  {
      setIsToggled(true);
    } 
  }, [loadingCards, loadingTransactions]);

  if (loadingCards || loadingTransactions) {
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
              duration: 500,
            }}
            source={require("../assets/img/loading.png")}
          />
          <Text style={styles.loadingIndicatorText}>Cargando..</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileWidth}
      >
        <MotiView
          animate={{
            opacity: isToggled ? 1 : 0,
            transform: isToggled ? [{ translateY: 0 }] : [{ translateY: 10 }],
          }}
          transition={{
            type: "spring",
            delay: 250,
          }}
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
          <MotiView
            animate={{
              opacity: isToggled ? 1 : 0,
              transform: isToggled
                ? [{ translateY: 0 }]
                : [{ translateY: -40 }],
            }}
            transition={{
              type: "spring",
              delay: 250,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.profileCards}
            >
              {cards &&
                cards.map((card, index) => (
                  <CardItem key={card.id} {...card} />
                ))}
            </ScrollView>
          </MotiView>
          <View style={styles.profileServices}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <MotiView
              animate={{
                opacity: isToggled ? 1 : 0,
                transform: isToggled
                  ? [{ translateY: 0 }]
                  : [{ translateY: -30 }],
              }}
              transition={{
                type: "spring",
                delay: 250,
              }}
            >
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
                  serviceImage={
                    <Image source={require("../assets/img/pay.png")} />
                  }
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
            </MotiView>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Últimas transacciones</Text>
            {transactions &&
              transactions.map((transaction, index) => {
                const currentTransactionType = setTransactionTypeValues(
                  transaction.transactionType
                );
                return (
                  <MotiView
                    key={index}
                    animate={{
                      opacity: isToggled ? 1 : 0,
                      transform: isToggled
                        ? [{ translateY: 0 }]
                        : [{ translateY: 50 }],
                    }}
                    transition={{
                      type: "spring",
                      delay: index * 500,
                    }}
                  >
                    <ButtonTransaction
                      key={transaction.id}
                      transactionTitle={transaction.title}
                      transactionDescription={
                        currentTransactionType?.description
                      }
                      transactionAmount={transaction.amount}
                      transactionBackground={currentTransactionType?.background}
                      transactionColor={currentTransactionType?.color}
                      transactionImage={currentTransactionType?.image}
                    />
                  </MotiView>
                );
              })}
          </View>
        </MotiView>
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
