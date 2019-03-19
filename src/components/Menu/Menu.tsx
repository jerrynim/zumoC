import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MENU_WIDTH = Dimensions.get("window").width - 100;
const SCREEN_HEIGHT = Dimensions.get("window").height;

interface IProps {
  onPress: any;
}

class Menu extends React.Component<IProps> {
  render() {
    return (
      <SafeAreaView style={{ height: SCREEN_HEIGHT, backgroundColor: "white" }}>
        <View style={{ width: MENU_WIDTH }}>
          <View style={{ width: MENU_WIDTH, height: 230 }}>
            <View
              style={{
                width: MENU_WIDTH,
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
              <Text style={{ height: 25, fontSize: 17, marginTop: 20 }}>
                Lee
              </Text>
            </View>
          </View>
          <View style={{ width: MENU_WIDTH, height: 400 }}>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                borderBottomColor: "rgba(0,0,0,0.3)",
                borderBottomWidth: 1,
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "500" }}
                onPress={() => this.props.onPress("MyPage")}
              >
                ☃︎ MY PAGE
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
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
                marginLeft: 20,
                marginRight: 20,
                borderBottomColor: "rgba(0,0,0,0.3)",
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
                marginLeft: 20,
                marginRight: 20,
                borderBottomColor: "rgba(0,0,0,0.3)",
                borderBottomWidth: 1,
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                ⚙︎ SETTING
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
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
                paddingLeft: 20,
                paddingRight: 20,
                height: 40,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopColor: "rgba(0,0,0,0.3)",
                borderTopWidth: 1
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                카카오톡으로 앱 추천하기
              </Text>
              <Ionicons
                size={25}
                name={"ios-arrow-dropright"}
                color={"rgba(0,0,0,0.5)"}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Menu;
