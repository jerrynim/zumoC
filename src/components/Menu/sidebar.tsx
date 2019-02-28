import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: rgb(255, 255, 255);
`;
const Top = styled.View`
  background-color: rgb(255, 255, 255);
`;
const Name = styled.Text`
  background-color: rgb(255, 255, 255);
`;
const ProfilePhoto = styled.View``;
const MenuIn = styled.View`
  background-color: rgb(255, 255, 255);
  font-size: 20px;
  margin: 20px;
`;

const Share = styled.Text`
  background-color: rgb(255, 255, 255);
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.View`
  background-color: rgb(255, 255, 255);
`;

const Menu: React.SFC = () => (
  <Container>
    <Top>
      <ProfilePhoto />
      <Name>lee</Name>
    </Top>
    <Content>
      <MenuIn>☃︎ MY PAGE</MenuIn>
      <MenuIn>⚲ SEARCH</MenuIn>
      <MenuIn>♡ LIKE</MenuIn>
      <MenuIn>⚙︎ SETTING</MenuIn>
      <MenuIn>☛ NOTICE</MenuIn>
      <Share>카카오톡으로 앱 추천하기</Share>
    </Content>
  </Container>
);

export default Menu;
