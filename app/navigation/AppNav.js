import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import FavoritesScreen from "../screens/Favorites";
import CartScreen from "../screens/Cart";
import ProfileScreen from "../screens/Profile";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let lang = await AsyncStorage.getItem("lang");
  //       let chl = lang ? lang : "en";
  //       i18n.locale = chl;
  //     } catch (err) {
  //       console.log("================>", err);
  //     }
  //   })();
  // }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        // style: { height: 60, marginBottom: 0 },

        labelStyle: {
          fontSize: 14,
          marginBottom: 7,
        },
        style: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: "white",
          width: "95%",
          alignSelf: "center",
          paddingBottom: 10,
          height: 60,
          elevation: 10,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size = 25 }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "magnify" : "magnify";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} translation={i18n.t("AllLan")} />
        )}
        options={{
          tabBarLabel: i18n.t("AllLan.home"),
        }}
      />
      <Tab.Screen
        name="Search"
        children={(props) => (
          <SearchScreen {...props} translation={i18n.t("AllLan")} />
        )}
        options={{
          tabBarLabel: i18n.t("AllLan.DeliveryPricesarch"),
        }}
      />
      {/* <Tab.Screen
        name="Favorites"
        component={Payment}
        options={{
          tabBarLabel: i18n.t("AllLan.favorites"),
        }}
      /> */}
      <Tab.Screen
        name="Cart"
        children={(props) => (
          <CartScreen translation={i18n.t("AllLan")} {...props} />
        )}
        options={{
          tabBarLabel: i18n.t("AllLan.cart"),
        }}
      />

      <Tab.Screen
        name="Profile"
        children={(props) => (
          <ProfileScreen {...props} translation={i18n.t("AllLan")} />
        )}
        options={{
          tabBarLabel: i18n.t("AllLan.profile"),
        }}
      />
    </Tab.Navigator>
  );
}
