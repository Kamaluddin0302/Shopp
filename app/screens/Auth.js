import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import Checkbox from "../components/Form/Checkbox";
import GenderButton from "../components/Form/GenderButton";
import Input from "../components/Form/Input";
import SocialButton from "../components/Form/SocialButton";
import Submit from "../components/Form/Submit";
import colors from "../config/colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as COMMONJOBS from "../redux/actions/common.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

export default function Auth({ navigation }) {
  const [state, setState] = useState({
    sld_url: "",
    geojson_url: "",
  });

  const [reg, setReg] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState("");
  const [lan, setLan] = useState("");
  let [Lang, setLang] = useState(true);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "ar";
        i18n.locale = chl;

        let user = await AsyncStorage.getItem("email");
        console.log(">>>>>useruser>>>>", user);
        if (user) {
          navigation.navigate("AppNav");
        }
      } catch (err) {
        console.log("=======err=====>", err);
      }
    })();
  }, []);

  const ChangeLan = async () => {
    const PreValue = await AsyncStorage.getItem("lang");
    if (PreValue === "ar") {
      try {
        await AsyncStorage.setItem("lang", "en");
        i18n.locale = "en";
        // navigation.navigate("Search");
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await AsyncStorage.setItem("lang", "ar");
        // Restart();
        i18n.locale = "ar";
        // navigation.navigate("Search");
      } catch (error) {
        alert(error);
      }
    }
    setLang(!Lang);
  };
  const changeLan = async () => {
    await AsyncStorage.getItem("lang").then((lang) => {
      lang === "ar" ? setLan("en") : setLan("ar");
      ChangeLan();
    });

    // console.warn(PreValue);
    // return;
  };
  const onPress = () => {
    setReg(!reg);
    Animated.timing(animatedValue, {
      toValue: !reg ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  colors;

  const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);

    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const loginHandler = async () => {
      setLoading(true);
      if (validateEmail(email) && password.length > 0) {
        try {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("password", password);
          const response = await axios.post(
            "http://dokaniapp.com/wp-json/wp/v2/users/login",
            formData
          );

          console.log(response.data);
          if (response.data.status) {
            await AsyncStorage.setItem("email", response.data.data.email);
            await AsyncStorage.setItem("id", response.data.data.user_id + "");
            dispatch(
              COMMONJOBS.loginAction({
                email: response.data.data.email,
                id: response.data.data.user_id,
              })
            );
            // navigation.goBack();
            navigation.navigate("AppNav");
          } else {
            setErr(response.data.message);
            setModalVisible(true);
          }
        } catch (error) {
          console.log(i18n.t("AllLan.hereItIs"));
          setErr(error.data.message);
          setModalVisible(true);
        }
        setLoading(false);
      } else {
        setErr(i18n.t("AllLan.InvalidInputs"));
        setModalVisible(true);
      }
    };
    if (isLoading)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
            position: "absolute",
            left: 140,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    else
      return (
        <Animated.View
          style={{
            transform: [
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              // elevation: 10,
              borderRadius: 25,
              padding: 20,
              backgroundColor: colors.primary,
              paddingTop: 100,
            }}
          >
            <Input
              placeholder={i18n.t("AllLan.email")}
              keyboardType="email-address"
              autoCorrect={false}
              specificStyles={{ marginBottom: 20 }}
              onChangeText={(t) => setEmail(t)}
              value={email}
            />
            <Input
              placeholder={i18n.t("AllLan.password")}
              secureTextEntry={hide}
              // value={"password"}
              autoCorrect={false}
              iconName={hide ? "eye-off" : "eye"}
              onPress={() => setHide(!hide)}
              onChangeText={(t) => setPassword(t)}
            />
            <TouchableOpacity
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=${i18n.t(
                    "AllLan.forgetPassword"
                  )}&phone=971 58307 9163`
                )
              }
            >
              <Text style={{ color: colors.secondary }}>
                {i18n.t("AllLan.forgetPassword")}?
              </Text>
            </TouchableOpacity>
            <Submit title="Login" onPress={loginHandler} />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {i18n.t("AllLan.areYouMember")}?
              </Text>
              <TouchableOpacity style={{ marginLeft: 5 }} onPress={onPress}>
                <Text style={{ color: colors.secondary, fontWeight: "bold" }}>
                  {i18n.t("AllLan.signUp")}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <Text> {i18n.t("AllLan.language")}</Text>
              <AntDesign
                style={{ marginRight: 10 }}
                name="arrowright"
                size={12}
                color="black"
              />
              <TouchableOpacity
                style={{
                  ...styles.notify,
                }}
                onPress={() => changeLan()}
              >
                {lan === "en" ? (
                  <Image
                    source={require("../assets/emirates.png")}
                    style={{
                      height: 25,
                      width: 25,
                      borderRadius: 30,
                    }}
                  />
                ) : (
                  // <Text style={{ fontWeight: "bold", color: "white" }}>
                  //   en
                  <Image
                    source={require("../assets/britain.png")}
                    style={{
                      height: 25,
                      width: 25,
                      borderRadius: 30,
                    }}
                  />
                  // </Text>
                )}
                {/* <Text style={{ fontWeight: "bold" }}>{lan === "" ? "aa" : null}</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      );
  };

  const Signup = ({ props, navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [cpassword, setcpassword] = useState("");
    const [city, setaddress] = useState("");
    const [lastname, setlname] = useState("");
    const [firstname, setfname] = useState("");
    const [phonenumber, setphone] = useState("");
    const [street, setstreet] = useState("");
    const [houseno, sethouse] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [hide, setHide] = useState(true);

    let [Lang, setLang] = useState(true);
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const signUpHandler = async () => {
      if (firstname === "") {
        setErr(i18n.t("AllLan.enterfirstname"));
        setModalVisible(true);
      } else if (lastname === "") {
        setErr(i18n.t("AllLan.enterlastname"));
        setModalVisible(true);
      } else if (city === "") {
        setErr(i18n.t("AllLan.enteraddress"));
        setModalVisible(true);
      } else if (phonenumber === "") {
        setErr(i18n.t("AllLan.enterphone"));
        setModalVisible(true);
      } else if (street === "") {
        setErr(i18n.t("AllLan.enterstreet"));
        setModalVisible(true);
      } else if (houseno === "") {
        setErr(i18n.t("AllLan.enterhouse"));
        setModalVisible(true);
      } else if (zipcode === "") {
        setErr(i18n.t("AllLan.enterzipcode"));
        setModalVisible(true);
      } else if (cpassword === "") {
        setErr(i18n.t("AllLan.enterconfirmedPass"));
        setModalVisible(true);
      } else if (password !== cpassword) {
        setErr(i18n.t("AllLan.passwordMatch"));
        setModalVisible(true);
        ss;
      } else {
        if (validateEmail(email) && password?.length >= 8) {
          setLoading(true);
          try {
            const response = await axios.post(
              "http://dokaniapp.com/wp-json/wp/v2/users/register",
              {
                username: email.split("@")[0],
                email,
                password,
                firstname,
                lastname,
                city,
                street,
                houseno,
                phonenumber,
                zipcode,
              }
            );
            if (response?.data) {
              console.log("VVVKFKFKF", response?.data);

              setErr("User Registered Successfully");
              setModalVisible(true);
              setEmail("");
              setPassword("");
              /// navigation.navigate("AppNav");
            }
          } catch (error) {
            setErr(error?.response?.data?.message || error?.message);
            setModalVisible(true);
          }
          setLoading(false);
        } else {
          setErr(i18n.t("AllLan.enterValidPassEmail"));
          setModalVisible(true);
        }
      }
    };

    if (isLoading)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    else
      return (
        <Animated.View
          style={{
            elevation: 20,
            backgroundColor: "white",
            borderRadius: 25,
            transform: [
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
            ],
          }}
        >
          <ScrollView>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            > */}
            {/* <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {i18n.t("AllLan.signuptitle")}
              </Text> */}
            {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Text style={{ marginRight: 10 }}>
                  {" "}
                  {i18n.t("AllLan.language")}
                </Text>
                <TouchableOpacity
                  style={{
                    ...styles.notify,
                    backgroundColor: "grey",
                    borderRadius: 5,
                    paddingHorizontal: 5,
                  }}
                  onPress={() => changeLan()}
                >
                  {lan === "en" ? (
                    <Image
                      source={require("../assets/emirates.png")}
                      style={{ height: 30, width: 30 }}
                    />
                  ) : ( 
                     <Text style={{ fontWeight: "bold", color: "white" }}>
                    <Image
                    
                    //   source={require("../assets/britain.png")}
                    //   style={{ height: 30, width: 30 }}
                    // />
                    //   en
                    // </Text>
                  // )}
                  */}
            {/* <Text style={{ fontWeight: "bold" }}>{lan === "" ? "aa" : null}</Text> */}
            {/* </TouchableOpacity>
              </View> */}
            {/* </View> */}
            <View
              style={{
                borderRadius: 25,
                padding: 20,
                paddingHorizontal: 20,
                backgroundColor: colors.primary,
                paddingTop: 80,
                elevation: 20,
              }}
            >
              <Input
                placeholder={i18n.t("AllLan.fname")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setfname(t)}
                value={firstname}
              />

              <Input
                placeholder={i18n.t("AllLan.lname")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setlname(t)}
                value={lastname}
              />

              <Input
                placeholder={i18n.t("AllLan.addaddress")}
                keyboardType="email-address"
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setaddress(t)}
                value={city}
              />

              <Input
                placeholder={i18n.t("AllLan.addphone")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setphone(t)}
                value={phonenumber}
                keyboardType="numeric"
              />

              <Input
                placeholder={i18n.t("AllLan.addstreet")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setstreet(t)}
                value={street}
              />

              <Input
                placeholder={i18n.t("AllLan.addhouse")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => sethouse(t)}
                value={houseno}
              />

              <Input
                placeholder={i18n.t("AllLan.addzipcode")}
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setzipcode(t)}
                value={zipcode}
              />

              {/*  */}

              {/*  */}

              <Input
                placeholder={i18n.t("AllLan.email")}
                keyboardType="email-address"
                autoCorrect={false}
                specificStyles={{ marginBottom: 10 }}
                onChangeText={(t) => setEmail(t)}
                value={email}
              />
              <Input
                placeholder={i18n.t("AllLan.password")}
                secureTextEntry={hide}
                autoCorrect={false}
                iconName={hide ? "eye-off" : "eye"}
                onPress={() => setHide(!hide)}
                onChangeText={(t) => setPassword(t)}
                value={password}
              />
              <Input
                placeholder={i18n.t("AllLan.password")}
                secureTextEntry={hide}
                autoCorrect={false}
                // iconName={hide ? "eye-off" : "eye"}
                onPress={() => setHide(!hide)}
                onChangeText={(t) => setcpassword(t)}
                value={cpassword}
              />
              <Text
                style={{
                  color: "rgba(0,0,0,0.6)",
                  marginTop: 5,
                  width: "100%",
                  marginBottom: 15,
                }}
              >
                {i18n.t("AllLan.yourPassMustCont")}
              </Text>

              {/* <View>
              <View
                style={{
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  updates={updates}
                  onPress={() => {
                    setUpdates(!updates);
                  }}
                />
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {i18n.t("AllLan.iWantToRec")}
                </Text>
              </View>
            </View> */}
              <Submit title={i18n.t("AllLan.signUp")} onPress={signUpHandler} />
              <Text style={{ color: "rgba(0,0,0,0.6)", marginBottom: 10 }}>
                {i18n.t("AllLan.byClickingSignUp")}{" "}
                <TouchableWithoutFeedback>
                  <Text
                    style={{
                      color: colors.secondary,
                      textDecorationLine: "underline",
                    }}
                  >
                    {i18n.t("AllLan.termsofMember")}
                  </Text>
                </TouchableWithoutFeedback>{" "}
                {i18n.t("AllLan.and")}{" "}
                <TouchableWithoutFeedback>
                  <Text
                    style={{
                      color: colors.secondary,
                      textDecorationLine: "underline",
                    }}
                  >
                    {i18n.t("AllLan.protectionPersonal")}
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginBottom: 50,
                }}
              >
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {i18n.t("AllLan.areAlreadyMemb")}
                </Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={onPress}>
                  <Text style={{ fontWeight: "bold" }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.betterHalf} />
      {/* {reg && (
        <TouchableOpacity
          style={{ marginLeft: 20, marginTop: 20 }}
          onPress={() => setReg(false)}
        >
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
      )} */}

      {reg && (
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          style={{
            paddingTop: 20,
            paddingLeft: 20,
          }}
          onPress={() => setReg(!reg)}
        />
      )}
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <View style={styles.logoview}>
          <Image style={styles.logo} source={require("../assets/icon.png")} />
        </View>
        <Animated.View
          style={[
            styles.wrapper,
            {
              transform: [
                {
                  rotateY: animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["0deg", "90deg", "180deg"],
                  }),
                },
              ],
              marginTop: height / 2 - (width / 1.1 / 2 + 140),
            },
          ]}
        >
          {!reg ? <Login /> : <Signup />}
        </Animated.View>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(i18n.t("AllLan.ModalClosed"));
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                  paddingBottom: 5,
                }}
              >
                {err}
              </Text>
              {/* <Text style={styles.modalText}>{err}</Text> */}

              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);

                  setErr("");

                  if (err == "User Registered Successfully") {
                    setReg(!reg);
                  }
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {i18n.t("AllLan.okay")}
                </Text>
                {/* <AntDesign name="closecircle" size={15} color="red" /> */}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  betterHalf: {
    width: "100%",
    height: "60%",
    backgroundColor: colors.secondary,
    position: "absolute",
    alignItems: "center",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  logoview: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    // borderWidth: 1,
    // borderColor: "white",
    borderRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    padding: 2,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "gray",
    shadowOpacity: 1.0,
  },
  wrapper: {
    width: width / 1.15,
    backgroundColor: "white",
    marginTop: height / 2 - (width / 1.1 / 2 + 140),
    borderRadius: 25,
    elevation: 10,
    marginBottom: 10,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "gray",
    shadowOpacity: 1.0,
  },
  link: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  socialWrapper: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  openButton: {
    borderRadius: 5,
    // elevation: 1,
    // position: "absolute",
    right: 0,
    margin: 10,
    // width: 50,
    backgroundColor: "green",
    padding: 4,
    width: 60,
    // padding:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
