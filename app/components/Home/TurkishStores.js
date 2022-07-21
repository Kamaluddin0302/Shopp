import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Clipboard,
  Linking,
  Dimensions,
} from "react-native";
// import Clipboard from "expo-clipboard";

import colors from "../../config/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";
import { en, ar } from "../../translations/locals/index";
import { Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { showMessage, hideMessage } from "react-native-flash-message";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

const Tab = createMaterialTopTabNavigator();

// const stores = [
// {
//   name: "Victoria Secret",
//   image: require("../../assets/store1.jpeg"),
//   url: "https://www.victoriassecret.com.tr/",
// },
// {
//   name: "Pierre Cardin",
//   image: require("../../assets/store2.jpeg"),
//   url: "https://www.pierrecardin.com.tr/m",
// },
// {
//   name: "LC wakiki",
//   image: require("../../assets/store3.png"),
//   url: "https://www.lcwaikiki.com/tr-TR/TR",
// },
// ];
const stores = [
  {
    name: "Victoria Secret",
    image: require("../../assets/store1.jpeg"),
    url: "https://www.victoriassecret.com.tr/",
  },
  {
    name: "Pierre Cardin",
    image: require("../../assets/store2.jpeg"),
    url: "https://www.pierrecardin.com.tr/m",
  },
  {
    name: "LC wakiki",
    image: require("../../assets/store3.png"),
    url: "https://www.lcwaikiki.com/tr-TR/TR",
  },

  {
    name: i18n.t("AllLan.store4"),
    image: require("../../assets/H_M.png"),
    url: "https://www2.hm.com/tr_tr/index.html?utm_source=rakuten&utm_medium=affiliate&utm_campaign=3310876_Brandreward&utm_content=10&utm_term=DE_Network&ranMID=43149&ranEAID=pITOEqOhvpQ&ranSiteID=pITOEqOhvpQ-5IFjUV.EZrm3V1M9Sna5Cg",
  },
  {
    name: i18n.t("AllLan.store5"),
    image: require("../../assets/Bershka.png"),
    url: "https://www.bershka.com/tr/?utm_source=gelirortaklari&utm_medium=affiliates&utm_campaign=TR_AlwaysOn&utm_term=27055&pfx=102b68834a940cfa4ae1ea92a57b54&utm_content=102b68834a940cfa4ae1ea92a57b54",
  },
  {
    name: i18n.t("AllLan.store6"),
    image: require("../../assets/beymen.png"),
    url: "https://www.beymen.com/?utm_source=gelirortaklari&utm_medium=cpa&utm_campaign=27055&pfx=1021343d62287775c7fdf38da3e0bd&refAdvCode=digitouch",
  },

  {
    name: i18n.t("AllLan.store7"),
    image: require("../../assets/lacoste-logo.png"),
    url: "https://www.lacoste.com.tr/",
  },

  {
    name: i18n.t("AllLan.store8"),
    image: require("../../assets/kotonlogo.png"),
    url: "https://www.koton.com/?utm_medium=affiliate&utm_source=reklamaction&utm_campaign=32615",
  },
  {
    name: i18n.t("AllLan.store9"),
    image: require("../../assets/tudors.jpg"),
    url: "https://www.tudors.com/en?utm_campaign=31106&utm_medium=reklamaction&utm_source=affiliate",
  },
  {
    name: i18n.t("AllLan.store10"),
    image: require("../../assets/Stradivarius.png"),
    url: "https://www.stradivarius.com/tr/?zanpid=7636_1649949908_72fbcdab8e77be9617b7283edbe42de0&awc=7636_1649949908_72fbcdab8e77be9617b7283edbe42de0&utm_source=awin&utm_medium=affiliation&utm_content=274181",
  },
  {
    name: i18n.t("AllLan.store11"),
    image: require("../../assets/sephora.png"),
    url: "https://www.sephora.com.tr/",
  },
  {
    name: i18n.t("AllLan.store12"),
    image: require("../../assets/logodior.webp"),
    url: "https://tr.dior.com/en",
  },
];

export default function TurkishStores({
  navigation,
  showfilter,
  filterHandleChange,
}) {
  const [manProducts, setMenProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [lang, setlang] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [copied, setcopied] = useState(false);
  const [store, setStore] = useState("");
  const [random, setrandom] = useState("");
  const [options, setoptions] = useState([
    {
      selected: false,
    },
    {
      selected: true,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },

    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      name: i18n.t("AllLan.Electronics"),
      selected: false,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
        setlang(chl);
        let welcomepopup = await AsyncStorage.getItem("welcome");
        console.log(welcomepopup);
        !welcomepopup && setWelcomeModal(true);
        AsyncStorage.setItem("welcome", "true");
      } catch (err) {}
    })();
    setLoading(false);
  }, []);

  console.log("---showfilter---->", showfilter);

  const copyToClipboard = async (v) => {
    // console.log(v);
    Clipboard.setString(v);
    setcopied(true);
    var txt = i18n.t("AllLan.copiedtext");
    showMessage({
      backgroundColor: "black",
      message: txt,
      type: "info",
      color: "white",
    });
  };

  const checkboxHandleChange = (val, i) => {
    if (options[i].selected) {
      options[i].selected = false;
    } else {
      options[i].selected = true;
    }
    setoptions(options);
    setrandom(Math.random());
  };
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  else
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles._row,
            {
              borderBottomWidth: 0,
              justifyContent: "space-around",
              flexWrap: "wrap",
              width: "90%",
              alignSelf: "center",
            },
          ]}
        >
          {stores.map((val, i) => {
            return (
              <View
                style={{ borderWidth: 1, borderRadius: 10, marginVertical: 10 }}
                key={i}
              >
                <TouchableOpacity
                  key={i}
                  style={styles._sotore_view}
                  onPress={() => {
                    setModalVisible(true);
                    setStore(val.url);
                  }}
                >
                  <Image source={val.image} style={styles._store_pic} />
                </TouchableOpacity>
                {/* <Text style={styles._store_name}>{val.name}</Text> */}
              </View>
            );
          })}
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={!showfilter ? modalVisible : showfilter}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {!showfilter && (
                  <View style={[styles._circle, { backgroundColor: "black" }]}>
                    <MaterialIcons
                      name="add-location"
                      size={24}
                      color="white"
                    />
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#e6e6e6",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}
                >
                  <Ionicons
                    name="md-close"
                    size={24}
                    color="grey"
                    style={{ position: "absolute", right: 5 }}
                    onPress={() =>
                      !showfilter
                        ? setModalVisible(false)
                        : filterHandleChange()
                    }
                  />

                  <Text style={styles.modalText}>
                    {/* {copied
                      ? `${i18n.t("AllLan.redirectto")} ${store}`
                      : `${i18n.t("AllLan.youwillberedirected")}`} */}
                    {showfilter
                      ? "Filter"
                      : i18n.t("AllLan.youwillberedirected")}
                  </Text>
                </View>
                {!showfilter ? (
                  <View style={[{ padding: 10 }]}>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.fullname")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>Dokani Group</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Dokani Group")}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.cellphone")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>05366331269</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("05366331269")}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.country")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>Türkiye</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Türkiye")}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.cityad")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>İstanbul</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("İstanbul")}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.District")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>Eyüp</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Eyüp")}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.mohalla")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>
                        Emniyettepe mahallesi
                      </Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() =>
                            copyToClipboard("Emniyettepe mahallesi")
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.potalcode")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>34060</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("34060")}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles._td_text}>
                      {i18n.t("AllLan.Adres")}
                    </Text>
                    <View style={styles._td}>
                      <Text style={styles._detailText}>
                        {" "}
                        Emniyettepe mah meydan dönüşü sk no 24-28 d:40 eyüp
                      </Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() =>
                            copyToClipboard(
                              " Emniyettepe mah meydan dönüşü sk no 24-28 d:40 eyüp"
                            )
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        paddingVertical: 4,
                        fontWeight: "bold",
                      }}
                    >
                      {i18n.t("AllLan.copythisaddress")}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "black",
                        borderRadius: 15,
                        padding: 10,
                        width: "90%",
                        alignSelf: "center",
                      }}
                      onPress={() => Linking.openURL(store)}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        {i18n.t("AllLan.gotowebsite")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginVertical: 10 }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {i18n.t("AllLan.cancel")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles._table, { padding: 10 }]}>
                    <View
                      style={[
                        styles._row,
                        { flexWrap: "wrap", borderBottomWidth: 0 },
                      ]}
                    >
                      {/* {options.map((val, i) => {
                        return ( */}
                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 0)}
                      >
                        {options[0].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Clothing")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 1)}
                      >
                        {options[1].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Women")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 2)}
                      >
                        {options[2].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.CosmeticsMakeUp")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 3)}
                      >
                        {options[3].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Accessories")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 4)}
                      >
                        {options[4].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Footwear")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 5)}
                      >
                        {options[5].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Sport")}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 6)}
                      >
                        {options[6].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Electronics")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles._opitons_row}
                        onPress={() => checkboxHandleChange("val", 7)}
                      >
                        {options[7].selected ? (
                          <MaterialCommunityIcons
                            name="checkbox-intermediate"
                            size={20}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={20}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {i18n.t("AllLan.Electronics")}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "black",
                        borderRadius: 15,
                        padding: 10,
                        width: "90%",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                      onPress={() => filterHandleChange()}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        {i18n.t("AllLan.apply")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginVertical: 10 }}
                      onPress={() => filterHandleChange()}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {i18n.t("AllLan.cancel")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
        {/* <TouchableOpacity
          style={styles.whatsappPopup}
          onPress={() => {
            setWelcomeModal(true);
            alert("ffm");
          }}
        >
          <Image
            source={require("./../../assets/whatsapp.png")}
            style={styles._whatsappImage}
          />
        </TouchableOpacity> */}
      </ScrollView>
    );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: 10,
  },
  _store_pic: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  _row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  _sotore_view: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#e7e7e7",
    padding: 10,
  },
  _store_name: {
    color: "#ababab",
    fontWeight: "bold",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    padding: 15,
    overflow: "hidden",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    zIndex: -1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  _circle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    marginTop: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  _heading: {
    backgroundColor: "black",
  },
  _heading_text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  _row: {
    flexDirection: "row",
    // alignItems: "center",
    // padding: 4,
    borderBottomWidth: 1,
  },
  _td: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.5,
    marginVertical: 5,
    paddingVertical: 2,
  },
  _th: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    alignItems: "center",

    // justifyContent: "space-between",
  },
  _td_text: {
    fontWeight: "bold",
    color: "#c43958",
  },
  _detailText: {
    paddingBottom: 5,
    color: "gray",
    fontWeight: "bold",
  },
  _opitons_row: {
    width: "50%",
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
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
    top: windowWidth - 150,
    right: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 15,
  },
});
