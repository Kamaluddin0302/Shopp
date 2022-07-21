import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import * as COMMONJOBS from "../redux/actions/common.action";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const { height, width } = Dimensions.get("screen");

export default function Product({ route, navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAtt, setSelectedAtt] = useState(
    route?.params?.attr[0]?.options[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [err, setErr] = useState("");
  const [user, setuser] = useState(null);

  const [lan, setlan] = useState("en");

  const rating = 4.5;
  const likes = "20k";
  const reviews = "140";
  const price = "120$";
  const { image } = route.params;
  const cart = useSelector((state) => state?.common?.cart);
  // const user = useSelector((state) => state?.common?.userInfo);
  console.log("========", cart);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let useremail = await AsyncStorage.getItem("email");
      let id = await AsyncStorage.getItem("id");
      setuser({ email: useremail, id: id });
      // try {
      //   let lang = await AsyncStorage.getItem("lang");
      //   let chl = lang ? lang : "en";
      //   i18n.locale = chl;
      // } catch (err) {
      //   console.log("---lan err----.", err);
      // }
    })();
  }, [navigation]);

  const addItemCart = () => {
    if (user) {
      const item = cart?.findIndex((data) => data?.id == route?.params?.id);
      if (item >= 0) {
        setErr(i18n.t("AllLan.ItemAlreadyCart"));
        setModalVisible(true);
      } else {
        dispatch(
          COMMONJOBS.addItemCart({
            id: route?.params?.id,
            product_name: route?.params?.detail,
            price: route?.params?.price,
            attribute: selectedAtt,
            data: route.params,
            quantity: 1,
          })
        );
        setErr(i18n.t("AllLan.ItemAddedCart"));
        setModalVisible(true);
      }
    } else {
      setErr(i18n.t("AllLan.PleaseLogInitems"));
      setModalVisible(true);
    }
  };

  const Rating = () => {
    var list = [];
    for (var i = 1; i < 6; i++) {
      list.push(
        <MaterialCommunityIcons
          key={i}
          name={
            rating >= i
              ? "star"
              : i - 0.9 < rating
              ? "star-half-full"
              : "star-outline"
          }
          size={12}
          color="#FF9529"
        />
      );
    }
    return list;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
        >
          <TouchableOpacity style={{ marginRight: 20 }}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{
          backgroundColor: colors.primary,
          flexGrow: 1,
        }}
      >
        <FlatList
          data={image}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollBegin={(ev) => {
            setActiveIndex(
              ev.nativeEvent.contentOffset.x / width > activeIndex
                ? Math.ceil(ev.nativeEvent.contentOffset.x / width)
                : Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Gallery", { image: image });
                }}
              >
                <View style={styles.image}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                    source={{
                      uri:
                        item?.src ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        <View style={styles.sliderIndicator}>
          {image.map(({ id }, i) => {
            return (
              <View
                key={id}
                style={{
                  width: activeIndex === i ? 7 : 7,
                  height: activeIndex === i ? 7 : 7,
                  borderRadius: 5,
                  backgroundColor: activeIndex === i ? colors.primary : "grey",
                  marginHorizontal: 2,
                }}
              />
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.heading}>{route?.params?.detail}</Text>
          <View style={{ flexDirection: "row", marginStart: 30 }}>
            {route?.params?.attr[0]?.options?.map((data) => (
              <TouchableOpacity
                onPress={() => setSelectedAtt(data)}
                style={{
                  backgroundColor: "grey",
                  marginStart: 14,
                  marginTop: 10,
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    padding: 5,
                    color: "white",
                    opacity: selectedAtt === data ? 1 : 0.5,
                  }}
                >
                  {data}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={[styles.subHeading, { fontWeight: "bold" }]}></Text>
        <View style={styles.details}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.ratingText}>{rating}</Text>
            <Rating />
            <Text
              style={{
                fontSize: 20,
                color: "rgba(0,0,0,0.3)",
                marginHorizontal: 5,
              }}
            >
              |
            </Text>
            <Text>
              {reviews} {i18n.t("AllLan.reviews")}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="grey"
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5 }}>{likes}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.priceText}>{route?.params?.price}₪</Text>
        <TouchableWithoutFeedback onPress={addItemCart}>
          <View style={styles.button}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>
              {i18n.t("AllLan.addToCart")}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
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
                {/* {i18n.t("AllLan.alert")} */}
                {err}
              </Text>
              {/* <Text style={styles.modalText}>{err}</Text> */}
              <View style={styles._row}>
                {user ? (
                  <>
                    <TouchableOpacity
                      style={{ ...styles.openButton }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setErr("");
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        {i18n.t("AllLan.contineshopping")}
                      </Text>
                      {/* <AntDesign name="closecircle" size={15} color="red" /> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ ...styles.openButton }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setErr("");
                        navigation.navigate("Cart");
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 14,
                        }}
                      >
                        {i18n.t("AllLan.gotocart")}
                      </Text>
                      {/* <AntDesign name="closecircle" size={15} color="red" /> */}
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={{ ...styles.openButton }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setErr("");
                      navigation.navigate("Auth");
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      {i18n.t("AllLan.login")}
                    </Text>
                    {/* <AntDesign name="closecircle" size={15} color="red" /> */}
                  </TouchableOpacity>
                )}
              </View>
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
    alignItems: "center",
  },
  header: {
    width: width,
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    top: 0,
    position: "absolute",
    zIndex: 100,
  },
  image: {
    width: width,
    maxHeight: (height / 100) * 70,
    minHeight: (height / 100) * 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: colors.inActive,
    borderBottomWidth: 1,
  },
  footer: {
    width: width,
    height: 80,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    paddingVertical: 15,
    borderTopColor: colors.inActive,
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: 13,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 20,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderIndicator: {
    height: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    top: (height / 100) * 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  heading: {
    fontSize: 20,
    color: colors.secondary,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subHeading: {
    color: "grey",
    paddingHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.inActive,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  ratingText: {
    marginRight: 3,
  },
  priceText: {
    fontSize: 20,
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
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    paddingVertical: 20,
  },
  openButton: {
    borderRadius: 5,
    // elevation: 1,
    // position: "absolute",
    right: 0,
    margin: 5,
    // width: 50,
    backgroundColor: "green",
    padding: 4,
    paddingHorizontal: 8,
    width: 140,
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
  _row: {
    // borderWidth: 2,
    // flex: 1,
    flexDirection: "row",
  },
});
