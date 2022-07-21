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
  Modal,
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
import { Ionicons, Entypo } from "@expo/vector-icons";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import axios from "axios";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Profile({ route, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.common?.userInfo);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [mobile, setmobile] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [postalCode, setpostalcode] = useState("");

  const [housenum, sethousenum] = useState("");
  const [email, setemail] = useState("");

  const [err, seterror] = useState("");
  const [succssalert, setSuccssalert] = useState(false);

  const cart = useSelector((state) => state?.common.cart);
  const language = useSelector((state) => state.common.language);

  const getUserInfo = async () => {
    let userId = await AsyncStorage.getItem("id");
    try {
      const response = await axios.post(
        "http://dokaniapp.com/wp-json/wp/v2/users/details",
        {
          user_id: userId,
        }
      );
      if (response?.data) {
        console.log("RESPONSE DATA " + response?.data.data.username);
        let obj = response?.data.data;
        setfname(obj.first_name);
        setlname(obj.last_name);
        setemail(obj.user_email);
        setmobile(obj.billing_phone);
        setcity(obj.billing_city);
        setstreet(obj.billing_street);
        sethousenum(obj.billing_houseno);
        setpostalcode(obj.billing_postcode);
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };

  const updateUserInfo = async () => {
    let userId = await AsyncStorage.getItem("id");
    try {
      let params = {
        user_id: userId,
        email: email,
        firstname: fname,
        lastname: lname,
        city: city,
        street: street,
        houseno: housenum,
        phonenumber: mobile,
        zipcode: postalCode,
      };
      const response = await axios.post(
        "http://dokaniapp.com/wp-json/wp/v2/users/editdetails",
        params
      );
      if (response?.data) {
        setSuccssalert(!succssalert);
        route.params.onGoBack();

        // Alert.alert(response?.data?.message);

        // Alert.alert(response?.data?.message, "", [
        //   { text: "OK", onPress: () => navigation.navigate("AppNav") },
        // ]);
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
        getUserInfo();
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
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.firstname")}`);
    } else if (lname === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.lastname")}`);
    } else if (mobile === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.mobile")}`);
    } else if (city === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.city")}`);
    } else if (street === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.street")}`);
    } else if (housenum === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.housenum")}`);
    } else if (postalCode === "") {
      seterror(`${i18n.t("AllLan.enteryour")} ${i18n.t("AllLan.postalCode")}`);
    } else {
      updateUserInfo();
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
            <Text>{i18n.t("AllLan.editAddress")}</Text>
          </View>
        }
        center={true}
        shadow={true}
        right={false}
        left={
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      {/* contactdetails */}

      <ScrollView>
        <View style={styles.betterHalf} />
        <View>
          <View style={styles.card}>
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
              placeholder={i18n.t("AllLan.firstname")}
              value={fname}
            />

            <Text style={styles._label}>{i18n.t("AllLan.lastname")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(lname) => {
                setlname(lname);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.lastname")}
              value={lname}
            />

            <Text style={styles._label}>{i18n.t("AllLan.mobile")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(mobile) => {
                setmobile(mobile);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.mobile")}
              value={mobile}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.card}>
            <Text style={styles._title_row}>
              {i18n.t("AllLan.addressdetail")}
            </Text>

            <Text style={styles._label}>{i18n.t("AllLan.housenumber")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(housenum) => {
                sethousenum(housenum);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.housenumber")}
              value={housenum}
            />

            <Text style={styles._label}>{i18n.t("AllLan.street")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(street) => {
                setstreet(street);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.street")}
              value={street}
            />

            <Text style={styles._label}>{i18n.t("AllLan.city")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(city) => {
                setcity(city);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.city")}
              value={city}
            />

            <Text style={styles._label}>{i18n.t("AllLan.postalCode")}</Text>
            <TextInput
              style={styles._textInput}
              onChangeText={(street) => {
                setpostalcode(street);
                seterror("");
              }}
              placeholder={i18n.t("AllLan.postalCode")}
              value={postalCode}
            />
          </View>
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
            backgroundColor: "#af3e53",
            width: "55%",
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
            {i18n.t("AllLan.submit")}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={succssalert}
        onRequestClose={() => {
          setModalVisible(!succssalert);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Address Updated Successfully</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles._button}
                onPress={() => {
                  setSuccssalert(!succssalert);
                  navigation.navigate("AppNav");
                }}
              >
                <Text
                  style={[
                    styles.title,
                    { color: "green", marginRight: 0, fontSize: 17 },
                  ]}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  betterHalf: {
    width: "100%",
    height: "35%",
    backgroundColor: colors.secondary,
    position: "absolute",
    alignItems: "center",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
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
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 15,
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
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
    backgroundColor: "black",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "white",
    width: "55%",
    alignSelf: "center",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: -40,
    elevation: 15,
    fontStyle: "italic",
  },
  _label: {
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 10,
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 20,
    elevation: 35,
    borderRadius: 40,
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    padding: 20,
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "green",
  },
  buttonView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  _button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 120,
    padding: 7,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 15,
    marginVertical: 20,
  },
});
