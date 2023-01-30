import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";

export interface ContactItemProps {
  contactName: string;
  contactNumber: string;
  contactCharacters: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contactName,
  contactNumber,
  contactCharacters,
}) => {
  return (
    <View style={styles.contact}>
      <View style={styles.contactContainer}>
        <View style={styles.horizontalContainer}>
          <View style={styles.contactSquareContainer}>
            <Text style={styles.contactSquareContainerText}>
              {contactCharacters}
            </Text>
          </View>
          <View style={styles.contactData}>
            <Text style={styles.contactName}>{contactName}</Text>
            <Text style={styles.contactNumber}>{contactNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contactSquareContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 44,
    height: 44,
    backgroundColor: COLORS.lightblue,
    marginRight: 16,
  },
  contactSquareContainerText: {
    fontFamily: FONTS.primary,
    color: COLORS.lightblueText,
    fontSize: 16,
    fontWeight: "400",
  },
  contactData: {
    justifyContent: "space-between",
  },
  contactName: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.greySubTitle,
    fontSize: 18,
    fontWeight: "400",
  },
  contactNumber: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.greyLabel,
    fontSize: 16,
    fontWeight: "400",
  },
  contactAmount: {
    marginBottom: 5,
    fontFamily: FONTS.primary,
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default ContactItem;
