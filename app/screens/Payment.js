
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
import axios from "axios";
import { WebView } from 'react-native-webview';

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Payment({ route,navigation }) {
  const dispatch = useDispatch();

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
            onPress={() => {
                navigation.goBack()
          //   // console.log("PAYMENT URL"+route.params.payment_url);
             route.params.onGoBack();

            }}
          />
        }
      />
      {/* contactdetails */}
      <WebView 
        useWebKit={true}
        onMessage={(event)=> console.log("VFKFKFK"+event.nativeEvent.data)}
       style={styles.container}
      source={{ uri: route.params.payment_url }}
    />
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
