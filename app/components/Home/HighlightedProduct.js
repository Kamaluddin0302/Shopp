import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import colors from "../../config/colors";

const { width, height } = Dimensions.get("screen");

export default function HighlightedProduct({ image }) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          source={image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: colors.primary,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    maxWidth: 500,
  },
});
