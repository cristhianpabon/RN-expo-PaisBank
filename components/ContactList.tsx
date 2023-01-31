import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS } from "../constants/constants";
import { contactType } from "../types/types";
import { View as MotiView } from "moti";
import ContactItem from "./ContactItem";

export interface ContactListProps {
  contactListTitle: string;
  contacts?: contactType[];
  isToggled?: boolean;
  animation?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({
  contactListTitle,
  contacts,
  isToggled,
  animation,
}) => {
  if (contacts && contacts.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
        {contactListTitle && contactListTitle}
      </Text>
      <View style={styles.contactSeparator}></View>
      <View style={[styles.contactsList, styles.contactWidth]}>
        {contacts &&
          contacts.map((contact, index) => (
            <View key={index}>
              {animation ? (
                <MotiView
                  animate={{
                    opacity: isToggled ? 1 : 0,
                    transform: isToggled
                      ? [{ translateY: 0 }]
                      : [{ translateY: 10 }],
                  }}
                  transition={{
                    type: "spring",
                    delay: index * 250,
                  }}
                >
                  <ContactItem
                    key={contact.id}
                    contactName={`${contact.name} ${contact.lastName}`}
                    contactNumber={contact.phone}
                    contactCharacters={`${contact.name.charAt(
                      0
                    )}${contact.lastName.charAt(0)}`}
                  />
                </MotiView>
              ) : (
                <View>
                  <ContactItem
                    key={contact.id}
                    contactName={`${contact.name} ${contact.lastName}`}
                    contactNumber={contact.phone}
                    contactCharacters={`${contact.name.charAt(
                      0
                    )}${contact.lastName.charAt(0)}`}
                  />
                </View>
              )}
            </View>
          ))}
      </View>
    </View>
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
