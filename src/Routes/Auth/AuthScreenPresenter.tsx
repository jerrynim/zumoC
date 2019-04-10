import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import FBLoginButton from "../../components/LoginButton/FBLoginButton";

const Top = styled.View``;
const Icon = styled.Image``;
const Title = styled.Text``;
const SubTitle = styled.Text``;

const Bar = styled.View``;
const BarLine = styled.View``;
const BarText = styled.Text``;
const Foot = styled.View``;
const FootText = styled.Text``;
const QuestionMark = styled.Image``;
const FootText2 = styled.Text``;
const IconsBox = styled.View``;

interface IProps {
  onChange: any;
}

const AuthScreenPresenter: React.SFC<IProps> = () => {
  return (
    <SafeAreaView>
      <Top>
        <Icondsad
          source={require("../../images/flower.jpeg")}
          style={{ width: 100, height: 100 }}
        />
        <Title>ZUMO</Title>
        <SubTitle>주말에 뭐하지?</SubTitle>
      </Top>
      <Bar>
        <BarLine />
        <BarText>간편로그인</BarText>
        <BarLine />
      </Bar>
      <Foot>
        <IconsBox>
          <FBLoginButton />
        </IconsBox>
        <FootText>이메일로 회원가입</FootText>
        <QuestionMark
          source={require("../../images/question-mark.png")}
          style={{ width: 20, height: 20 }}
        />
        <FootText2>로그인 문의</FootText2>
      </Foot>
    </SafeAreaView>
  );
};

export default AuthScreenPresenter;
