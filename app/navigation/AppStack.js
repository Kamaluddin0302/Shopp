import React, { useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import AppNav from "./AppNav";
import SearchProducts from "../screens/SearchProducts";
import Product from "../screens/Product";
import Gallery from "../screens/Gallery";
import Auth from "../screens/Auth";
import { useDispatch } from "react-redux";
import Checkout from "../screens/Checkout";

import * as COMMONJOBS from "../redux/actions/common.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendorItems from "../screens/vendorItems";
import Brands from "../screens/Brands";
import TrukushStore from "../screens/TurkushStore";
import AddAddress from "../screens/AddAddress";
import EditAddress from "../screens/EditAddress";
import Payment from "../screens/Payment";
import WelcomeSlider from "../screens/WelcomeSlider";

const Stack = createStackNavigator();

export default function MyStack() {
  useEffect(() => {
    setData();
  }, []);
  const dispatch = useDispatch();

  const setData = async () => {
    try {
      let data = await AsyncStorage.getItem("user");
      let data2 = await AsyncStorage.getItem("id");
      dispatch(COMMONJOBS.loginAction({ email: data, id: data2 }));
    } catch (error) {}
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen name="Welcomeslider" component={WelcomeSlider} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="TrukushStore" component={TrukushStore} />
      <Stack.Screen name="AppNav" component={AppNav} />
      <Stack.Screen name="SearchProducts" component={SearchProducts} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Vendor" component={VendorItems} />
      <Stack.Screen name="Brands" component={Brands} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
}
