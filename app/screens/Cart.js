import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from "react-native";
import colors from "../config/colors";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomePopup from "../components/welcomePopup";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
export default function Cart({ route, navigation, translation }) {
  let steps = [
    {
      name: i18n.t("AllLan.step_1"),
      status: true,
      order_state: "pending, processing, Completed",
      src: require("../assets/warehouse.png"),
    },
    {
      name: i18n.t("AllLan.step_2"),
      order_state: "pending, processing, Completed",
      status: true,
      src: require("../assets/shipment.png"),
    },
    {
      name: i18n.t("AllLan.step_3"),
      order_state: "processing, Completed",
      status: true,
      src: require("../assets/airplane.png"),
    },
    {
      name: i18n.t("AllLan.step_4"),
      order_state: "Completed",
      status: true,
      src: require("../assets/delivered.png"),
    },
  ];

  const [data, setData] = useState([]);

  let [welcomeModal, setWelcomeModal] = useState(false);

  useEffect(async () => {
    let userId = await AsyncStorage.getItem("id");

    if (userId) {
      if (data.length == 0) {
        (async () => getOrderProducts())();
      }
    } else {
      navigation.navigate("Profile");
    }
  }, [data.length == 0]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let userId = await AsyncStorage.getItem("id");

      if (!userId) {
        navigation.navigate("Profile");
      }
    });
  }, [navigation]);

  const [refreshing, setRefreshing] = React.useState(false);

  const [isLoading, setLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    (async () => getOrderProducts())();
  }, []);

  const getOrderProducts = async () => {
    let userId = await AsyncStorage.getItem("id");
    setLoading(true);
    console.log("USER ID", userId);
    setData([]);
    try {
      const response = await axios.post(
        "http://dokaniapp.com/wp-json/wp/v2/users/order_listing",
        {
          user_id: userId,
        }
      );
      if (response?.data) {
        console.log(response?.data);
        setLoading(false);

        setData(response?.data.data);
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };

  const checkOrderStatus = async (order_id) => {
    try {
      console.log("INORDER" + order_id);
      const response = await axios.post(
        "http://dokaniapp.com/wp-json/wp/v2/users/orderstatus",
        {
          order_id: order_id,
        }
      );
      if (response?.data) {
        if (response?.data.data.order_status != "pending") {
          Alert.alert("Order Confirmed");
          getOrderProducts();
        } else {
          Alert.alert("Payment cancelled");
        }
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };
  const orderPayNow = async (order_id) => {
    let userId = await AsyncStorage.getItem("id");
    // setLoading(true);
    //setData([])
    try {
      const response = await axios.post(
        "http://dokaniapp.com/wp-json/wp/v2/users/checkout",
        {
          user_id: userId,
          order_id: order_id,
        }
      );
      if (response?.data) {
        console.log(response?.data.data.checkout_payment_url);
        navigation.navigate("Payment", {
          payment_url: response?.data.data.checkout_payment_url,
          onGoBack: () => checkOrderStatus(order_id),
        });
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || error?.message);
    }
  };

  const renderProductItem = (item, index) => {
    return (
      <View style={styles._box_inner}>
        <Image
          source={{ uri: item.product_image }}
          style={{ height: 100, width: 100, borderRadius: 10 }}
        />
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text>{item.product_name}</Text>
          <View style={styles._size}>
            <Text>{"Size: N/A"}</Text>
          </View>
          <View style={styles._price_row}>
            <Text style={styles._price}>{item.price + " NIS"}</Text>
            <Text style={styles._quantity}>{item.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderOrderItem = (item, index) => {
    return (
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          // borderBottomWidth: 1,
          // borderBottomColor: "grey",
        }}
      >
        <View style={{ padding: 20 }}>
          <Text>
            {item.billing_first_name +
              " " +
              item.billing_last_name +
              ", " +
              item.billing_address_1 +
              " " +
              item.billing_city +
              ", " +
              item.billing_postcode}
          </Text>
          <Text>{item.billing_phone}</Text>
          <Text>{i18n.t("AllLan.orderDate") + item.Date}</Text>
        </View>
        <View style={styles._box}>
          <FlatList
            nestedScrollEnabled={false}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            data={item.products}
            renderItem={({ item, index }) => renderProductItem(item, index)}
          />

          <View style={styles._box_footer}>
            <View style={styles._row}>
              <Text style={styles._txt}>{i18n.t("AllLan.subtotal")}</Text>
              <Text style={styles._txt}>{"NIS " + item.subtotal}</Text>
            </View>

            <View style={styles._row}>
              <Text style={styles._txt}>{i18n.t("AllLan.shippingcharge")}</Text>
              <Text style={styles._txt}>
                {"NIS " + item.shipping.shipping_data_total}
              </Text>
            </View>

            <View style={styles._row}>
              <Text style={styles._txt}>
                {i18n.t("AllLan.shippingInsurance")}
              </Text>
              <Text style={styles._txt}>{"NA"}</Text>
            </View>
            <View style={styles._row}>
              <Text style={styles._txt}>{i18n.t("AllLan.dutyinsurance")}</Text>
              <Text style={styles._txt}>{"NA"}</Text>
            </View>
          </View>
        </View>

        <View style={styles._order_num_row}>
          <Text style={{ fontWeight: "bold" }}>
            {i18n.t("AllLan.orderNum")}{" "}
            <Text style={{ color: "#2196f3" }}>{"#" + item.order_id}</Text>
          </Text>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              {i18n.t("AllLan.ExpectedDate")}
              {":" + "N/A"}
            </Text>
            <Text style={{ fontWeight: "bold", color: "grey" }}>
              {i18n.t("AllLan.ups")}{" "}
              <Text style={{ color: "black" }}>{"N/A"}</Text>
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <View style={styles._steps_row}>
            {steps.map((val, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles._steps,
                    {
                      flex: i === 3 ? 0 : 1,
                      borderColor: val.order_state.includes(item.status)
                        ? "black"
                        : "grey",
                    },
                  ]}
                >
                  {val.order_state.includes(item.status) ? (
                    <View style={styles._circle}>
                      <Feather name="check" size={18} color="white" />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles._circle,
                        { backgroundColor: "white", borderColor: "grey" },
                      ]}
                    >
                      <Octicons name="primitive-dot" size={24} color="grey" />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
          {steps.map((val, i) => {
            return (
              <View style={styles._setps_data_td}>
                <Image
                  source={val.src}
                  style={{ height: 20, width: 20, marginRight: 5 }}
                />
                <Text style={{ fontSize: 12, flex: 1, fontWeight: "bold" }}>
                  {val.name}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles._footer}>
          <View style={styles._price_row}>
            {/* grandTotal */}
            <Text style={{ fontWeight: "bold" }}>
              {i18n.t("AllLan.grandTotal")}
            </Text>
            <Text style={{ color: "#fd5456", fontWeight: "bold" }}>
              {"NIS " + item.total}
            </Text>
          </View>
          {item.status == "pending" && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                width: "100%",
                alignSelf: "center",
                borderRadius: 12,
                marginTop: 10,
              }}
              onPress={() => {
                if (item.status == "pending") {
                  orderPayNow(item.order_id);
                } else {
                }
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  padding: 15,
                  textAlign: "center",
                }}
              >
                {item.status == "pending" ? translation.paynow : "Paid"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles._container}>
      <StatusBar hidden />
      <Image
        source={require("./../assets/topicon.png")}
        style={{
          width: 150,
          height: 70,
          resizeMode: "cover",
          alignSelf: "center",
          marginTop: 20,
        }}
      />
      <Text style={styles._track_heading}>
        {i18n.t("AllLan.trackproduct")}{" "}
      </Text>
      <TouchableOpacity
        style={styles.whatsappPopup}
        onPress={() => setWelcomeModal(!welcomeModal)}
      >
        <Image
          source={require("./../assets/whatsapp.png")}
          style={styles._whatsappImage}
        />
      </TouchableOpacity>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          data={data}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => renderOrderItem(item, index)}
          style={{ paddingHorizontal: 10, flex: 1 }}
        />
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
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
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

  _counter_row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    // padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    borderRadius: 4,
    // paddingHorizontal: 1,
    // width: 90,
    // height: 30,
  },
  _counter_btn: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "grey",
    // backgroundColor: "black",
  },
  _counter_result: {
    paddingHorizontal: 8,
  },
  _price: {
    fontSize: 22,
    paddingVertical: 5,
    // fontWeight: 'bold',
  },
  _track_heading: {
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    fontFamily: "sans-serif",
  },
  _box: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  _box_inner: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingVertical: 10,
  },
  _row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
  },
  _box_footer: {
    borderTopWidth: 1,
    // marginTop: 10,
    borderColor: "#e6e6e6",
    paddingTop: 10,
  },
  _price_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  _quantity: {
    backgroundColor: "#e6e6e6",
    width: 60,
    textAlign: "center",
    padding: 2,
    borderRadius: 3,
    fontWeight: "bold",
    marginBottom: 4,
  },
  _order_num_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // alignItems: "center",
  },
  _steps_row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "relative",
    flex: 1,
    margin: 20,
    marginLeft: -5,
  },
  _steps: {
    flex: 1,
    borderWidth: 2,
    height: 2,
    backgroundColor: "red",
  },
  _circle: {
    height: 30,
    width: 30,
    backgroundColor: "black",
    borderRadius: 100,
    position: "absolute",
    top: -15,
    left: -2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  _setps_data_td: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  _footer: {
    backgroundColor: "white",
    margin: 10,
    padding: 20,
  },
  _txt: {
    fontSize: 12,
    fontWeight: "bold",
  },
  _price: {
    fontWeight: "bold",
    color: "#fd5456",
  },
  _size: {
    backgroundColor: "#e6e6e6",
    padding: 4,
    alignSelf: "flex-start",
    borderRadius: 3,
    marginTop: 5,
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
