import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  NavigationScreenProps
} from "react-navigation";
import Menu from "../../components/Menu";
import HomeScreen from "../Home";
import DiscoverScreen from "../Discover";
import SearchScreen from "../Search/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const HeadStyle = styled.View`
  display: flex;
  flex-direction: row;
  height: 40;
`;
const drawerComponent = () => {
  return (
    <SafeAreaView>
      <Menu />
    </SafeAreaView>
  );
};
const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Discover: {
      screen: DiscoverScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: (navigation: NavigationScreenProps) => {
      let hcolor = "red";
      let dcolor = "grey";
      if (navigation.navigation.state.routeName === "Home") {
        hcolor = "#e0281a";
        dcolor = "#9e9897";
      } else {
        hcolor = "#9e9897";
        dcolor = "#e0281a";
      }
      return {
        headerTitle: (
          <HeadStyle>
            <TouchableOpacity
              onPress={() => navigation.navigation.navigate("Home")}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 7,
                  fontWeight: "700",
                  color: `${hcolor}`,
                  marginRight: 15
                }}
              >
                THIS WEEKEND
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigation.navigate("Discover")}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 7,
                  fontWeight: "700",
                  color: `${dcolor}`,
                  marginLeft: 15
                }}
              >
                DISCOVER
              </Text>
            </TouchableOpacity>
          </HeadStyle>
        ),
        headerLeft: null,
        headerRight: (
          <View style={{ marginRight: 10, marginBottom: 10 }}>
            <Ionicons
              name={"ios-search"}
              size={30}
              color={"rgba(0,0,0,0.7)"}
              onPress={() => navigation.navigation.navigate("Search")}
            />
          </View>
        )
      };
    }
  }
);
const MyDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainNavigator
    },
    Search: {
      screen: SearchScreen
    }
  },
  {
    contentComponent: drawerComponent
  }
);
const AppPresenter = createAppContainer(MyDrawerNavigator);

class AppContainer extends React.Component {
  render() {
    return <AppPresenter />;
  }
}
export default AppContainer;
