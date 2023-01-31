import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { Image as MotiImage, View as MotiView } from "moti";
import axios from "axios";
import moment from "moment";

import { COLORS, FONTS } from "../constants/constants";
import { REACT_APP_CONTACTS_URL, REACT_APP_KEY } from "@env";
import { setContacts } from "../redux/slices/ContactsSlice";
import { contactType } from "../types/types";

import FormSearchInput from "../components/FormSearchInput";
import ContactList from "../components/ContactList";
import AppLoadingIndicator from "../components/AppLoadingIndicator";

interface ContactScreenProps extends StackScreenProps<any, any> {}

export const ContactScreen = ({ navigation }: ContactScreenProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
          setLoading(false);
          setIsToggled(true);
        }
      })
      .catch((err) => {
        console.log("Error: ", err.response);
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
    const contactsFiltered = contacts.filter(
      (contact) =>
        contact.name.includes(filter) ||
        contact.lastName.includes(filter) ||
        contact.phone.includes(filter)
    );
    setContactsFiltered(contactsFiltered);
  }, [filter]);

  useEffect(() => {
    const today = getFormattedDate();
    if (contacts && contacts.length) {
      const recentContactsValues = contacts.filter(
        (contact) => contact.addedDate === today
      );
      setRecentContacts(recentContactsValues);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      getContactsInfo();
    }
  }, [isLogged]);

  useEffect(() => {
    if (loading) {
      setIsToggled(false);
    } else {
      setIsToggled(true);
    }
  }, [loading]);

  if (loading) {
    return <AppLoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MotiView
          animate={{
            opacity: isToggled === true ? 1 : 0,
            scale: isToggled === true ? 1 : 1.5,
          }}
          transition={{ type: "timing", delay: 0, duration: 200 }}
          style={{
            width: "100%",
          }}
        >
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
            <MotiView
              animate={{
                opacity: isToggled === true ? 1 : 0,
                scale: isToggled === true ? 1 : 1.5,
              }}
              transition={{ type: "timing", delay: 0, duration: 300 }}
              style={{
                width: "100%",
              }}
            >
              <FormSearchInput
                placeholder={"Ingresa un nombre o un número"}
                handleOnChangeText={(text) => setFilter(text)}
              />
            </MotiView>
          </View>
          <View style={styles.contacts}>
            {filter !== "" ? (
              <ContactList
                contactListTitle={"Filter"}
                contacts={contactsFiltered}
                animation={false}
              />
            ) : (
              <View>
                <ContactList
                  contactListTitle={"Recents"}
                  contacts={recentContacts}
                  animation={true}
                />
                <ContactList
                  contactListTitle={"All"}
                  contacts={contacts}
                  isToggled={isToggled}
                  animation={true}
                />
              </View>
            )}
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
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight && StatusBar.currentHeight + 30
        : 0,
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
