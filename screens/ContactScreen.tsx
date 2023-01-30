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
import moment from "moment";

import { COLORS, FONTS } from "../constants/constants";
import { REACT_APP_CONTACTS_URL, REACT_APP_KEY } from "@env";
import { setContacts } from "../redux/slices/ContactsSlice";

import ContactItem from "../components/ContactItem";
import FormSearchInput from "../components/FormSearchInput";
import { useEffect, useState } from "react";
import { contactType } from "../types/types";
import ContactList from "../components/ContactList";

interface ContactScreenProps extends StackScreenProps<any, any> {}

export const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const [filter, setFilter] = useState<string>("");
  const [contactsFiltered, setContactsFiltered] = useState<contactType[]>();
  const [recentContacts, setRecentContacts] = useState<contactType[]>();
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

  const getFormattedDate = () => {
    return moment().format("YYYY-MM-DD");
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
    const today = getFormattedDate();
    const recentContactsValues = contacts.filter(
      (contact) => contact.addedDate === today
    );
    setRecentContacts(recentContactsValues);
  }, []);

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
            contactsFiltered?.length && (
              <ContactList
                contactListTitle={"Filter"}
                contacts={contactsFiltered}
              />
            )
          ) : (
            <>
              {recentContacts && recentContacts?.length !== 0 && (
                <ContactList
                  contactListTitle={"Recents"}
                  contacts={recentContacts}
                />
              )}

              <ContactList contactListTitle={"All"} contacts={contacts} />
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
});
