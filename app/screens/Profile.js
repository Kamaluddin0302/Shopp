import React, { useState, useEffect, useRef } from "react";
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
  Button,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SimpleHeader from "../components/SimpleHeader";
import colors from "../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as COMMONJOBS from "../redux/actions/common.action";
const { width, height } = Dimensions.get("screen");
import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import axios from "axios";
import WelcomePopup from "../components/welcomePopup";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Profile({ navigation, route, translation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.common?.userInfo);
  const [email, setEmail] = useState(user?.email);
  const [name, seteName] = useState("");
  const [Lang, setLang] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let [welcomeModal, setWelcomeModal] = useState(false);

  // const [lan, setLan] = useState("");

  const logOut = () => {
    Alert.alert(translation.logout, translation.AreSureLogout + "?", [
      {
        text: translation.cancel,
        onPress: () => console.log(translation.cancelPressed),
        style: "cancel",
      },
      {
        text: translation.ok,
        onPress: async () => {
          await AsyncStorage.clear();
          await dispatch(COMMONJOBS.loginAction(null));
          navigation.navigate("Auth");
        },
      },
    ]);
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  let notifications = () => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      let userId = await AsyncStorage.getItem("id");
      setLoading(true);
      if (userId) {
        getUserInfo();
        notifications();
      }
    });
  }, [navigation]);
  const getUserInfo = async () => {
    let userId = await AsyncStorage.getItem("id");

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
      alert(error?.response?.data?.message || error?.message);
    }
  };

  console.log(data, "===========>data");

  // const changeLan = async () => {
  //   const PreValue = await AsyncStorage.getItem("language");
  //   console.warn(PreValue);
  //   // return;
  //   if (PreValue === "ar") {
  //     try {
  //       await AsyncStorage.setItem("language", "en");
  //       setLan("en");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   } else {
  //     try {
  //       await AsyncStorage.setItem("language", "ar");
  //       setLan("ar");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // };

  console.log(">>>>>>>>>>>>>>>>>>>", user);

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
            {/* <Text>{translation.myAccount}</Text> */}
          </View>
        }
        center={true}
        shadow={true}
        left={false}
        right={
          <View>
            <TouchableOpacity
              onPress={logOut}
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                right: "2%",
                top: "25%",
              }}
            >
              <View>
                <MaterialIcons
                  name="logout"
                  size={25}
                  color="white"
                  style={{ alignSelf: "center" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        }
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
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
      <View style={styles._banner_view}>
        <Image
          source={require("./../assets/banner.jpg")}
          style={styles._banner}
        />
        <View style={styles._circle}>
          <Image
            source={require("./../assets/icon.png")}
            style={styles._logo_circle}
          />
        </View>
      </View>
      {/* {!data ? (
        <View style={styles.container}>
          <View style={styles.circle}>
            <MaterialCommunityIcons
              name="shield-account"
              size={width / 5}
              color={colors.secondary}
              style={{ alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              marginBottom: 10,
              color: "rgba(0,0,0,0.7)",
            }}
          >
            {translation.myAccount}
          </Text>
          <Text style={{ color: "grey", textAlign: "center", width: "85%" }}>
            {translation.PleaseLogin}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Auth");
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 16 }}>
              {translation.login}
            </Text>
          </TouchableOpacity>
        </View>
      ) : ( */}
      <View style={{ flex: 1 }}>
        <View style={{ position: "relative" }}>
          {/* <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                padding: 10,
              }}
            ></Text> */}
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
            Hi,
          </Text>
          {data && (
            <Text style={styles._name}>
              {data?.first_name + " " + data?.last_name}
            </Text>
          )}
        </View>
        {/* <View style={{ padding: 15, color: "black" }}>
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {i18n.t("AllLan.username")} :
            </Text>
            <TextInput
              style={styles._textInput}
              value={name}
              placeholder={i18n.t("AllLan.username")}
            />

            <Text style={{ fontSize: 18 }}>{user?.email?.split("@")[0]}</Text>
          </View> */}
        {/* <View style={{ padding: 15, color: "black" }}>
            <Text style={{ fontWeight: "bold" }}>
              {i18n.t("AllLan.email")} :{" "}
            </Text>
            <TextInput
              style={styles._textInput}
              value={user?.email}
              value={email}
              placeholder={i18n.t("AllLan.email")}
            />
          </View> */}
        <ScrollView>
          <TouchableOpacity
            style={styles._list}
            onPress={() => navigation.navigate("SearchProducts")}
          >
            <Image
              source={require("./../assets/search.png")}
              style={styles._list_icon}
            />
            <View style={styles._list_inner}>
              <Text style={styles._list_title}>{translation.search}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles._list}
            onPress={() => navigation.navigate("Cart")}
          >
            <Image
              source={require("./../assets/myorders.png")}
              style={styles._list_icon}
            />
            <View style={styles._list_inner}>
              <Text style={styles._list_title}>{translation.track}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles._list}
            onPress={() => navigation.navigate("Search")}
          >
            <Image
              source={require("./../assets/liked.png")}
              style={styles._list_icon}
            />
            <View style={styles._list_inner}>
              <Text style={styles._list_title}>{translation.prices}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles._list, { marginTop: 30 }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={require("./../assets/brands.png")}
              style={styles._list_icon}
            />
            <View style={[styles._list_inner]}>
              <Text style={styles._list_title}>
                {translation.profileAdderess}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles._list}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={require("./../assets/homeicon.png")}
              style={styles._list_icon}
            />
            <View style={styles._list_inner}>
              <Text style={styles._list_title}>{translation.home}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
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
      {/* )} */}
      {/* <View style={{ alignSelf: "center", width: "90%" }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", margin: "5%" }}>
          {i18n.t("AllLan.changeLanguage")}
        </Text> */}

      {/* <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            height: 50,
            width: "45%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => changeLan()}
        >
          <Text style={{ fontWeight: "bold" }}>{lan}</Text>
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    borderColor: "#ecdfdf",
    marginTop: 4,
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
    paddingTop: 30,
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
    borderRadius: 15,
  },
  _circle: {
    alignSelf: "center",
    zIndex: 1000,
    position: "absolute",
    bottom: -40,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    elevation: 20,
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
    borderColor: "#e6e6e6",
    height: 60,
  },
  _list: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  _list_title: {
    fontWeight: "bold",
    flex: 1,
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
