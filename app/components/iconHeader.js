import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
const IconHeader = (props) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: props.backIcon ? "center" : "center",
        alignItems: "center",
      }}
    >
      {props.backIcon ? (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/topicon.png")}
          style={{
            width: 150,
            height: 70,
            resizeMode: "cover",
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

export default IconHeader;

const styles = StyleSheet.create({});
