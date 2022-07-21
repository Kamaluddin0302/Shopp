import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";

import colors from "../config/colors";
import Header from "../components/Header";
import TopNav from "../navigation/TopNav";
import IconHeader from "../components/iconHeader";

import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomePopup from "../components/welcomePopup";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Home({ navigation, translation }) {
  const [err, seterr] = useState("");
  const [lang, setlang] = useState("");
  let [Lang, setLang] = useState(true);
  let [welcomeModal, setWelcomeModal] = useState(false);
  const [filter, setfilter] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      let userId = await AsyncStorage.getItem("id");

      if (!userId) {
        navigation.navigate("Profile");
      } else {
        let welcomepopup = await AsyncStorage.getItem("welcome");
        !welcomepopup && setWelcomeModal(true);
        AsyncStorage.setItem("welcome", "true");

        const PreValue = await AsyncStorage.getItem("lang");
        let lan = PreValue ? PreValue : "en";
        i18n.locale = lan;
        setLang(!Lang);
        navigation.navigate("Home");
      }
    });
  }, [navigation]);

  const ChangeLan = async (lang) => {
    try {
      await AsyncStorage.setItem("lang", lang);
      i18n.locale = lang;
      navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }

    setLang(!Lang);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden />
      <IconHeader />
      <Header
        navigation={navigation}
        ChangeLan={ChangeLan}
        translation={translation}
        filter={true}
        filterHandleChange={() => setfilter(!filter)}
        bg="white"
        image={require("./../../app/assets/banner.webp")}
        carosel={true}
      />

      <TouchableOpacity
        style={styles.whatsappPopup}
        onPress={() => setWelcomeModal(!welcomeModal)}
      >
        <Image
          source={require("./../assets/whatsapp.png")}
          style={styles._whatsappImage}
        />
      </TouchableOpacity>
      <View style={styles.main}>
        <View style={styles.main2}>
          <TopNav
            navigation={navigation}
            lang={lang}
            translate={translation}
            showfilter={filter}
            filterHandleChange={() => setfilter(!filter)}
          />
        </View>
      </View>
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
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  main: {
    flex: 1,
    width: "100%",
    borderRadius: 15,
  },
  main2: {
    flex: 1,
    width: "95%",
    backgroundColor: "white",
    elevation: 15,
    paddingTop: 10,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  whatsappPopup: {
    width: 60,
    height: 60,
    // bottom: 40,
    // right: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 29,
    borderWidth: 3,
  },
  _whatsappImage: {
    height: 35,
    width: 35,
    borderRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  _header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e3e5",
    padding: 10,
  },
  title: {
    color: "#2daeb5",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10,
  },
  _detail: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
  },
  _bottomView: {
    padding: 10,
  },
  _question: {
    color: "#2daeb5",
    fontSize: 15,
    textAlign: "right",
    fontWeight: "bold",
  },
  buttonView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  _button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9c347",
    width: 120,
    padding: 7,
    borderRadius: 10,
    marginLeft: 10,
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
