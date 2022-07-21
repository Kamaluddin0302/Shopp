import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import SimpleHeader from "../components/SimpleHeader";
import colors from "../config/colors";
import { useSelector, useDispatch } from "react-redux";
// import { translate } from "../translations/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as COMMONJOBS from "../redux/actions/common.action";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.common?.userInfo);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [mobile, setmobile] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [housenum, sethousenum] = useState("");

  const [err, seterror] = useState("");

  //
  //
  const cart = useSelector((state) => state?.common.cart);
  const language = useSelector((state) => state.common.language);

  useEffect(() => {
    (async () => {
     
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
      } catch (err) {
        console.log("=======err=====>", err);
      }
    })();
  }, []);

  const totalPrice = React.useMemo(() => {
    let price = 0;
    for (let i = 0; i < cart?.length; i++) {
      price = price + Number(cart[i]?.price * cart[i]?.quantity);
    }
    return price;
  }, [cart]);

  const _paymentCall = () => {
    if (fname === "") {
      //
      seterror(
        `${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.firstname")}`
      );
    } else if (lname === "") {
      seterror(
        `${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.lastname")}`
      );
    } else if (mobile === "") {
      seterror(
        `${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.mobile")}`
      );
    } else if (city === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.city")}`);
    } else if (street === "") {
      seterror(
        `${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.street")}`
      );
    } else if (housenum === "") {
      seterror(
        `${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.housenum")}`
      );
    } else {
      Linking.openURL(
        `https://secure.cardcom.solutions/Interface/LowProfile.aspx?codepage=65001&Operation=1&TerminalNumber=1000&UserName=barak9611&SumToBill=${totalPrice}&CoinID=1&Language=${language}&ProductName=item1&APILevel=10&SuccessRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Success.aspx&ErrorRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Fail.aspx&IndicatorUrl=www.google.com&ReturnValue=1234&&AutoRedirect=true`
      );
    }
    // seterror
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar hidden />
      <SimpleHeader
        navigation={navigation}
        bg="primary"
        iconHeader={true}
        title={
          <View style={styles._header_title_view}>
            <Image
              source={require("./../assets/headerlogo.png")}
              style={styles._logo}
            />
            <Text>{i18n.t("AllLan.addAddress")}</Text>
          </View>
        }
        center={true}
        shadow={true}
        right={false}
        left={
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
      />
      {/* contactdetails */}
      <ScrollView>
        <View>
          <Text style={styles._title_row}>
            {i18n.t("AllLan.contactdetails")}
          </Text>
          <Text style={styles._label}>{i18n.t("AllLan.firstname")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(fname) => {
              setfname(fname);
              seterror("");
            }}
            value={fname}
          />
          <Text style={styles._label}>{i18n.t("AllLan.lastname")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(lname) => {
              setlname(lname);
              seterror("");
            }}
            value={lname}
          />

          <Text style={styles._label}>{i18n.t("AllLan.mobile")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(mobile) => {
              setmobile(mobile);
              seterror("");
            }}
            value={mobile}
            keyboardType="numeric"
          />

          <Text style={styles._title_row}>
            {i18n.t("AllLan.addressdetail")}
          </Text>

          <Text style={styles._label}>{i18n.t("AllLan.city")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(city) => {
              setcity(city);
              seterror("");
            }}
            value={city}
          />

          <Text style={styles._label}>{i18n.t("AllLan.street")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(street) => {
              setstreet(street);
              seterror("");
            }}
            value={street}
          />

          <Text style={styles._label}>{i18n.t("AllLan.housenum")}</Text>
          <TextInput
            style={styles._textInput}
            onChangeText={(housenum) => {
              sethousenum(housenum);
              seterror("");
            }}
            value={housenum}
          />
        </View>
        {err !== "" && (
          <Text
            style={{
              color: "red",
              paddingHorizontal: 20,
              fontSize: 12,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            *{err}
          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            width: "85%",
            alignSelf: "center",
            borderRadius: 12,
            marginTop: 30,
            marginBottom: 20,
          }}
          onPress={() => _paymentCall()}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              padding: 15,
              textAlign: "center",
            }}
          >
            {i18n.t("AllLan.placeOrder")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  circle: {
    width: 50,
    height: 50,
    // backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: width / 6,
    // elevation: 2,
    borderWidth: 4,
  },
  button: {
    width: "85%",
    paddingVertical: 13,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 2,
    elevation: 4,
  },
  _textInput: {
    // borderWidth: 1,
    // padding: 10,
    // borderRadius: 3,
    borderColor: "#ecdfdf",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  _logo: {
    height: 25,
    width: 130,
  },
  _header_title_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
  },
  _banner: {
    height: 140,
    width: "100%",
    borderWidth: 2,
  },
  _banner_view: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // overflow: "hidden",
  },
  _logo_circle: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  _circle: {
    alignSelf: "center",
    zIndex: 1000,
    position: "absolute",
    bottom: -40,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    // overflow: "hidden",
  },
  _name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  _list_icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  _list_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: "#e6e6e6",
    height: 75,
  },
  _list: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  _list_title: {
    fontWeight: "bold",
  },
  _title_row: {
    backgroundColor: "#eeeeee",
    padding: 20,
    fontWeight: "bold",
    fontSize: 15,
  },
  _label: {
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 10,
  },
});
