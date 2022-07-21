import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Input from "../components/Form/Input";
import SimpleHeader from "../components/SimpleHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../config/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import i18n from "i18n-js";
import { en, ar } from "./../translations/locals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

i18n.translations = {
  en,
  ar,
};
i18n.fallbacks = true;
const Checkout = ({ navigation }) => {
  const user = useSelector((state) => state?.common?.userInfo);
  const cart = useSelector((state) => state?.common.cart);

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
  const [isLoading, setLoading] = useState(false);

  const dataCart = cart?.map((data) => {
    return {
      product_id: data?.id,
      quantity: 1,
      attribute: data?.attribute,
    };
  });

  const _paymentCall = () => {
    Linking.openURL(
      "https://secure.cardcom.solutions/Interface/LowProfile.aspx?codepage=65001&Operation=1&TerminalNumber=125812&UserName=barak9611&SumToBill=1&CoinID=1&Language=he&ProductName=item1&APILevel=10&SuccessRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Success.aspx&ErrorRedirectUrl=https://secure.cardcom.solutions/SuccessAndFailDealPage/Fail.aspx&IndicatorUrl=www.google.com&ReturnValue=1234&&AutoRedirect=true"
    );
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  return (
    <>
      <StatusBar hidden />
      <SimpleHeader
        navigation={navigation}
        bg="primary"
        title={i18n.t("AllLan.checkout")}
        shadow={true}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          tyle={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <Formik
            initialValues={{
              name: "",
              address: "",
              city: "",
              state: "",
              postcode: "",
              country: "",
              phone: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required(i18n.t("AllLan.required")),
              address: Yup.string().required(i18n.t("AllLan.required")),
              city: Yup.string().required(i18n.t("AllLan.required")),
              state: Yup.string().required(i18n.t("AllLan.required")),
              postcode: Yup.number().required(i18n.t("AllLan.required")),
              country: Yup.string().required(i18n.t("AllLan.required")),
              phone: Yup.string().required(i18n.t("AllLan.required")),
            })}
            onSubmit={async (values, formikActions) => {
              setLoading(true);
              try {
                const response = await axios.post("wp-json/wc/v3/orders", {
                  payment_method: "bacs",
                  payment_method_title: i18n.t("AllLan.directBankTransfer"),
                  set_paid: false,
                  billing: {
                    first_name: values.name,
                    last_name: "",
                    address_1: values.address,
                    address_2: "",
                    city: values.city,
                    state: values.state,
                    postcode: values.postcode,
                    country: values.country,
                    email: user?.email,
                    phone: values.phone,
                  },
                  line_items: dataCart,
                });
                if (response?.data) {
                  alert(i18n.t("AllLan.OrderSuccessfully"));

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "AppNav" }],
                    })
                  );
                }
              } catch (err) {
                console.log(err.response.data);
                alert(err?.response?.message || err?.message);
              }
              setLoading(false);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ flex: 1, padding: 20 }}>
                <Input
                  placeholder={i18n.t("AllLan.enterName")}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  specificStyles={{ marginTop: 20 }}
                  error={errors.name && touched.name ? errors.name : null}
                />
                <Input
                  placeholder={i18n.t("AllLan.enterAddress")}
                  onChangeText={handleChange("address")}
                  value={values.address}
                  specificStyles={{ marginTop: 20 }}
                  error={
                    errors.address && touched.address ? errors.address : null
                  }
                />
                <Input
                  placeholder={i18n.t("AllLan.enterCity")}
                  onChangeText={handleChange("city")}
                  value={values.city}
                  specificStyles={{ marginTop: 20 }}
                  error={errors.city && touched.city ? errors.city : null}
                />
                <Input
                  placeholder={i18n.t("AllLan.enterState")}
                  onChangeText={handleChange("state")}
                  value={values.state}
                  specificStyles={{ marginTop: 20 }}
                  error={errors.state && touched.state ? errors.state : null}
                />
                <Input
                  placeholder={i18n.t("AllLan.enterPost")}
                  onChangeText={handleChange("postcode")}
                  value={values.postcode}
                  specificStyles={{ marginTop: 20 }}
                  error={
                    errors.postcode && touched.postcode ? errors.postcode : null
                  }
                />

                <Input
                  placeholder={i18n.t("AllLan.enterCountry")}
                  onChangeText={handleChange("country")}
                  value={values.country}
                  specificStyles={{ marginTop: 20 }}
                  error={
                    errors.country && touched.country ? errors.country : null
                  }
                />
                <Input
                  placeholder={i18n.t("AllLan.enterPhone")}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  specificStyles={{ marginTop: 20 }}
                  error={errors.phone && touched.phone ? errors.phone : null}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: colors.secondary,
                    width: "85%",
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
                    {i18n.t("AllLan.placeOrder")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
