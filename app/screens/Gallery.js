import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function Gallery({ route, navigation }) {
  const { image } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar hidden />
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
              size={25}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri:
              image[activeIndex]?.src ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
          }}
          style={styles.activeImage}
        />
        <FlatList
          data={image}
          keyExtractor={(item) => item?.id?.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  setActiveIndex(index);
                }}
              >
                <Image
                  source={{
                    uri:
                      item?.src ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
                  }}
                  style={[
                    styles.imageList,
                    { borderWidth: activeIndex === index ? 2 : 0 },
                  ]}
                />
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  activeImage: {
    height: (height / 100) * 65,
    width,
  },
  imageList: {
    width: width / 2.5,
    height: (height / 100) * 27,
    borderColor: colors.secondary,
    resizeMode: "contain",
    marginTop: 7,
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
});
