import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
  Clipboard
} from "react-native";
import colors from "../config/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IconHeader from "../components/iconHeader";

import i18n from "i18n-js";
import { en, ar } from "../translations/locals/index";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

const stores = [
  {
    name: i18n.t("AllLan.store1"),
    image: require("../assets/store1.jpeg"),
    url: "",
  },
  {
    name: i18n.t("AllLan.store2"),
    image: require("../assets/store2.jpeg"),
    url: "",
  },
  {
    name: i18n.t("AllLan.store3"),
    image: require("../assets/store3.png"),
    url: "",
  },

  {
    name: i18n.t("AllLan.store4"),
    image: require("../assets/H_M.png"),
    url: "https://www2.hm.com/tr_tr/index.html?utm_source=rakuten&utm_medium=affiliate&utm_campaign=3310876_Brandreward&utm_content=10&utm_term=DE_Network&ranMID=43149&ranEAID=pITOEqOhvpQ&ranSiteID=pITOEqOhvpQ-5IFjUV.EZrm3V1M9Sna5Cg",
  },
  {
    name: i18n.t("AllLan.store5"),
    image: require("../assets/Bershka.png"),
    url: "https://www.bershka.com/tr/?utm_source=gelirortaklari&utm_medium=affiliates&utm_campaign=TR_AlwaysOn&utm_term=27055&pfx=102b68834a940cfa4ae1ea92a57b54&utm_content=102b68834a940cfa4ae1ea92a57b54",
  },
  {
    name: i18n.t("AllLan.store6"),
    image: require("../assets/beymen.png"),
    url: "https://www.beymen.com/?utm_source=gelirortaklari&utm_medium=cpa&utm_campaign=27055&pfx=1021343d62287775c7fdf38da3e0bd&refAdvCode=digitouch",
  },

  {
    name: i18n.t("AllLan.store7"),
    image: require("../assets/lacoste-logo.png"),
    url: "https://www.lacoste.com.tr/",
  },

  {
    name: i18n.t("AllLan.store8"),
    image: require("../assets/kotonlogo.png"),
    url: "https://www.koton.com/?utm_medium=affiliate&utm_source=reklamaction&utm_campaign=32615",
  },
  {
    name: i18n.t("AllLan.store9"),
    image: require("../assets/tudors.jpg"),
    url: "https://www.tudors.com/en?utm_campaign=31106&utm_medium=reklamaction&utm_source=affiliate",
  },
  {
    name: i18n.t("AllLan.store10"),
    image: require("../assets/Stradivarius.png"),
    url: "https://www.stradivarius.com/tr/?zanpid=7636_1649949908_72fbcdab8e77be9617b7283edbe42de0&awc=7636_1649949908_72fbcdab8e77be9617b7283edbe42de0&utm_source=awin&utm_medium=affiliation&utm_content=274181",
  },
  {
    name: i18n.t("AllLan.store11"),
    image: require("../assets/sephora.png"),
    url: "https://www.sephora.com.tr/",
  },
  {
    name: i18n.t("AllLan.store12"),
    image: require("../assets/logodior.webp"),
    url: "https://tr.dior.com/en",
  },
];

export default function TurkishStore({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [lang, setlang] = useState("");

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "ar";
        i18n.locale = chl;
        setlang(chl);
      } catch (err) {}
    })();
    setLoading(false);
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <IconHeader backIcon={true} navigation={navigation} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            textAlign: "center",
            alignSelf: "center",
            paddingTop: 20,
          }}
        >
          {i18n.t("AllLan.storelist")}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles._row}>
            {stores.map((val, i) => {
              return (
                <View style={{ margin: 5 }} key={i}>
                  <TouchableOpacity
                    key={i}
                    style={styles._sotore_view}
                    onPress={async() => await Linking.openURL(val.url)}
                  >
                    <Image source={val.image} style={styles._store_pic} />
                  </TouchableOpacity>
                  <Text style={styles._store_name}>{val.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  _store_pic: {
    width: 110,
    height: 110,
    borderWidth: 2,
    resizeMode: "contain",
  },
  _row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    // justifyContent: "space-between",
  },
  _sotore_view: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#e7e7e7",
  },
  _store_name: {
    color: "#ababab",
    fontWeight: "bold",
  },
});
