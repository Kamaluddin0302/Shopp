import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native";
import colors from "../../config/colors";

export default function Submit({ title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 50,
    backgroundColor: "#af3e53",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 17,
  },
});
