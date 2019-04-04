import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";

import { NavigationScreenProp } from "react-navigation";
import { DiscoverImages } from "./images";
import { CategoryItem, Category, HCategory } from "../styled";
interface IProps {
  navigation: NavigationScreenProp<any, any>;
  Week: String;
  Date: String;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

class DiscoverScreen extends React.Component<IProps> {
  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ fontSize: 25 }}>3월 2주 ZUMO추천</Text>
            <Text>
              {this.props.Date} - {this.props.Week}
            </Text>
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
              <CategoryItem>
                <Text>푸드</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>축제</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>플레이스</Text>
              </CategoryItem>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CategoryItem>
                <Text>스포츠 레저</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>컬쳐</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>힐링</Text>
              </CategoryItem>
            </View>
            <View style={{ flexDirection: "row" }}>
              <CategoryItem>
                <Text>패션 뷰티</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>리빙</Text>
              </CategoryItem>
              <CategoryItem>
                <Text>취미</Text>
              </CategoryItem>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default DiscoverScreen;
