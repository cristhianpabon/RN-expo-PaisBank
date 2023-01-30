import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";
import { cardType } from "../types/types";

const CardItem: React.FC<cardType> = ({
  id,
  issuer,
  name,
  expDate,
  lastDigits,
  balance,
  currency,
}) => {
  return (
    <View
      style={[
        styles.card,
        issuer === "mastercard"
          ? { backgroundColor: COLORS.primaryBlue }
          : { backgroundColor: COLORS.lightPinkTuna },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTitle}>Balance</Text>
        {issuer === "mastercard" ? (
          <Image
            style={styles.cardIcon}
            source={require("../assets/img/mastercard.png")}
          />
        ) : (
          <Image
            style={styles.cardIcon}
            source={require("../assets/img/visa.png")}
          />
        )}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardBalance}>
          <View
            style={[
              styles.cardBalanceCurrencySquare,
              issuer === "mastercard"
                ? {
                    backgroundColor: "#89A5FB",
                  }
                : { backgroundColor: COLORS.lightOrange },
            ]}
          >
            <Text style={styles.cardBalanceCurrency}>{currency}</Text>
          </View>
          <Text style={styles.cardBalanceAmount}>{balance}</Text>
        </View>
        <View style={styles.cardNumber}>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>***</Text>
          <Text style={styles.cardNumberText}>{lastDigits}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardFooterName}>{name}</Text>
        <View style={styles.cardFooterDate}>
          <Text style={styles.cardFooterDateTextLabel}>Exp.Date</Text>
          <Text style={styles.cardFooterDateText}>{expDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 330,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginRight: 12,
    marginBottom: 30,
    justifyContent: "space-between",
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
