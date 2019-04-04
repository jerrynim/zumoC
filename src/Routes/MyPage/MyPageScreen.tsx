import React from "react";
import { SafeAreaView, Image, TouchableOpacity } from "react-native";
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

const Tags = styled.View`
  padding-bottom: 15px;
  border-bottom-width: 15px;
  border-bottom-color: rgba(0, 0, 0, 0.15);
`;
const TagHead = styled.View`
  padding-bottom: 20px;
  margin: 15px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
`;
const TagTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;
const TagBox = styled.View`
  width: 60px;
  height: 30px;
  background-color: rgb(254, 0, 84);
  border-radius: 20;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Tag = styled.Text`
  color: white;
`;

const Edit = styled.View`
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TagWrapper = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LikeWrapper = styled.View`
  margin-top: 10px;
  padding: 15px;
`;
const LikeHead = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
`;
const LikeText = styled.Text`
  font-size: 15px;
  font-weight: 800;
`;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class MyPageScreen extends React.Component<IProps> {
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
        <Tags>
          <TagHead>
            <TagTitle>MY INTERST TAG</TagTitle>
            <Edit>
              <Image
                source={require("../../images/edit.png")}
                style={{
                  width: 13,
                  height: 13
                }}
              />
            </Edit>
          </TagHead>
          <TagWrapper>
            <TagBox>
              <Tag>#요리</Tag>
            </TagBox>
            <TagBox>
              <Tag>#맛집</Tag>
            </TagBox>
            <TagBox>
              <Tag>#카페</Tag>
            </TagBox>
            <TagBox>
              <Tag>#여행</Tag>
            </TagBox>
            <TagBox>
              <Tag>#호텔</Tag>
            </TagBox>
          </TagWrapper>
        </Tags>
        <LikeWrapper>
          <LikeHead>
            <LikeText>LIKE</LikeText>
            <Image
              source={require("../../images/like.png")}
              style={{ width: 20, height: 20, marginLeft: 5, marginRight: 5 }}
            />
            <LikeText>(1)</LikeText>
          </LikeHead>
        </LikeWrapper>
      </SafeAreaView>
    );
  }
}

export default MyPageScreen;
