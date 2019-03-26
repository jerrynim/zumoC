import React from "react";
import { SafeAreaView, Image, Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import Card from "../../components/Card";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <ScrollView>
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
