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
                    uri: ""
                  }}
                  style={{
                    backgroundColor: "green",
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
