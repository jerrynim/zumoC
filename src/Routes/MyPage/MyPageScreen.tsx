import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { NavigationScreenProp } from "react-navigation";

const Header = styled.View`
  margin-top: 10px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  height: 40px;
  flex-direction: row;
  justify-content: center;
`;
const Profile = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-width: 15px;
  border-bottom-color: rgba(0, 0, 0, 0.15);
  padding-bottom: 20px;
`;

const ProfilePhoto = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50;
  width: 80px;
  height: 80px;
  margin-top: 20px;
  margin-bottom: 15px;
`;
const ProfileName = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
`;
const PrifileAccount = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  font-size: 15px;
`;
const EditProfile = styled.View`
  margin-top: 15px;
  width: 100px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20;
`;

const HeaderTitle = styled.Text`
  font-size: 18;
  font-weight: 700;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditText = styled.Text`
  padding-top: 4px;
  text-align: center;
  color: white;
  font-size: 13px;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class MyPageScreen extends React.Component<IProps> {
  public render() {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../../images/back.png")}
              style={{
                marginTop: 10,
                position: "absolute",
                width: 23,
                height: 23,
                marginLeft: 15
              }}
            />
          </TouchableOpacity>
          <Header>
            <HeaderTitle>MY PAGE</HeaderTitle>
          </Header>
          <Profile>
            <ProfilePhoto />
            <ProfileName>ㅊㅈ</ProfileName>
            <PrifileAccount>
              <Image
                source={require("./../../images/kakaotalk.png")}
                style={{ width: 15, height: 15 }}
              />
              tej@naver.com
            </PrifileAccount>
            <EditProfile>
              <EditText>회원정보 변경</EditText>
            </EditProfile>
          </Profile>
        </View>
      </SafeAreaView>
    );
  }
}

export default MyPageScreen;
