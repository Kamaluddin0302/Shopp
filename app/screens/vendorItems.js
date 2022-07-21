import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import Products from "../components/Home/Products";
import colors from "../config/colors";
import IconHeader from "../components/iconHeader";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const VendorItems = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [lan, setlan] = useState("en");

  useEffect(() => {
    getVendorsProducts();
    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
      } catch (err) {
        console.log("================>", err);
      }
    })();
  }, [route]);
  //   console.log(route?.params?.item?.id);

  const getVendorsProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `wp-json/wcfmmp/v1/store-vendors/${route?.params?.item?.vendor_id}/products`
      );
      if (response?.data) {
        setProducts(response?.data);
      }
      //   alert('data found');
    } catch (error) {
      //   console.log(error);
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
          {route?.params?.item?.vendor_display_name}
        </Text>
        {products?.length === 0 && !isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {i18n.t("AllLan.noItemFound")}!
            </Text>
          </View>
        ) : (
          <Products productList={products} isVertical navigation={navigation} />
        )}
      </View>
    );
};

export default VendorItems;

const styles = StyleSheet.create({
  vendorName: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
