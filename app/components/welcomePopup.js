


import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function WelcomePopup({ translation, onPress }) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles._header}>
          <Text style={styles.title}>{translation.Tip}</Text>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => onPress()}
          />
        </View>
        <View style={styles._bottomView}>
          <Text style={styles._detail}>{translation.Tipdetail}</Text>

          <Text style={styles._question}>{translation.ques1}</Text>
          <Text style={styles._detail}>{translation.ans1}</Text>

          <Text style={styles._question}>{translation.ques2}</Text>
          <Text style={styles._detail}>{translation.ans2}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles._button}
              onPress={() => {
                Linking.openURL(
                  "http://api.whatsapp.com/send?phone=971" + "58307 9163"
                );
                setWelcomeModal(!welcomeModal);
              }}
            >
              <View style={styles.whatsappVeiw}>
                <Image
                  source={require("./../assets/whatsapp.png")}
                  style={styles._whatsappImage}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles._button} onPress={() => onPress()}>
              <Text
                style={[
                  styles.title,
                  { color: "black", marginRight: 0, fontSize: 17 },
                ]}
              >
                {translation.thanks}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  _header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e3e5",
    padding: 10,
  },
  title: {
    color: "#2daeb5",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10,
  },
  _detail: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
  },
  _bottomView: {
    padding: 10,
  },
  _question: {
    color: "#2daeb5",
    fontSize: 15,
    textAlign: "right",
    fontWeight: "bold",
  },
  buttonView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  _button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 120,
    padding: 7,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 15,
  },
  _whatsappImage: {
    height: 35,
    width: 35,
    borderRadius: 12,
  },
});
