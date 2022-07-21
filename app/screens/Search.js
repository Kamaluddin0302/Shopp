import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import colors from "../config/colors";
import axios from "axios";
import Products from "../components/Home/Products";

import SearchCategory from "../context/SearchCategory";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomePopup from "../components/welcomePopup";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Search({ navigation, translation }) {
  const { searchCat, setSearchCat } = useContext(SearchCategory);
  let [welcomeModal, setWelcomeModal] = useState(false);

  let [Lang, setLang] = useState(true);

  console.log("000000000000000", searchCat);

  const ChangeLan = async (lang) => {
    try {
      await AsyncStorage.setItem("lang", lang);
      i18n.locale = lang;
      navigation.navigate("Search");
    } catch (error) {
      alert(error);
    }

    setLang(!Lang);
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      let userId = await AsyncStorage.getItem("id");

      if (!userId) {
        navigation.navigate("Profile");
      } else {
        const PreValue = await AsyncStorage.getItem("lang");
        let lan = PreValue ? PreValue : "en";
        i18n.locale = lan;
        navigation.navigate("Search");
      }
    });
  }, [navigation]);
  const priceList = [
    {
      delivery: "24",
      distribution: "19",
      kg: "0.5",
    },
    {
      delivery: "24",
      distribution: "19",
      kg: "1",
    },
    {
      delivery: "25",
      distribution: "22",
      kg: "1.5",
    },
    {
      delivery: "26",
      distribution: "23",
      kg: "2",
    },
    {
      delivery: "30",
      distribution: "26",
      kg: "2.5",
    },
    {
      delivery: "33",
      distribution: "29",
      kg: "2",
    },
    {
      delivery: "35",
      distribution: "32",
      kg: "3.5",
    },

    {
      delivery: "38",
      distribution: "35",
      kg: "4",
    },
    {
      delivery: "42",
      distribution: "38",
      kg: "4.5",
    },
    {
      delivery: "44",
      distribution: "40",
      kg: "5",
    },
    {
      delivery: "47",
      distribution: "47",
      kg: "6",
    },
    {
      delivery: "52",
      distribution: "52",
      kg: "7",
    },
    {
      delivery: "56",
      distribution: "56",
      kg: "8",
    },
    {
      delivery: "61",
      distribution: "61",
      kg: "9",
    },
    {
      delivery: "65",
      distribution: "65",
      kg: "10",
    },
    {
      delivery: "69",
      distribution: "69",
      kg: "11",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header
        navigation={navigation}
        bg="primary"
        shadow={true}
        ChangeLan={ChangeLan}
        translation={translation}
        carosel={false}
      />
      {/* Deliveryto */}

      <TouchableOpacity
        style={styles.whatsappPopup}
        onPress={() => setWelcomeModal(!welcomeModal)}
      >
        <Image
          source={require("./../assets/whatsapp.png")}
          style={styles._whatsappImage}
        />
      </TouchableOpacity>
      <View style={styles._table}>
        <View
          style={[
            styles._row,
            {
              backgroundColor: "black",
              alignItems: "center",
              paddingVertical: 10,
            },
          ]}
        >
          <Text style={[styles._th, { color: "white" }]}>
            {i18n.t("AllLan.Deliveryto")}
          </Text>
          <Text style={[styles._th, { color: "white" }]}>
            {i18n.t("AllLan.Distribution")}
          </Text>
          <Text style={[styles._th, { color: "white" }]}>
            {i18n.t("AllLan.Kilogram")}
          </Text>
        </View>

        <ScrollView>
          {priceList.map((val, i) => {
            return (
              <View style={styles._row} key={i}>
                <Text style={styles._td}>{val.delivery}</Text>
                <Text
                  style={[
                    styles._td,
                    {
                      borderLeftWidth: 1,
                      borderColor: "black",
                      color: "black",
                    },
                  ]}
                >
                  {val.distribution}
                </Text>
                <Text
                  style={[
                    styles._td,
                    {
                      borderLeftWidth: 1,
                      borderColor: "black",
                      color: "black",
                    },
                  ]}
                >
                  {val.kg}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={welcomeModal}
          onRequestClose={() => {
            setModalVisible(!welcomeModal);
          }}
        >
          <WelcomePopup
            translation={i18n.t("AllLan")}
            onPress={() => setWelcomeModal(!welcomeModal)}
          />
        </Modal>
      </View>
      {/* <Tabs
        searchCat={searchCat}
        setSearchCat={setSearchCat}
        translation={translation}
      /> */}
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "green",
    borderColor: "#e6e6e6",
    // height: 40,
  },
  _td: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    color: "#c43958",
    fontWeight: "bold",
  },
  _th: {
    flex: 1,
    // height: 40,
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  _table: {
    flex: 1,
  },
  _whatsappImage: {
    height: 35,
    width: 35,
    borderRadius: 12,
  },
  whatsappVeiw: {
    backgroundColor: "white",
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappPopup: {
    width: 60,
    height: 60,
    position: "absolute",
    top: windowWidth + 220,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 25,
  },
});
