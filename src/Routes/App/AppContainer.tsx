import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProps
} from "react-navigation";
import Drawer from "react-native-drawer";
import HomeScreen from "../Home";
import DiscoverScreen from "../Discover/DiscoverScreen";
import SearchScreen from "../Search/SearchScreen";
import Menu from "../../components/Menu";
import { TouchableOpacity, View, Text, Button } from "react-native";
// tslint:disable-next-line
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface IState {
  isMenuOpen: boolean;
}

const HeadStyle = styled.View`
  display: flex;
  flex-direction: row;
`;

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Discover: { screen: DiscoverScreen }
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
                  fontSize: 15,
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
                  fontSize: 15,
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
          <Button
            title={"➤"}
            onPress={() => navigation.navigation.navigate("Search")}
          />
        )
      };
    }
  }
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: HomeStack
    },
    Search: {
      screen: SearchScreen,
      headerLeft: "null"
    }
  },
  {
    headerMode: "none"
  }
);

const AppPresenter = createAppContainer(MainStack);

class AppContainer extends React.Component<IState> {
  public state = {
    isMenuOpen: false
  };
  render() {
    const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <Drawer
          type="overlay"
          open={isMenuOpen}
          content={<Menu />}
          openDrawerOffset={100}
          acceptTap={true}
          onClose={() => {
            this.setState({ isMenuOpen: !isMenuOpen });
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: 40,
              marginLeft: 15
            }}
            onPress={() =>
              this.setState({
                isMenuOpen: !isMenuOpen
              })
            }
          >
            <Ionicons size={50} name={"ios-menu"} color={"black"} />
          </TouchableOpacity>
          {isMenuOpen ? (
            <View
              style={{
                backgroundColor: "black",
                opacity: 0.6,
                height: 1000,
                width: 1000,
                position: "absolute",
                zIndex: 1
              }}
            >
              <Text>overlay</Text>
            </View>
          ) : null}

          <AppPresenter />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default AppContainer;
