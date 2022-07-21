import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { TurkishStores, DokaniStores, Kids, Home } from "../components/Home/";
import colors from "../config/colors";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const Tab = createMaterialTopTabNavigator();

export default function MyTabs({
  navigation,
  lang,
  translate,
  showfilter,
  filterHandleChange,
  route,
}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        indicatorStyle: { backgroundColor: "white", width: 30, marginLeft: 40 },
        // tabStyle: { backgroundColor: "white" },
        labelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        style: {
          borderRadius: 20,
          backgroundColor: "white",
          width: "75%",
          alignSelf: "center",
          height: 50,
          elevation: 10,
        },
      }}

      // initialRouteName="DokaniStores"
    >
      <Tab.Screen
        name="Turkish Stores"
        children={() => (
          <TurkishStores
            translation={translate}
            showfilter={showfilter}
            filterHandleChange={filterHandleChange}
          />
        )}
        options={{
          tabBarLabel: translate.TurkishStores,
        }}
      />
      <Tab.Screen
        name="DokaniStores"
        children={() => (
          <DokaniStores navigation={navigation} translation={translate} />
        )}
        options={{
          tabBarLabel: translate.MyAddresses,
        }}
      />
    </Tab.Navigator>
  );
}
