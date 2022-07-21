import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/redux/store.config";
require("./app/config/axios");
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import AppStack from "./app/navigation/AppStack";
import SearchCategory from "./app/context/SearchCategory";
import FlashMessage from "react-native-flash-message";

import { en, ar } from "./app/translations/locals/index";
import { LogBox } from "react-native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { View } from "react-native";
import { Text } from "react-native";

// Set the key-value pairs for the different languages you want to support.
// i18n.translations = {
//   en,
//   ar,
// };
// // Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

LogBox.ignoreAllLogs();
export default function App() {
  const [searchCat, setSearchCat] = useState("Home");
  const ref = useRef(null);

  useEffect(() => {
    (async () => getResponse())();
  });
  const getResponse = async () => {
    await AsyncStorage.setItem("lang", "ar");
    i18n.locale = "ar";
  };
  return (
    // <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SearchCategory.Provider value={{ searchCat, setSearchCat }}>
            <AppStack />

            <FlashMessage ref={ref} />
            {/* <--- here as last component always with `ref` */}
          </SearchCategory.Provider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    // </SafeAreaProvider>
  );
}
/////////////////////////////////////////////////////////////
