import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { StatusBar } from "expo-status-bar";

import i18n from "i18n-js";
import { en, ar } from "../translations/locals/index";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

const slides = [
  {
    key: 1,
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("./../assets/1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Title 2",
    text: "Other cool stuff",
    image: require("./../assets/1.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("./../assets/1.png"),
    backgroundColor: "#22bcb5",
  },
];
export default function WelcomeSlider({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  let [welcomeModal, setWelcomeModal] = useState(false);
  const [current, setCurrent] = useState("ar");
  const [lang, setlang] = useState("");

  const slides = [
    {
      key: 1,
      title: i18n.t("AllLan.slider1title"),
      image: require("./../assets/1.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: i18n.t("AllLan.slider2title"),
      image: require("./../assets/2.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 3,
      title: i18n.t("AllLan.slider3title"),
      image: require("./../assets/3.png"),
      backgroundColor: "#59b2ab",
    },
  ];

  let changeLang = async () => {
    try {
      await AsyncStorage.setItem("lang", current);
      i18n.locale = current;
      setWelcomeModal(!welcomeModal);
      setlang(current);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "ar";
        i18n.locale = chl;
        let load = await AsyncStorage.getItem("welcomeSlider");
        console.log(load);
        if (load) {
          setLoading(false);
          navigation.navigate("Auth");
        } else {
          setWelcomeModal(true);
          setLoading(false);
        }
        load = load ? true : "ar";
        i18n.locale = chl;
        setlang(chl);
      } catch (err) {}
    })();
  }, []);
  let _renderItem = ({ item }) => {
    return (
      <ImageBackground
        style={styles.backgroud}
        source={require("./../assets/bg.jpg")}
      >
        <View style={[styles.item]}>
          <Image
            source={require("./../assets/topicon.png")}
            style={styles.logo}
          />
          <Text style={styles.titlesilder}>{item.title}</Text>
          <Image style={styles.images} source={item.image} />
        </View>
      </ImageBackground>
    );
  };

  let _renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <SimpleLineIcons name="arrow-right-circle" size={30} color="white" />
        <Text style={styles.skiptext}> {i18n.t("AllLan.next")}</Text>
      </View>
    );
  };
  let _renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.skipButton}
        onPress={async () => {
          await AsyncStorage.setItem("welcomeSlider", "true");
          navigation.navigate("Auth");
        }}
      >
        <Text style={styles.skiptext}> {i18n.t("AllLan.Skip")}</Text>
      </TouchableOpacity>
    );
  };
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          // renderNextButton={_renderNextButton}
          renderDoneButton={_renderDoneButton}
          bottomButton
          dotStyle={{
            backgroundColor: "white",
          }}
          activeDotStyle={{
            backgroundColor: "#f35c5c",
          }}
          renderNextButton={_renderNextButton}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={welcomeModal}
          onRequestClose={() => {
            setModalVisible(!welcomeModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                style={styles.modalbackgroud}
                source={require("./../assets/bg.jpg")}
              >
                <View style={styles.card}>
                  <Image
                    source={require("./../assets/topicon.png")}
                    style={styles.logo}
                  />
                  <Text style={styles.title}>Select Langauge</Text>

                  <TouchableOpacity
                    style={styles.chosebutton}
                    onPress={() => setCurrent("ar")}
                  >
                    <Text style={styles.lefttext}>ع</Text>
                    <Text style={styles.language}>العربية</Text>
                    {current === "ar" && (
                      <Ionicons
                        name="checkmark-sharp"
                        size={24}
                        color="green"
                        style={styles.mark}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.chosebutton}
                    onPress={() => setCurrent("en")}
                  >
                    <Text style={styles.lefttext}>en</Text>
                    <Text style={styles.language}>English</Text>
                    {current === "en" && (
                      <Ionicons
                        name="checkmark-sharp"
                        size={24}
                        color="green"
                        style={styles.mark}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => changeLang()}
                  >
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 50,
  },
  images: {
    alignSelf: "center",
    height: 400,
    width: "100%",

    marginTop: -120,
  },
  titlesilder: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    textAlign: "center",
  },

  container: {
    flex: 1,
    height: height,
  },
  skipButton: {
    alignSelf: "center",
    backgroundColor: "black",
    width: 130,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButton: {
    alignSelf: "center",
    backgroundColor: "black",
    flexDirection: "row",
    width: 130,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  skiptext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: "center",
  },
  backgroud: {
    flex: 1,
    width: width,
    height: height,
    marginTop: 40,
  },
  modalbackgroud: {
    backgroundColor: "white",
    elevation: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 15,
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

  card: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    padding: 10,
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#f96565",
    elevation: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 30,
    borderRadius: 50,
  },
  doneText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  chosebutton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    marginVertical: 10,
    width: "80%",
    elevation: 10,
  },
  lefttext: {
    backgroundColor: "#f96565",
    color: "white",
    borderRadius: 40,
    paddingVertical: 14,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    width: 50,
  },
  language: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 8,
    marginLeft: 20,
  },
  mark: {
    marginLeft: 30,
  },
  next: {
    width: 30,
    height: 30,
  },
});
