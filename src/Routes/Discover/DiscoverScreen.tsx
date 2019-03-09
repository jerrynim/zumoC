import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";

interface IProps {}

const SCREEN_WIDTH = Dimensions.get("window").width;

class DiscoverScreen extends React.Component<IProps> {
  render() {
    return (
      <SafeAreaView>
        <View style={{ margin: 10 }}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ fontSize: 25 }}>3월 2주 ZUMO추천</Text>
            <Text>03.04 - 03.10</Text>
          </View>
          <View
            style={{
              width: SCREEN_WIDTH - 20,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                width: SCREEN_WIDTH - 20,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  backgroundColor: "green",
                  flex: 4,
                  height: 140,
                  marginRight: 5
                }}
              />
              <View
                style={{
                  backgroundColor: "yellow",
                  marginLeft: 5,
                  flex: 2,
                  height: 140
                }}
              />
            </View>
            <View
              style={{
                width: SCREEN_WIDTH - 20,
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <View
                style={{
                  backgroundColor: "green",
                  flex: 1,
                  height: 140,
                  marginRight: 5
                }}
              />
              <View
                style={{
                  backgroundColor: "yellow",
                  marginLeft: 5,
                  flex: 1,
                  height: 140
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "rgba(0,0,0,0.2)",
            width: SCREEN_WIDTH,
            height: 15
          }}
        />
      </SafeAreaView>
    );
  }
}
export default DiscoverScreen;
