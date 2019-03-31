import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  ImageBackground
} from "react-native";

import { NavigationScreenProp } from "react-navigation";
import { DiscoverImages } from "./images";
import styled from "styled-components/native";
interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

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

const Category = styled.Text`
  font-weight: 900;
  font-size: 10;
  color: white;
  text-shadow: 0px 0.5px 1px;
`;

const HCategory = styled.Text`
  font-size: 25;
  font-weight: 400;
  color: white;
  text-shadow: 0px 0.5px 1px;
`;

class DiscoverScreen extends React.Component<IProps> {
  render() {
    return (
      <View>
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
                  uri: DiscoverImages[0].uri
                }}
                style={{
                  flex: 4,
                  height: 130,
                  marginRight: 5
                }}
              >
                <View
                  style={{
                    padding: 10
                  }}
                >
                  <Category>FESTIVAL</Category>
                  <HCategory>축제</HCategory>
                </View>
              </ImageBackground>
              <ImageBackground
                source={{
                  uri: DiscoverImages[3].uri
                }}
                style={{
                  marginLeft: 5,
                  flex: 2,
                  height: 130
                }}
              >
                <View
                  style={{
                    padding: 10
                  }}
                >
                  <Category>MOVIE</Category>
                  <HCategory>영화</HCategory>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                width: SCREEN_WIDTH - 20,
                flexDirection: "row",
                marginTop: 10
              }}
            >
              <ImageBackground
                source={{
                  uri: DiscoverImages[1].uri
                }}
                style={{
                  backgroundColor: "green",
                  flex: 1,
                  height: 130,
                  marginRight: 5
                }}
              >
                <View
                  style={{
                    padding: 10
                  }}
                >
                  <Category>PERFORMANCE</Category>
                  <HCategory>공연</HCategory>
                </View>
              </ImageBackground>
              <ImageBackground
                source={{
                  uri: DiscoverImages[2].uri
                }}
                style={{
                  backgroundColor: "yellow",
                  marginLeft: 5,
                  flex: 1,
                  height: 130
                }}
              >
                <View
                  style={{
                    padding: 10
                  }}
                >
                  <Category>EXHIBITION</Category>
                  <HCategory>전시</HCategory>
                </View>
              </ImageBackground>
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
            {DiscoverImages.map((item) => (
              <ImageBackground
                key={item.id}
                source={{ uri: item.uri }}
                style={{ height: 250, width: 170, marginRight: 8 }}
              >
                <ImageBackground
                  source={require("./../../images/ribbon.png")}
                  style={{ width: 50, height: 50 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      textAlign: "center",
                      fontWeight: "800"
                    }}
                  >
                    {item.id}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      textAlign: "center",
                      fontWeight: "600"
                    }}
                  >
                    Rank
                  </Text>
                </ImageBackground>
                <View
                  style={{
                    marginTop: 100,
                    marginLeft: 25,
                    flexDirection: "column",
                    justifyContent: "center",
                    alginItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "800",
                      marginBottom: 15
                    }}
                  >
                    맛있는 나의 집
                  </Text>
                  <Text
                    style={{
                      width: 130,
                      color: "white",
                      fontWeight: "300",
                      fontSize: 16
                    }}
                  >
                    똑또그 안에 계세요? 사적인 주택 5
                  </Text>
                </View>
              </ImageBackground>
            ))}
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
      </View>
    );
  }
}
export default DiscoverScreen;
