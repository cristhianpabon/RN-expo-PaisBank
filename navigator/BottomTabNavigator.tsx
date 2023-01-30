import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ContactScreen } from "../screens/ContactScreen";

const Tabs = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require("../assets/img/home.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require("../assets/img/document.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        component={LoginScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require("../assets/img/logout.png")} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs.Navigator>
  );
};
