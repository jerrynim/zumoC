import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const styled = StyleSheet.create<Style>({
  Container: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white"
  },
  Header: {
    height: 230,
    width: 230,
    backgroundColor: "yellow",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  ProfilePhoto: {
    height: 40,
    width: 40,
    backgroundColor: "blue"
  },
  UserName: {
    height: 30,
    fontSize: 15
  },
  Lists: {
    display: "flex",
    marginTop: 10
  },
  List: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    opacity: 90,
    justifyContent: "center"
  },
  Share: {
    height: 100
  },
  Profile: {}
});

interface Style {
  Container: ViewStyle;
  Header: ViewStyle;
  ProfilePhoto: ViewStyle;
  UserName: TextStyle;
  Lists: ViewStyle;
  List: ViewStyle;
  Share: ViewStyle;
  Profile: ViewStyle;
}
const Menu: React.SFC = () => {
  return (
    <SafeAreaView style={{ height: SCREEN_HEIGHT, backgroundColor: "white" }}>
      <View style={styled.Container}>
        <View style={{ width: 250, height: 230 }}>
          <View
            style={{
              width: 270,
              height: 400,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 50
              }}
            />
            <Text style={{ height: 25, fontSize: 17, marginTop: 20 }}>Lee</Text>
          </View>
        </View>
        <View style={{ width: 270, height: 500 }}>
          <View
            style={{
              width: 270,
              height: 40,
              borderBottomColor: "rgba(0,0,0,0.3)",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>☃︎ MY PAGE</Text>
          </View>
          <View
            style={{
              width: 270,
              height: 40,
              borderBottomColor: "rgba(0,0,0,0.3)",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>⚲ SEARCH</Text>
          </View>
          <View
            style={{
              width: 270,
              height: 40,
              borderBottomColor: "rgba(0, 0, 0, 0.3)",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>♡ LIKE</Text>
          </View>
          <View
            style={{
              width: 270,
              height: 40,
              borderBottomColor: "rgba(0,0,0,0.3)",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>⚙︎ SETTING</Text>
          </View>
          <View
            style={{
              width: 270,
              height: 40,
              borderBottomColor: "rgba(0,0,0,0.3)",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "500" }}>✓ NOTICE</Text>
          </View>
          <View
            style={{
              paddingTop: 30,
              padding: 20,
              width: 270,
              height: 40,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              카카오톡으로 앱 추천하기
            </Text>
            <Ionicons size={25} name={"ios-arrow-dropright"} color={"black"} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
