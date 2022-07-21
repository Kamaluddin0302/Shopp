import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import colors from "../config/colors";
import { Restart } from "fiction-expo-restart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import { Feather, AntDesign } from "@expo/vector-icons";
import Carousel from "./Carosel";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const { width, height } = Dimensions.get("screen");

export default function Header({
  navigation,
  bg,
  shadow,
  ChangeLan,
  translation,
  filter,
  filterHandleChange,
  image,
  carosel,
}) {
  const [lan, setLan] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      (async () => {
        try {
          let lang = await AsyncStorage.getItem("lang");
          let chl = lang ? lang : "en";
          i18n.locale = chl;
          setLan(chl);
          console.log("=======chlchl=====>", chl);
        } catch (err) {
          console.log("=======err=====>", err);
        }
      })();
    });
  }, [lan]);

  const changeLan = async () => {
    await AsyncStorage.getItem("lang").then((lang) => {
      lang === "ar" ? setLan("en") : setLan("ar");
      ChangeLan(lang === "ar" ? "en" : "ar");
      setShow(!show);
    });

    // console.warn(PreValue);
    // return;
  };

  return (
    <TouchableWithoutFeedback>
      <View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: bg ? colors[bg] : colors.inActive,
              elevation: shadow ? 5 : 0,
            },
          ]}
        >
          <View style={styles.search}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
            <Text
              style={{ marginLeft: 5, color: "grey", flex: 1 }}
              onPress={() => {
                navigation.navigate("SearchProducts");
              }}
            >
              {translation.Searchbrand}
            </Text>
            {filter && (
              <Feather
                name="filter"
                size={20}
                color="black"
                onPress={() => filterHandleChange()}
              />
            )}
          </View>

          <TouchableOpacity
            style={{
              ...styles.notify,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => changeLan()}
          >
            <AntDesign
              style={{ marginRight: 10 }}
              name="arrowright"
              size={12}
              color="black"
            />
            {lan === "en" ? (
              <Image
                source={require("../assets/emirates.png")}
                style={{ height: 20, width: 20, borderRadius: 50 }}
              />
            ) : (
              // <Text style={{ fontWeight: "bold", color: "white" }}>
              <Image
                source={require("../assets/britain.png")}
                style={{ height: 20, width: 20, borderRadius: 50 }}
              />
              //   en
              // </Text>
            )}
            {/* <Text style={{ fontWeight: "bold" }}>{lan === "" ? "aa" : null}</Text> */}
          </TouchableOpacity>
        </View>
        {/* {image && <Image source={image} style={styles.banner} />} */}
        {carosel && <Carousel />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    // height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.inActive,
    justifyContent: "space-around",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  notify: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    height: 130,
    width: "94%",
    borderRadius: 20,
    marginVertical: 20,
    alignSelf: "center",
  },
});
