import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Clipboard,
} from "react-native";
import colors from "../config/colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import Products from "../components/Home/Products";
import axios from "axios";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const keywords = [
  {
    id: 1,
    keyword: "polo",
  },
  {
    id: 2,
    keyword: "denim",
  },
  {
    id: 3,
    keyword: "zara men",
  },
  {
    id: 4,
    keyword: "nike",
  },
  {
    id: 5,
    keyword: "addidas",
  },
];

const { width, height } = Dimensions.get("screen");

export default function SearchProducts({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [lan, setlan] = useState("en");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [store, setStore] = useState("");
  const [data, setdata] = useState([]);
  const [copied, setcopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
      } catch (err) {
        console.log("================>", err);
      }
    })();
  }, []);

  const stores = [
    {
      name: "Victoria Secret",
      image: require("../assets/store1.jpeg"),
      url: "https://www.victoriassecret.com.tr/",
    },
    {
      name: "Pierre Cardin",
      image: require("../assets/store2.jpeg"),
      url: "https://www.pierrecardin.com.tr/m",
    },
    {
      name: "LC wakiki",
      image: require("../assets/store3.png"),
      url: "https://www.lcwaikiki.com/tr-TR/TR",
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
  const filtered = stores.filter((users) => {
    console.log(typeof Year);
    return users.name.toLowerCase().includes(search.toLowerCase());
  });

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
  const getSearchResult = async (txt) => {
    setLoading(true);
    try {
      const response = await axios.get(`wp-json/wc/v3/products/?search=${txt}`);
      if (response?.data) {
        setSearchResult(response?.data);
      }
    } catch (error) {
      alert(error?.message);
    }
    setLoading(false);
  };
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.searchHeader}>
          <TouchableHighlight
            underlayColor={colors.inActive}
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={25}
              color="black"
            />
          </TouchableHighlight>
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t("AllLan.Searchbrand")}
            keyboardType="default"
            value={search}
            onSubmitEditing={(txt) => getSearchResult(search)}
            onChangeText={(txt) => {
              setSearch(txt);
            }}
          />
        </View>
        {/* <Text style={{ margin: 15, fontSize: 17 }}>
          {i18n.t("AllLan.popularSearches")}
        </Text> */}
        {/* <View style={styles.keywordsWrapper}>
          <FlatList
            data={keywords}
            style={{ marginHorizontal: 10 }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ width: 10, height: "100%" }} />
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => getSearchResult(item?.keyword)}
                >
                  <View style={styles.keyword}>
                    <MaterialCommunityIcons
                      name="magnify"
                      size={15}
                      color="grey"
                    />
                    <Text style={{ marginLeft: 5 }}>{item.keyword}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View> */}

        <View
          style={[
            styles._row,
            {
              borderBottomWidth: 0,
              flexWrap: "wrap",
              alignSelf: "center",
              alignContent: "center",
              width: "80%",
              justifyContent:"space-around"

            },
          ]}
        >
          {filtered.map((val, i) => {
            return (
              <View style={{ margin: 5 }} key={i}>
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
                <Text style={styles._store_name}>{val.name}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={[styles._circle, { backgroundColor: "black" }]}>
                  <MaterialIcons name="add-location" size={24} color="white" />
                </View>

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
                    onPress={() => setModalVisible(false)}
                  />

                  <Text style={styles.modalText}>
                    {/* {copied
                      ? `${i18n.t("AllLan.redirectto")} ${store}`
                      : `${i18n.t("AllLan.youwillberedirected")}`} */}
                    {i18n.t("AllLan.youwillberedirected")}
                  </Text>
                </View>
                <View style={[styles._table, { padding: 10 }]}>
                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/user.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.fullname")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>Ali Rab</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Ali Rab")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/callphone.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.cellphone")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>5337211761</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("5337211761")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/location.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.country")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>Turkey</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Turkey")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/home.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.cityad")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>Istanbul</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Istanbul")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/home.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.District")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>Atasehir</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("Atasehir")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/home.png")}
                        style={{ height: 15, width: 15, marginRight: 5 }}
                      />
                      {/*  */}
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.mohalla")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>icerenkoy</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("icerenkoy")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/mailbox.png")}
                        style={{ height: 20, width: 20 }}
                      />
                      {/*  */}
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.potalcode")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ fontSize: 12 }}>34888</Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() => copyToClipboard("34888")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles._row}>
                    <View style={styles._th}>
                      <Image
                        source={require("./../assets/address.png")}
                        style={{ height: 20, width: 20 }}
                      />
                      <Text style={styles._td_text}>
                        {i18n.t("AllLan.Adres")}
                      </Text>
                    </View>
                    <View style={styles._td}>
                      <Text style={{ flex: 1, fontSize: 12 }}>
                        TROY NO. 549830531, ferhatpasa mah. masresal fevzi
                        cakmak cad. no: 62 floor:5
                      </Text>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="content-copy"
                          size={24}
                          color="#c43958"
                          onPress={() =>
                            copyToClipboard(
                              " TROY NO. 549830531, ferhatpasa mah. masresal fevzi cakmak cad. no: 62 floor:5"
                            )
                          }
                        />
                      </TouchableOpacity>
                    </View>
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
              </View>
            </View>
          </Modal>
        </View>

        {/* {searchResult?.length === 0 ? (
          <View
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>
              {i18n.t("AllLan.noItemFound")}!
            </Text>
          </View>
        ) : (
          <Products
            productList={searchResult}
            navigation={navigation}
            isVertical={true}
          />
        )} */}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  searchHeader: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    paddingTop: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: width - 70,
    height: 60,
    backgroundColor: colors.primary,
  },
  keywordsWrapper: {
    height: 80,
    width: "100%",
  },
  keyword: {
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-around",
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
  },
  _sotore_view: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#e7e7e7",
    elevation: 1,
    backgroundColor: "white",
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
    flex: 2,
    justifyContent: "space-between",
    borderLeftWidth: 1,
    padding: 5,
    alignItems: "center",
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
    flex: 1,
    fontSize: 12,
  },
});
