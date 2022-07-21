import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function SimpleHeader({
  navigation,
  bg,
  shadow,
  title,
  right,
  center,
  iconHeader,
  left,
}) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "black",
          elevation: shadow ? 5 : 0,
          // paddingBottom:30
        },
      ]}
    >
      {/* left/ */}
      {left ? left : null}

      <View style={{ flex: center ? 1 : 0 }}>
        <Text
          style={{
            fontSize: 17,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: iconHeader ? -10 : 0,
          }}
        >
          {title}
        </Text>
      </View>
      <View>{right ? right : null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width,
    height: 100,
    paddingTop: 20,
    backgroundColor: colors.inActive,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // flex:1
  },
});
