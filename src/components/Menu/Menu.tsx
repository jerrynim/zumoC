import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  SafeAreaView
} from "react-native";

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
    <SafeAreaView style={{ height: 1000, backgroundColor: "white" }}>
      <View style={styled.Container}>
        <View style={{ width: 230, height: 230 }}>
          <View
            style={{
              width: 230,
              height: 230,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: "yellow",
                borderRadius: 50
              }}
            />
            <Text style={{ height: 25, fontSize: 20, marginTop: 20 }}>Lee</Text>
          </View>
        </View>
        <View style={{ width: 230, height: 350 }}>
          <View
            style={{
              width: 230,
              height: 30,
              borderBottomColor: "black",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ height: 25 }}>☃︎ MY PAGE</Text>
          </View>
          <View
            style={{
              width: 230,
              height: 50,
              borderBottomColor: "light-grey",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text>⚲ SEARCH</Text>
          </View>
          <View
            style={{
              width: 230,
              height: 50,
              borderBottomColor: "light-grey",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text>♡ LIKE</Text>
          </View>
          <View
            style={{
              width: 230,
              height: 50,
              borderBottomColor: "light-grey",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text>⚙︎ SETTING</Text>
          </View>
          <View
            style={{
              width: 230,
              height: 50,
              borderBottomColor: "light-grey",
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text>✓ NOTICE</Text>
          </View>
          <View
            style={{
              width: 230,
              height: 50,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text>카카오톡으로 앱 추천하기</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
