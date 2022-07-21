import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import I18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChoseLang({ navigation }) {
  const [current, setCurrent] = useState("ar");

  let changeLang = async () => {
    try {
      await AsyncStorage.setItem("lang", current);
      I18n.locale = current;
      navigation.navigate("Welcomeslider");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.constainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Select Langauge</Text>

        <RadioButtonGroup
          containerStyle={styles.radoiContainer}
          selected={current}
          onSelected={(value) => setCurrent(value)}
          radioBackground="black"
        >
          <RadioButtonItem
            value="ar"
            label={
              <View style={styles.lang}>
                <Image
                  source={require("./../assets/emirates.png")}
                  style={styles.flag}
                />
              </View>
            }
            style={styles.buttonView1}
          />
          <RadioButtonItem
            value="en"
            label={
              <View style={styles.lang}>
                <Image
                  source={require("./../assets/britain.png")}
                  style={styles.flag}
                />
              </View>
            }
            style={styles.buttonView2}
          />
        </RadioButtonGroup>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => changeLang()}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radoiContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "white",
    elevation: 10,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  flag: {
    width: 40,
    height: 25,
    borderRadius: 2,
  },
  lang: {},
  buttonView1: {
    width: 20,
    height: 20,
  },
  buttonView2: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  doneButton: {
    backgroundColor: "white",
    elevation: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 30,
  },
  doneText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
