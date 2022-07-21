import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  Clipboard,
  Modal,
} from "react-native";
import colors from "../../config/colors";
import Brands from "./Brands";
import Carousel from "./Carousel";
import HighlightedProduct from "./HighlightedProduct";
import Products from "./Products";
// import { i18n.t } from "../../translations/i18n";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "i18n-js";
import { en, ar } from "../../translations/locals/index";
import { showMessage, hideMessage } from "react-native-flash-message";

import { MaterialIcons } from "@expo/vector-icons";
i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const carouselList = [
  {
    id: 1,
    image: require("../../assets/banner1.jpg"),
  },
  {
    id: 2,
    image: require("../../assets/banner2.jpg"),
  },
  {
    id: 3,
    image: require("../../assets/banner3.jpg"),
  },
  {
    id: 4,
    image: require("../../assets/banner4.jpg"),
  },
  {
    id: 5,
    image: require("../../assets/banner5.jpg"),
  },
  {
    id: 6,
    image: require("../../assets/banner6.jpg"),
  },
];

const productList = [
  {
    id: 1,
    image: [
      { id: 1, source: require("../../assets/pro1.jpg") },
      { id: 2, source: require("../../assets/pro1.1.jpg") },
      { id: 3, source: require("../../assets/pro1.2.jpg") },
    ],
    brand: "Casio",
    detail: "Smart Watch",
    price: "200$",
  },
  {
    id: 2,
    image: [{ id: 1, source: require("../../assets/pro2.jpg") }],
    brand: "Nike",
    detail: "Elemental bagpack",
    price: "149.5$",
  },
  {
    id: 3,
    image: [{ id: 1, source: require("../../assets/pro3.jpg") }],
    brand: "Nike",
    detail: "Star Runner 2",
    price: "180$",
  },
];

const brands = [
  {
    id: 1,
    image: require("../../assets/nike.png"),
  },
  {
    id: 2,
    image: require("../../assets/casio.png"),
  },
  {
    id: 3,
    image: require("../../assets/adidas.png"),
  },
  {
    id: 4,
    image: require("../../assets/zara.png"),
  },
  {
    id: 5,
    image: require("../../assets/gucci.png"),
  },
];

