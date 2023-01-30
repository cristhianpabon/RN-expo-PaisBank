import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { COLORS, FONTS } from "../constants/constants";

import ContactItem from "../components/ContactItem";
import FormSearchInput from "../components/FormSearchInput";
import { useEffect } from "react";

interface ContactScreenProps extends StackScreenProps<any, any> {}

export const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const cards = useSelector((state: RootState) => state.cards.value);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contactWidth}>
          <FormSearchInput
            placeholder={"Ingresa un nombre o un número"}
            handleOnChangeText={(text) => console.log(text)}
          />
        </View>
        <View style={styles.contacts}>
          <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
            Recents
          </Text>
          <View style={styles.contactSeparator}></View>
          <View style={[styles.contactsList, styles.contactWidth]}>
            <ContactItem
              contactName={"Belen Salvador"}
              contactNumber={"+8643307899"}
              contactCharacters={"BS"}
            />
            <ContactItem
              contactName={"Belen Salvador"}
              contactNumber={"+8643307899"}
              contactCharacters={"BS"}
            />
          </View>
          <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
            All
          </Text>
          <View style={styles.contactSeparator}></View>
          <View style={[styles.contactsList, styles.contactWidth]}>
            <ContactItem
              contactName={"Belen Salvador"}
              contactNumber={"+8643307899"}
              contactCharacters={"BS"}
            />
            <ContactItem
              contactName={"Belen Salvador"}
              contactNumber={"+8643307899"}
              contactCharacters={"BS"}
            />
          </View>
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
  contactWidth: {
    width: "90%",
    alignSelf: "center",
  },
  contacts: {},
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
