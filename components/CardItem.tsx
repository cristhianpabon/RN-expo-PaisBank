import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface CardItemProps {
  buttonText: string;
  handleOnPress: () => void;
  disabled?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  buttonText,
  handleOnPress,
  disabled,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTitle}>Balance</Text>
        <Image
          style={styles.cardIcon}
          source={require("../assets/img/mastercard.png")}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardBalance}>
          <View style={styles.cardBalanceCurrencySquare}>
            <Text style={styles.cardBalanceCurrency}>USD</Text>
          </View>
          <Text style={styles.cardBalanceAmount}>978.85</Text>
        </View>
        <View style={styles.cardNumber}>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>1234</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardFooterName}>Soy Paisanx</Text>
        <View style={styles.cardFooterDate}>
          <Text style={styles.cardFooterDateTextLabel}>Exp.Date</Text>
          <Text style={styles.cardFooterDateText}>02/30</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      width: 300,
      backgroundColor: COLORS.primaryBlue,
      borderRadius: 24,
      paddingVertical: 16,
      paddingHorizontal: 24,
      marginRight: 12,
      marginBottom: 30,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    cardHeaderTitle: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 16,
      fontWeight: "500",
    },
    cardIcon: {},
    cardContent: {},
    cardBalance: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 26,
    },
    cardBalanceCurrency: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 14,
      fontWeight: "500",
    },
    cardBalanceCurrencySquare: {
      backgroundColor: "#89A5FB",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginRight: 10,
    },
    cardBalanceAmount: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 16,
      fontWeight: "500",
    },
    cardNumber: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cardNumberText: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 22,
      fontWeight: "500",
      marginRight: 12,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardFooterName: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 16,
      fontWeight: "500",
    },
    cardFooterDate: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    cardFooterDateTextLabel: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 4,
    },
    cardFooterDateText: {
      color: COLORS.white,
      fontFamily: FONTS.primary,
      fontSize: 16,
      fontWeight: "500",
    },
});

export default CardItem;
