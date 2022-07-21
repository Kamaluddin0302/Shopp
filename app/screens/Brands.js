import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import axios from "axios";
import Brand from "../components/Home/Brands";
import colors from "../config/colors";
import IconHeader from "../components/iconHeader";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const Brands = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getMensData();
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

  const getMensData = async () => {
    setLoading(true);
    try {
      const vendorsList = await axios.get("wp-json/wcfmmp/v1/store-vendors");
      if (vendorsList?.data) {
        setVendors(vendorsList?.data);
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
      <View style={{ flex: 1 }}>
        <IconHeader backIcon={true} navigation={navigation} />
        <Text style={styles.vendorName}>
          {i18n.t("AllLan.ListOfAvaBrands")}
        </Text>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          style={{}}
          data={vendors}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Vendor", { item })}
            >
              <View
                style={{
                  width: 130,
                  height: 130,
                  elevation: 2,
                  borderRadius: 10,
                  backgroundColor: colors.primary,
                  marginTop: 30,
                  alignSelf: "center",
                  marginBottom: index === vendors?.length - 1 ? 50 : 0,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.vendor_shop_logo }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    marginTop: 3,
                  }}
                >
                  {item?.vendor_display_name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
};

export default Brands;

const styles = StyleSheet.create({
  vendorName: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
