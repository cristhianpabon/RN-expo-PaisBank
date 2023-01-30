import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface ButtonTransactionProps {
  transactionTitle: string;
  transactionDescription: string;
  transactionAmount: string;
  transactionBackground: string;
  transactionColor: string;
  transactionImage: React.ReactNode;
}

const ButtonTransaction: React.FC<ButtonTransactionProps> = ({
  transactionTitle,
  transactionDescription,
  transactionAmount,
  transactionBackground,
  transactionColor,
  transactionImage,
}) => {
  return (
    <View style={styles.transaction}>
      <Pressable onPress={() => console.log("transaction")}>
        <View style={styles.transactionContainer}>
          <View style={styles.horizontalContainer}>
            <View
              style={[
                styles.transactionImageContainer,
                {
                  backgroundColor: transactionBackground,
                },
              ]}
            >
              {transactionImage}
            </View>
            <View style={styles.transactionData}>
              <Text style={styles.transactionTitle}>{transactionTitle}</Text>
              <Text style={styles.transactionSubTitle}>
                {transactionDescription}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color: transactionColor,
                },
              ]}
            >
              ${transactionAmount}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 44,
    height: 44,
    backgroundColor: COLORS.lightPurple,
    marginRight: 16,
  },
  transactionData: {
    justifyContent: "space-between",
  },
  transactionTitle: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.greySubTitle,
    fontSize: 16,
    fontWeight: "400",
  },
  transactionSubTitle: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.greyLabel,
    fontSize: 14,
    fontWeight: "400",
  },
  transactionAmount: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default ButtonTransaction;
