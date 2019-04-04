import styled from "styled-components/native";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const SubTitle = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const HeaderMiddle = styled.View`
  flex-direction: row;
  justify-content: center;
  text-align: center;
  padding-right: 15px;
  padding-bottom: 10px;
`;
export const PageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0px;
`;
export const Title = styled.Text`
  color: white;
  font-size: 25;
  font-weight: 200;
  margin-bottom: 30px;
`;

export const PageTitle = styled.Text`
  color: white;
  font-size: 25;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;
export const HasgTags = styled.Text`
  color: white;
  font-size: 14;
  font-weight: 700;
`;

export const HeaderTitles = styled.View`
  padding-top: 30px;
  position: absolute;
  padding-right: 30px;
  padding-bottom: 50px;
`;
export const Weather = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  text-align: center;
  background-color: " rgba(0,0,0,0.07)";
`;

export const Header = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PageHeaderTitles = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CategoryItem = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH / 3};
  height: 70;
  border-color: rgba(0, 0, 0, 0.3);
  border-width: 1;
  align-items: center;
  justify-content: center;
`;

export const Category = styled.Text`
  font-weight: 900;
  font-size: 10;
  color: white;
  text-shadow: 0px 0.5px 1px;
`;

export const HCategory = styled.Text`
  font-size: 25;
  font-weight: 400;
  color: white;
  text-shadow: 0px 0.5px 1px;
`;