export default function DokaniStores({ navigation }) {
  const [manProducts, setMenProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getMensData();
    getUserInfo();
    // (async () => {
    //   try {
    //     let lang = await AsyncStorage.getItem("lang");
    //     let chl = lang ? lang : "en";
    //     i18n.locale = chl;
    //   } catch (err) {
    //     console.log("=======err=====>", err);
    //   }
    // })();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    (async () => getUserInfo())();
  }, []);

  const getUserInfo = async () => {
    let userId = await AsyncStorage.getItem("id");
    setLoading(true);

    console.log("USER ID " + userId);
    try {
      const response = await axios.post(
        "https://dokaniapp.com/wp-json/wp/v2/users/details",
        {
          user_id: userId,
        }
      );
      if (response?.data) {
        console.log("RESPONSE DATA " + response?.data.data.username);
        setLoading(false);
        setData(response?.data.data);

        //     setData(response?.data.data)
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };

  const copyToClipboard = async (v) => {
    // console.log(v);
    Clipboard.setString(v);
    var txt = i18n.t("AllLan.copiedtext");
    showMessage({
      backgroundColor: "black",
      message: txt,
      type: "info",
      color: "white",
    });
  };

  const getMensData = async () => {
    // setLoading(true);
    // try {
    //   const response = await axios.get("wp-json/wc/v3/products?category=48");
    //   if (response?.data) {
    //     setMenProducts(response?.data);
    //   }
    //   const vendorsList = await axios.get("wp-json/wcfmmp/v1/store-vendors");
    //   if (vendorsList?.data) {
    //     setVendors(vendorsList?.data);
    //   }
    // } catch (error) {
    //   alert(error?.message);
    // }
    setLoading(false);
  };

  // if (isLoading)
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={colors.secondary} />
  //     </View>
  //   );
  // else
  return (
    <View
      style={{
        flex: 1,
        // paddingBottom: 40,
        padding: 10,
        backgroundColor: "white",
        elevation: 20,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles._heading}>
          {/* trukishaddress */}
          <Text style={styles._heading_text}>
            {i18n.t("AllLan.trukishaddress")}
          </Text>
        </View>
        <Text style={styles._td_text}>{i18n.t("AllLan.fullname")}</Text>
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

        <Text style={styles._td_text}>{i18n.t("AllLan.cellphone")}</Text>
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
        <Text style={styles._td_text}>{i18n.t("AllLan.country")}</Text>
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
        <Text style={styles._td_text}>{i18n.t("AllLan.cityad")}</Text>
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
        <Text style={styles._td_text}>{i18n.t("AllLan.District")}</Text>
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
        <Text style={styles._td_text}>{i18n.t("AllLan.mohalla")}</Text>
        <View style={styles._td}>
          <Text style={styles._detailText}>Emniyettepe mahallesi</Text>
          <TouchableOpacity>
            <MaterialIcons
              name="content-copy"
              size={24}
              color="#c43958"
              onPress={() => copyToClipboard("Emniyettepe mahallesi")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles._td_text}>{i18n.t("AllLan.potalcode")}</Text>
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
        <Text style={styles._td_text}>{i18n.t("AllLan.Adres")}</Text>
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

        {/* <View style={styles._table}>
          <View style={styles._row}>
            <View style={styles._th}>
              <Image
                source={require("./../../assets/user.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.fullname")}</Text>
            </View>
            <View style={styles._td}>
              <Text>Ali Rab</Text>
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
                source={require("./../../assets/callphone.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.cellphone")}</Text>
            </View>
            <View style={styles._td}>
              <Text>5337211761</Text>
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
                source={require("./../../assets/location.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.country")}</Text>
            </View>
            <View style={styles._td}>
              <Text>Turkey</Text>
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
                source={require("./../../assets/home.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.cityad")}</Text>
            </View>
            <View style={styles._td}>
              <Text>Istanbul</Text>
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
                source={require("./../../assets/home.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.District")}</Text>
            </View>
            <View style={styles._td}>
              <Text>Atasehir</Text>
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
                source={require("./../../assets/home.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              /> */}
        {/*  */}
        {/* <Text style={styles._td_text}>{i18n.t("AllLan.mohalla")}</Text>
            </View>
            <View style={styles._td}>
              <Text>icerenkoy</Text>
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
                source={require("./../../assets/mailbox.png")}
                style={{ height: 20, width: 20 }}
              /> */}
        {/*  */}
        {/* <Text style={styles._td_text}>{i18n.t("AllLan.potalcode")}</Text>
            </View>
            <View style={styles._td}>
              <Text>34888</Text>
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
                source={require("./../../assets/address.png")}
                style={{ height: 20, width: 20 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.Adres")}</Text>
            </View>
            <View style={styles._td}>
              <Text style={{ flex: 1 }}>
                TROY NO. 549830531, ferhatpasa mah. masresal fevzi cakmak cad.
                no: 62 floor:5
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
        </View> */}
        <View style={styles._heading}>
          <Text style={styles._heading_text}>{i18n.t("AllLan.mydetails")}</Text>

          <View style={styles._edit_address_bg}>
            <TouchableOpacity
              onPress={() => {
                try {
                  navigation.navigate("EditAddress", {
                    onGoBack: () => getUserInfo(),
                  });
                } catch (e) {}
              }}
            >
              <Text style={styles._edit_addres_txt}>
                {i18n.t("AllLan.editAddress")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles._td_text}>{i18n.t("AllLan.fullnamedetails")}</Text>
        <View style={styles._td}>
          <Text style={styles._detailText}>
            {data.first_name + " " + data.last_name}
          </Text>
        </View>
        <Text style={styles._td_text}>{i18n.t("AllLan.email")}</Text>
        <View style={styles._td}>
          <Text style={styles._detailText}>{data.user_email}</Text>
        </View>
        <Text style={styles._td_text}> {i18n.t("AllLan.bilingaddress")}</Text>
        <View style={styles._td}>
          <Text style={styles._detailText}>
            {data.billing_houseno +
              " " +
              data.billing_street +
              " " +
              data.billing_city +
              " " +
              data.billing_postcode}
          </Text>
        </View>
        <Text style={styles._td_text}>{i18n.t("AllLan.phone")}</Text>
        <View style={styles._td}>
          <Text style={styles._detailText}>{data.billing_phone}</Text>
        </View>
        {/* <View style={styles._table}>
          <View style={styles._row}>
            <View style={styles._th}>
              <Image
                source={require("./../../assets/user.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>
                {i18n.t("AllLan.fullnamedetails")}
              </Text>
            </View>
            <View style={styles._td}>
              <Text>{data.first_name + " " + data.last_name}</Text>
            </View>
          </View>
          <View style={styles._row}>
            <View style={styles._th}>
              <MaterialIcons
                name="email"
                size={15}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.email")}</Text>
            </View>
            <View style={styles._td}>
              <Text>{data.user_email}</Text>
            </View>
          </View>

          <View style={styles._row}>
            <View style={styles._th}>
              <Image
                source={require("./../../assets/home.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>
                {i18n.t("AllLan.bilingaddress")}
              </Text>
            </View>
            <View style={styles._td}>
              <Text>
                {data.billing_houseno +
                  " " +
                  data.billing_street +
                  " " +
                  data.billing_city +
                  " " +
                  data.billing_postcode}
              </Text>
            </View>
          </View>

          <View style={styles._row}>
            <View style={styles._th}>
              <Image
                source={require("./../../assets/callphone.png")}
                style={{ height: 15, width: 15, marginRight: 5 }}
              />
              <Text style={styles._td_text}>{i18n.t("AllLan.phone")}</Text>
            </View>
            <View style={styles._td}>
              <Text>{data.billing_phone}</Text>
            </View>
          </View>
        </View> */}
        {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> */}
        {/* <Carousel carouselList={carouselList} /> */}
        {/* <Text style={{ marginHorizontal: 20, fontSize: 17 }}>
          {i18n.t("AllLan.SpecialProducts")}
        </Text> */}
        {/* <Products productList={manProducts} navigation={navigation} /> */}
        {/* <HighlightedProduct image={require("../../assets/banner4.jpg")} /> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 17 }}>
            {" "}
            {i18n.t("AllLan.SpecialBrands")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Brands")}
            style={{
              backgroundColor: "lightgrey",
              width: 90,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
          >
            <Text style={{ fontSize: 14 }}> {i18n.t("AllLan.seeMore")}</Text>
          </TouchableOpacity>
        </View> */}
        {/* <Brands brands={vendors} /> */}
        {/* <HighlightedProduct image={require("../../assets/banner5.jpg")} /> */}
        {/* <HighlightedProduct image={require("../../assets/banner6.jpg")} /> */}

        {/* <Text style={{ color: "grey", fontWeight: "bold" }}>
          {translation.commingsoon}
        </Text> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  _heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  _edit_address_bg: {
    // position: "absolute",
    // alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  _edit_addres_txt: {
    color: "black",
    fontSize: 12,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  _heading_text: {
    color: "black",
    fontWeight: "bold",
    padding: 6,
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
    flex: 1,
  },
  _detailText: {
    paddingBottom: 5,
    color: "gray",
    fontWeight: "bold",
  },
});
