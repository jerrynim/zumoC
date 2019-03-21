import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import Card from "../../components/Card";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const SubTitle = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  color: white;
  font-size: 25;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
`;
const HasgTags = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
`;

const HeaderTitles = styled.View`
  padding-top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SocialIcons = styled.View`
  width: ${SCREEN_WIDTH};
  height: 100;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const GreyBar = styled.View`
  width: ${SCREEN_WIDTH};
  height: 13px;
  background-color: #f1f2f6;
`;

const Tags = styled.View`
  width: ${SCREEN_WIDTH};
  height: 150;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TagText = styled.Text`
  font-size: 15px;
  color: #3867d6;
  font-weight: 800;
  margin-bottom: 10px;
`;

const TagBoxWrapper = styled.View`
  width: ${SCREEN_WIDTH - 40};
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: row;
  justify-content: center;
`;

const TagBox = styled.Text`
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 15px;
  margin-right: 10px;
`;

class Page extends React.Component {
  public render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <ImageBackground
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQko1mS-PFT5T3wc1y7MkdsxBJS9Na1ASrAKCFHADD4cNUogs6k"
            }}
            imageStyle={{ resizeMode: "stretch" }}
            style={{ width: SCREEN_WIDTH, height: 320 }}
          >
            <Header>
              <TouchableOpacity>
                <Image
                  source={require("../../images/back.png")}
                  style={{ width: 23, height: 23 }}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Image
                  source={require("../../images/share.png")}
                  style={{ width: 23, height: 23, marginRight: 10 }}
                />
                <Image
                  source={require("../../images/heart.png")}
                  style={{ width: 23, height: 23, marginRight: 10 }}
                />
              </View>
            </Header>
            <HeaderTitles>
              <SubTitle>루프탑에서 봄디브 한 잔해~</SubTitle>
              <View style={{ width: 220 }}>
                <Title>로맨틱 파노라마 갬성 루프탑 추천 6</Title>
              </View>
              <HasgTags>#봄바람스멜 #옥땅으로 따라와</HasgTags>
            </HeaderTitles>
          </ImageBackground>
          <Card />
          <SocialIcons>
            <Image
              source={require("../../images/kakaotalk.png")}
              style={{ width: 40, height: 40 }}
            />
            <Image
              source={require("../../images/link.png")}
              style={{ width: 40, height: 40, marginLeft: 20 }}
            />
            <Image
              source={require("../../images/facebook.png")}
              style={{ width: 40, height: 40, marginLeft: 20 }}
            />
            <Image
              source={require("../../images/email.png")}
              style={{ width: 40, height: 40, marginLeft: 20 }}
            />
          </SocialIcons>
          <GreyBar />
          <Tags>
            <TagText>TAG</TagText>
            <TagBoxWrapper>
              <TagBox>#카페</TagBox>
              <TagBox>#핫플</TagBox>
              <TagBox>#가로수길</TagBox>
              <TagBox>#연남동</TagBox>
              <TagBox>#컬러</TagBox>
            </TagBoxWrapper>
            <TagBoxWrapper>
              <TagBox>#컬러풀</TagBox>
              <TagBox>#서울</TagBox>
              <TagBox>#포토존</TagBox>
            </TagBoxWrapper>
          </Tags>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Page;
