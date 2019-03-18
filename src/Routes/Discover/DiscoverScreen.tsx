import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  ImageBackground
} from "react-native";

interface IProps {}

const SCREEN_WIDTH = Dimensions.get("window").width;

const style = StyleSheet.create({
  category: {
    flex: 1,
    width: SCREEN_WIDTH / 3,
    height: 70,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

class DiscoverScreen extends React.Component<IProps> {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
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
                <ImageBackground
                  source={{
                    uri:
                      "data:image/jpeg;base64,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"
                  }}
                  style={{
                    flex: 4,
                    height: 130,
                    marginRight: 5
                  }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    flex: 2,
                    height: 130
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
                    height: 130,
                    marginRight: 5
                  }}
                />
                <View
                  style={{
                    backgroundColor: "yellow",
                    marginLeft: 5,
                    flex: 1,
                    height: 130
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "rgba(0,0,0,0.1)",
              width: SCREEN_WIDTH,
              height: 12
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                paddingTop: 15,
                paddingLeft: 15,
                fontWeight: "800"
              }}
            >
              지난 주 TOP RANK 10
            </Text>
            <ScrollView horizontal={true} style={{ padding: 10 }}>
              <View
                style={{
                  backgroundColor: "red",
                  height: 250,
                  width: 170,
                  marginRight: 8
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ff4900",
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                />
                <Text>누워서 별 헤는밤 하늘창 숙소 5</Text>
              </View>
              <View
                style={{
                  backgroundColor: "red",
                  height: 250,
                  width: 170,
                  marginRight: 8
                }}
              />
              <View
                style={{
                  backgroundColor: "red",
                  height: 250,
                  width: 170,
                  marginRight: 8
                }}
              />
              <View
                style={{
                  backgroundColor: "red",
                  height: 250,
                  width: 170,
                  marginRight: 8
                }}
              />
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: 15,
              backgroundColor: "rgba(0,0,0,0.1)",
              width: SCREEN_WIDTH,
              height: 12
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                paddingTop: 15,
                paddingLeft: 15,
                fontWeight: "800"
              }}
            >
              CATEGORY
            </Text>
            <View style={{ flexDirection: "column", marginTop: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={style.category}>
                  <Text>푸드</Text>
                </View>
                <View style={style.category}>
                  <Text>축제</Text>
                </View>
                <View style={style.category}>
                  <Text>플레이스</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={style.category}>
                  <Text>스포츠 레저</Text>
                </View>
                <View style={style.category}>
                  <Text>컬쳐</Text>
                </View>
                <View style={style.category}>
                  <Text>힐링</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={style.category}>
                  <Text>패션 뷰티</Text>
                </View>
                <View style={style.category}>
                  <Text>리빙</Text>
                </View>
                <View style={style.category}>
                  <Text>취미</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default DiscoverScreen;
