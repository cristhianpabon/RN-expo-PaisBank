import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";
import { contactType } from "../types/types";
import ContactItem from "./ContactItem";

export interface ContactListProps {
  contactListTitle: string;
  contacts: contactType[];
}

const ContactList: React.FC<ContactListProps> = ({
  contactListTitle,
  contacts,
}) => {
  return (
    <>
      <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
        {contactListTitle}
      </Text>
      <View style={styles.contactSeparator}></View>
      <View style={[styles.contactsList, styles.contactWidth]}>
        {contacts.length &&
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contactName={contact.name + " " + contact.lastName}
              contactNumber={contact.phone}
              contactCharacters={
                contact.name.charAt(0) + contact.lastName.charAt(0)
              }
            />
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contactWidth: {
    width: "90%",
    alignSelf: "center",
  },
  contactsSectionTitle: {
    fontFamily: FONTS.primary,
    color: COLORS.greyLabel,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 16,
  },
  contactSeparator: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.greyLine,
  },
  contactsList: {
    paddingTop: 24,
    paddingBottom: 24,
  },
});

export default ContactList;
