import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import Products from "../components/Home/Products";
import { useNavigation } from "@react-navigation/native";

import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen");

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;

export default function Tabs({ searchCat, setSearchCat, translation }) {
  const [isLoading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();

  const categories = [
    {
      id: 1,
      name: "account-star",
      detail: translation.brands,
    },
    {
      id: 2,
      name: "human-female",
      detail: translation.DokaniStores,
    },
    {
      id: 3,
      name: "human-male",
      detail: translation.TurkishStores,
    },
    {
      id: 4,
      name: "home-city",
      detail: translation.home,
    },
    {
      id: 5,
      name: "brush",
      detail: translation.cosmetics,
    },
    // {
    //   id: 6,
    //   name: "cellphone-android",
    //   detail: i18n.t("AllLan.electronics"),
    // },
    {
      id: 7,
      name: "watch-variant",
      detail: translation.accesories,
    },
    {
      id: 8,
      name: "shoe-heel",
      detail: translation.shoesBags,
    },
    // {
    //   id: 9,
    //   name: "cart",
    //   detail: i18n.t("AllLan.supermarket"),
    // },
    // {
    //   id: 10,
    //   name: "sofa",
    //   detail: i18n.t("AllLan.furniture"),
    // },
  ];

  useEffect(() => {
    getSearchResult();

    (async () => {
      try {
        let lang = await AsyncStorage.getItem("lang");
        let chl = lang ? lang : "en";
        i18n.locale = chl;
      } catch (err) {
        console.log("=======err=====>", err);
      }
    })();
  }, [searchCat]);

  const getSearchResult = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `wp-json/wc/v3/products/?search=${searchCat}`
      );
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
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.container}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log("---item---->", item);
                    if (item?.detail === "Brands") {
                      navigation.navigate("Brands");
                    }
                    if (item?.detail === "Turkish Stores") {
                      navigation.navigate("TrukushStore");
                    } else setSearchCat(item.detail);
                  }}
                >
                  <View
                    style={[
                      styles.category,
                      {
                        backgroundColor:
                          item.detail === searchCat
                            ? colors.primary
                            : colors.inActive,
                        borderBottomWidth:
                          index === categories.length - 1 ? 0 : 0.25,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.name}
                      size={25}
                      color={
                        item.detail === searchCat
                          ? colors.secondary
                          : "rgba(0,0,0,0.5)"
                      }
                    />
                    <Text
                      style={[
                        styles.detail,
                        {
                          color:
                            item.detail === searchCat
                              ? colors.secondary
                              : "rgba(0,0,0,0.5)",
                        },
                      ]}
                    >
                      {item.detail}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {searchResult?.length === 0 ? (
            <View>
              <Text>{translation.noItemFound}</Text>
            </View>
          ) : (
            <Products
              productList={searchResult}
              navigation={navigation}
              isVertical={true}
            />
          )}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: height - 160,
    backgroundColor: colors.inActive,
    flexDirection: "row",
  },
  category: {
    width: "100%",
    height: 70,
    borderColor: "grey",
    borderRightWidth: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  detail: {
    fontSize: 12,
  },
});
