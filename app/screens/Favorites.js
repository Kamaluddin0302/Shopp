import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import SimpleHeader from "../components/SimpleHeader";
import colors from "../config/colors";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Favorites({ navigation }) {
  const [lan, setlan] = useState("en");
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
    <>
      <StatusBar hidden />
      <SimpleHeader
        navigation={navigation}
        bg="primary"
        title="Favorites"
        shadow={true}
      />
      <View style={styles.container}>
        <View style={styles.circle}>
          <MaterialCommunityIcons
            name="star-face"
            size={width / 5}
            color={colors.secondary}
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
          {i18n.t("AllLan.favorites")}
        </Text>
        <Text style={{ color: "grey", textAlign: "center", width: "85%" }}>
          {i18n.t("AllLan.pleaseLogin")}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => _paymentCall()}
          // onPress={() => {
          //   navigation.navigate("Auth");
          // }}
        >
          <Text style={{ color: colors.primary, fontSize: 16 }}>
            {i18n.t("AllLan.login")}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: width / 3,
    height: width / 3,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width / 6,
    elevation: 2,
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
});
