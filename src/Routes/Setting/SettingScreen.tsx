import React from "react";
import { SafeAreaView, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { NavigationScreenProp } from "react-navigation";

const Header = styled.View`
  margin-top: 10px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  height: 40px;
  flex-direction: row;
  justify-content: center;
  z-index: 500;
`;

const HeaderTitle = styled.Text`
  font-size: 18;
  font-weight: 700;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class SettingScreen extends React.Component<IProps> {
  public render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ position: "absolute", zIndex: 502, marginTop: 50 }}
        >
          <Image
            source={require("../../images/back.png")}
            style={{
              width: 23,
              height: 23,
              marginLeft: 15
            }}
          />
        </TouchableOpacity>
        <Header>
          <HeaderTitle>SETTING</HeaderTitle>
        </Header>
      </SafeAreaView>
    );
  }
}

export default SettingScreen;
