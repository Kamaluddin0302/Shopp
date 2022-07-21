import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Input({
  specificStyles,
  iconName,
  onPress,
  error,
  value,
  ...otherprops
}) {
  console.log(otherprops);
  return (
    <>
      <View style={[styles.container, specificStyles]}>
        <TextInput {...otherprops} style={styles.textInput} value={value} />
        {iconName && (
          <TouchableOpacity style={styles.icon} onPress={onPress}>
            <MaterialCommunityIcons name={iconName} size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ color: "red" }}>{error}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    elevation: 12,
    borderRadius: 10,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "gray",
    shadowOpacity: 1.0,
    backgroundColor: "white",
  },
  textInput: {
    width: "100%",
    height: 50,
    // borderColor: "rgba(0,0,0,0.3)",
    // borderWidth: 1.2,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
