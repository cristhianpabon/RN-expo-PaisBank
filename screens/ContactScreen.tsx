import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";

import { COLORS, FONTS } from "../constants/constants";
import { REACT_APP_CONTACTS_URL, REACT_APP_KEY } from "@env";
import { setContacts } from "../redux/slices/ContactsSlice";

import ContactItem from "../components/ContactItem";
import FormSearchInput from "../components/FormSearchInput";
import { useEffect, useState } from "react";
import { contactType } from "../types/types";

interface ContactScreenProps extends StackScreenProps<any, any> {}

export const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const [filter, setFilter] = useState<string>("");
  const [contactsFiltered, setContactsFiltered] = useState<contactType[]>();
  const { logged: isLogged } = useSelector((state: RootState) => state.logged);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const handleOnPressBackButton = () => {
    navigation.navigate("profile");
  };

  const getContactsInfo = () => {
    axios
      .get(REACT_APP_CONTACTS_URL, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": REACT_APP_KEY,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setContacts(response.data.data));
        }
      })
      .catch((err) => {
        console.log("Gatein-Error: ", err.response);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setContactsFiltered(
      contacts.filter(
        (contact) =>
          contact.name.includes(filter) ||
          contact.lastName.includes(filter) ||
          contact.phone.includes(filter)
      )
    );
  }, [filter]);

  useEffect(() => {
    if (isLogged) {
      getContactsInfo();
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contactWidth}>
          <Pressable
            style={styles.topNavbar}
            onPress={() => handleOnPressBackButton()}
          >
            <Image
              style={styles.topNavbarImage}
              source={require("../assets/img/back.png")}
            />
            <Text style={styles.topNavbarText}>Contactos</Text>
          </Pressable>
          <FormSearchInput
            placeholder={"Ingresa un nombre o un número"}
            handleOnChangeText={(text) => setFilter(text)}
          />
        </View>
        <View style={styles.contacts}>
          {filter !== "" ? (
            <>
              <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
                Filter
              </Text>
              <View style={styles.contactSeparator}></View>
              <View style={[styles.contactsList, styles.contactWidth]}>
                {contactsFiltered &&
                  contactsFiltered.map((contact) => (
                    <ContactItem
                      contactName={contact.name + " " + contact.lastName}
                      contactNumber={contact.phone}
                      contactCharacters={
                        contact.name.charAt(0) + contact.lastName.charAt(0)
                      }
                    />
                  ))}
              </View>
            </>
          ) : (
            <>
              {/* <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
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
        </View> */}
              <Text style={[styles.contactsSectionTitle, styles.contactWidth]}>
                All
              </Text>
              <View style={styles.contactSeparator}></View>
              <View style={[styles.contactsList, styles.contactWidth]}>
                {contacts &&
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
          )}
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
  topNavbar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 30,
  },
  topNavbarImage: {
    marginRight: 24,
  },
  topNavbarText: {
    fontFamily: FONTS.primary,
    color: COLORS.greyTitle,
    fontSize: 22,
    fontWeight: "500",
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
